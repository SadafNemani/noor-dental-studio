"use client";

import { useSceneActive } from "@/context/SceneActiveContext";

export function useRevealState() {
  const sceneActive = useSceneActive();
  const controlled = sceneActive !== undefined;

  return {
    animate: controlled ? (sceneActive ? "visible" : "hidden") : undefined,
    whileInView: controlled ? undefined : "visible",
    viewport: controlled ? undefined : ({ once: true, margin: "-10% 0px" } as const),
  };
}
