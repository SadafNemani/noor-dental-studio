"use client";
import { useRef, useState, Children, cloneElement, isValidElement, type ReactElement } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

type SceneChildProps = { active?: boolean };

type PinnedSceneSystemProps = {
  children: ReactElement<SceneChildProps> | ReactElement<SceneChildProps>[];
};

export default function PinnedSceneSystem({ children }: PinnedSceneSystemProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const skipPinning = prefersReducedMotion || isMobile;
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneCount = Children.count(children);

  useGSAP(
    () => {
      if (skipPinning || !viewportRef.current) return;

      const scenes = gsap.utils.toArray<HTMLElement>(".scene", viewportRef.current);
      const unitPx = window.innerHeight * 1.4;

      const tl = gsap.timeline();
      scenes.forEach((scene, i) => {
        tl.fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.32 }, i).to(
          scene,
          { autoAlpha: 0, duration: 0.32 },
          i + 0.68
        );
      });

      ScrollTrigger.create({
        trigger: viewportRef.current,
        start: "top top",
        end: `+=${scenes.length * unitPx}`,
        pin: true,
        scrub: 1,
        animation: tl,
        onUpdate: (self) => {
          const idx = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length));
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        },
      });
    },
    { scope: viewportRef, dependencies: [skipPinning, sceneCount] }
  );

  if (skipPinning) {
    return (
      <div className="flex flex-col">
        {Children.map(children, (child) =>
          isValidElement<SceneChildProps>(child) ? cloneElement(child, { active: true }) : child
        )}
      </div>
    );
  }

  return (
    <div ref={viewportRef} className="relative h-screen overflow-hidden">
      {Children.map(children, (child, i) =>
        isValidElement<SceneChildProps>(child)
          ? cloneElement(child, { active: i === activeIndex })
          : child
      )}
    </div>
  );
}
