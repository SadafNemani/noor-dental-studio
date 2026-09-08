"use client";

import { createContext, useContext } from "react";

const SceneActiveContext = createContext<boolean | undefined>(undefined);
export const SceneActiveProvider = SceneActiveContext.Provider;

export function useSceneActive() {
  return useContext(SceneActiveContext);
}
