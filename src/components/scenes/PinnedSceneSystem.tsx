/**
 * SCENE-PROGRESS CONVENTION
 * ─────────────────────────
 * Any component that wants a scroll-scrubbed effect tied to a specific
 * pinned scene follows this pattern:
 *
 * 1. This component writes `--scene-progress` (0→1) directly onto the
 *    active <section class="scene"> element every scroll tick, via
 *    onUpdate below. It is NOT React state — reading it in CSS avoids
 *    a re-render on every scroll frame.
 *
 * 2. `--scene-progress` is only meaningful between SCENE_STABLE_START
 *    (0.16) and SCENE_STABLE_END (0.84) — see src/lib/scene-timing.ts.
 *    Outside that range the scene is still fading in/out, not fully
 *    visible. Any content-reveal effect should map its own window
 *    INSIDE that stable range, not the naive full 0→1 — see the
 *    Approach section (globals.css) for the reference implementation.
 *
 * 3. If your effect needs its own derived variable (e.g. --veil-progress
 *    in the Invisalign scene), give <Scene> a `className` prop to tag
 *    the outer <section>, and scope your derived variable to that class
 *    in CSS. Do NOT try to set it on an inner content wrapper — Scene's
 *    `backgroundEffect` prop renders as a SIBLING of `children`, not a
 *    descendant, so a variable set on the content side never reaches
 *    the background side.
 *
 * 4. On mobile / prefers-reduced-motion, scenes never pin — they render
 *    in "flow" layout instead (data-layout="flow" on the <section>).
 *    --scene-progress is never written in flow mode, so every effect
 *    MUST include a `[data-layout="flow"] { --your-var: <resolved-end-state> }`
 *    fallback, or it silently renders at whatever CSS default you gave
 *    the variable (often the wrong state — see invisalign-scene's fallback
 *    block for the pattern to copy).
 *
 * 5. Do not hardcode fade-timing numbers (0.16, 0.84, etc.) — reference
 *    SCENE_FADE_DURATION / --scene-stable-start / --scene-stable-end.
 *    A prior version of this file had these numbers copy-pasted across
 *    three separate CSS blocks; when the timeline's real duration bug
 *    (see the tl.set() line below) was fixed, all three had to be found
 *    and re-derived independently. Don't repeat that.
 */

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
import { SCENE_FADE_DURATION } from "@/lib/scene-timing";

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
      const unitPx = window.innerHeight * 1;
      const fadeDuration = SCENE_FADE_DURATION;

      const tl = gsap.timeline();
      scenes.forEach((scene, i) => {
        if (i === 0) {
          gsap.set(scene, { autoAlpha: 1, scale: 1, filter: "blur(0px)" });
        } else {
          tl.fromTo(
            scene,
            { autoAlpha: 0, scale: 1.06, filter: "blur(14px)" },
            {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: fadeDuration,
              ease: "power2.out",
            },
            i
          );
        }
        if (i < scenes.length - 1) {
          tl.to(
            scene,
            {
              autoAlpha: 0,
              scale: 0.94,
              filter: "blur(14px)",
              duration: fadeDuration,
              ease: "power2.in",
            },
            i + 1 - fadeDuration
          );
        }
      });

      // Pads the timeline's total duration to exactly `scenes.length` units.
      // Without this, the last scene never gets a fade-out event, so the
      // imeline's real duration is shorter than assumed — desyncing onUpdate's
      // `rawIndex = self.progress * scenes.length` math from what's actually visible on screen.
      tl.set({}, {}, scenes.length);

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
