"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDirection } from "@/hooks/useDirection";

type GradientBlobProps = {
  color?: string;
  size?: number;
  speed?: number;
  className?: string;
};

export default function GradientBlob({
  color = "rgba(185,141,79,0.16)",
  size = 900,
  speed = 26,
  className = "",
}: GradientBlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isRTL } = useDirection();

  useGSAP(
    () => {
      if (prefersReducedMotion || !ref.current) return;
      const dirX = isRTL ? -1 : 1;
      gsap.to(ref.current, {
        x: 140 * dirX,
        y: 110,
        scale: 1.15,
        duration: speed,
        ease: "sine.out",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: ref, dependencies: [prefersReducedMotion, isRTL] }
  );

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute rounded-full blur-[10px] ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
