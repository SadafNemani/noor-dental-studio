"use client";

import { motion } from "motion/react";
import { useRevealState } from "@/hooks/useRevealState";

const variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function Arrive({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reveal = useRevealState();

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate={reveal.animate}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
