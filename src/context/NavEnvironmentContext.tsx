"use client";
import { createContext, useContext, useState, useCallback } from "react";

export type NavEnvironment = "image" | "light" | "dark" | "solid";

type Ctx = { environment: NavEnvironment; setEnvironment: (env: NavEnvironment) => void };
const NavEnvironmentContext = createContext<Ctx | null>(null);

export function NavEnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [environment, setEnvironmentState] = useState<NavEnvironment>("solid");
  const setEnvironment = useCallback((env: NavEnvironment) => {
    setEnvironmentState((prev) => (prev === env ? prev : env));
  }, []);
  return (
    <NavEnvironmentContext.Provider value={{ environment, setEnvironment }}>
      {children}
    </NavEnvironmentContext.Provider>
  );
}

export function useNavEnvironment(): Ctx {
  const ctx = useContext(NavEnvironmentContext);
  if (!ctx) throw new Error("useNavEnvironment must be used within NavEnvironmentProvider");
  return ctx;
}
