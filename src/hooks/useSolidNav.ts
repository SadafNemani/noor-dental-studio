"use client";

import { useEffect } from "react";
import { useNavEnvironment } from "@/context/NavEnvironmentContext";

export function useSolidNav() {
  const { setEnvironment } = useNavEnvironment();
  useEffect(() => {
    setEnvironment("solid");
  }, [setEnvironment]);
}
