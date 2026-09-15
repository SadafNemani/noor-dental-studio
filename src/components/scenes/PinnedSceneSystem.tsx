"use client";
import {
  useRef,
  useState,
  useLayoutEffect,
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useNavEnvironment, type NavEnvironment } from "@/context/NavEnvironmentContext";
import SceneProgressIndicator from "./SceneProgressIndicator";
import { useHasMounted } from "@/hooks/useHasMounted";

gsap.registerPlugin(ScrollTrigger);

type SceneChildProps = {
  active?: boolean;
  background?: NavEnvironment;
  layout?: "pinned" | "flow";
};
type PinnedSceneSystemProps = {
  children: ReactElement<SceneChildProps> | ReactElement<SceneChildProps>[];
};

export default function PinnedSceneSystem({ children }: PinnedSceneSystemProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const { setEnvironment } = useNavEnvironment();
  const progressFillRef = useRef<HTMLDivElement>(null);
  const sceneCount = Children.count(children);
  const hasMounted = useHasMounted();
  const skipPinning = !hasMounted || prefersReducedMotion || isMobile;

  function getSceneBackground(index: number): NavEnvironment | undefined {
    const arr = Children.toArray(children) as ReactElement<SceneChildProps>[];
    return arr[index]?.props.background;
  }

  useLayoutEffect(() => {
    if (skipPinning) {
      setEnvironment("solid");
      return;
    }
    const bg = getSceneBackground(activeIndex);
    if (bg) setEnvironment(bg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, skipPinning, setEnvironment]);

  useGSAP(
    () => {
      if (skipPinning || !viewportRef.current) return;
      const scenes = gsap.utils.toArray<HTMLElement>(".scene", viewportRef.current);
      const unitPx = window.innerHeight * 1.4;

      const tl = gsap.timeline();
      scenes.forEach((scene, i) => {
        if (i === 0) {
          gsap.set(scene, { autoAlpha: 1 });
        } else {
          tl.fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22 }, i);
        }
        if (i < scenes.length - 1) tl.to(scene, { autoAlpha: 0, duration: 0.22 }, i + 0.78);
      });

      ScrollTrigger.create({
        trigger: viewportRef.current,
        start: "top top",
        end: `+=${scenes.length * unitPx}`,
        pin: true,
        scrub: true,
        animation: tl,
        onUpdate: (self) => {
          if (progressFillRef.current) {
            progressFillRef.current.style.height = `${self.progress * 100}%`;
          }
          const rawIndex = self.progress * scenes.length;
          const idx = Math.min(scenes.length - 1, Math.floor(rawIndex));
          const localProgress = Math.min(1, Math.max(0, rawIndex - idx));
          scenes[idx]?.style.setProperty("--scene-progress", String(localProgress));

          setActiveIndex((prev) => (prev === idx ? prev : idx));
        },
        onLeave: () => setEnvironment("solid"),
      });
    },
    { scope: viewportRef, dependencies: [skipPinning] }
  );

  if (skipPinning) {
    return (
      <div ref={viewportRef} className="flex flex-col">
        {Children.map(children, (child) =>
          isValidElement<SceneChildProps>(child)
            ? cloneElement(child, { active: true, layout: "flow" })
            : child
        )}
      </div>
    );
  }

  return (
    <div ref={viewportRef} className="relative h-screen overflow-hidden">
      {Children.map(children, (child, i) =>
        isValidElement<SceneChildProps>(child)
          ? cloneElement(child, { active: i === activeIndex, layout: "pinned" })
          : child
      )}
      <SceneProgressIndicator
        total={sceneCount}
        activeIndex={activeIndex}
        fillRef={progressFillRef}
      />
    </div>
  );
}
