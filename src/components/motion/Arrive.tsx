"use client";

import { motion } from "motion/react";
import { useSceneActive } from "@/context/SceneActiveContext";

const variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

type ArriveProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function Arrive({ children, delay = 0, className }: ArriveProps) {
  const sceneActive = useSceneActive();
  const controlled = sceneActive !== undefined;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate={controlled ? (sceneActive ? "visible" : "hidden") : undefined}
      whileInView={controlled ? undefined : "visible"}
      viewport={controlled ? undefined : { once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
