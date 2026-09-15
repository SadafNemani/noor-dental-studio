"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDirection } from "@/hooks/useDirection";

export default function AtmosphereWash() {
  const pineRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isRTL } = useDirection();

  useGSAP(() => {
    if (prefersReducedMotion) return;
    const dirX = isRTL ? -1 : 1;
    gsap.to(pineRef.current, {
      x: 120 * dirX,
      y: 80,
      scale: 1.15,
      duration: 22,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(goldRef.current, {
      x: -100 * dirX,
      y: -60,
      scale: 1.1,
      duration: 28,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 3,
    });
  }, [prefersReducedMotion, isRTL]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={pineRef}
        className="absolute -inset-s-1/4 top-0 h-[80%] w-[70%] rounded-full opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(47,74,62,0.28) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        ref={goldRef}
        className="absolute -inset-e-1/4 bottom-0 h-[70%] w-[60%] rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(185,141,79,0.22) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
