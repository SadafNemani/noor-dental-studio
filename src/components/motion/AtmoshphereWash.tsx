"use client";

import { motion } from "motion/react";

type AtmosphereWashProps = { intensity: number };

export default function AtmosphereWash({ intensity }: AtmosphereWashProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={{
        background: [
          "radial-gradient(120% 90% at 15% 30%, rgba(47,74,62,0) 0%, transparent 60%)",
          "radial-gradient(120% 90% at 75% 65%, rgba(47,74,62,0.22) 0%, transparent 65%)",
        ][Math.min(1, Math.round(intensity))],
      }}
      style={{ opacity: 0.3 + intensity * 0.5, filter: "blur(40px)" }}
      transition={{ duration: 2.2, ease: "easeInOut" }}
    />
  );
}
