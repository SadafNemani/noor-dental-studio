"use client";
import { motion } from "motion/react";
import DrawIcon, { drawVariants } from "../DrawIcon";

export default function HeartHandshakeDraw({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <DrawIcon size={size} className={className}>
      <motion.path
        d="
          M24 40
          C21 38 7 29 7 17
          C7 10.5 11.5 6 17 6
          C20 6 22.5 7.5 24 10
          C25.5 7.5 28 6 31 6
          C36.5 6 41 10.5 41 17
          C41 29 27 38 24 40
          Z
        "
        variants={drawVariants}
      />
    </DrawIcon>
  );
}
