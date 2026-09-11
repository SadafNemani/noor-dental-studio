"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDirection } from "@/hooks/useDirection";
import { journeySteps } from "@/data/invisalignJourney";
import Heading from "../typography/Heading";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export default function StepJourney() {
  const t = useTranslations("invisalign.journey");
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { isRTL } = useDirection();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = journeySteps.length;

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (total - 1)}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (lineRef.current) {
            lineRef.current.style.width = `${self.progress * 100}%`;
          }
          const idx = Math.min(total - 1, Math.round(self.progress * (total - 1)));
          if (idx !== prevIndexRef.current) {
            setDirection(idx > prevIndexRef.current ? 1 : -1);
            prevIndexRef.current = idx;
          }
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const dirX = isRTL ? -1 : 1;
  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: 32 * dir * dirX }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -32 * dir * dirX }),
  };

  return (
    <div
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className={cn("flex flex-col justify-center px-[8vw]", !prefersReducedMotion && "h-screen")}
    >
      <Heading size="h2" className="text-ivory mb-16 text-center">
        {t("heading")}
      </Heading>

      {isMobile ? (
        <div className="mb-14 flex items-center justify-center gap-4">
          <div className="bg-ivory/20 h-px flex-1" />

          <div className="relative h-12 w-12 shrink-0 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={journeySteps[activeIndex].key}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="border-gold text-label text-charcoal absolute inset-0 flex items-center justify-center rounded-full border"
              >
                {journeySteps[activeIndex].number}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-ivory/20 h-px flex-1" />
        </div>
      ) : (
        <div className="relative mb-14">
          <div className="bg-ivory/20 h-px w-full" />
          <div
            ref={lineRef}
            className="bg-gold absolute inset-y-0 inset-s-0 h-px"
            style={{ width: prefersReducedMotion ? "100%" : "0%" }}
          />
          <div className="absolute inset-0 flex items-center justify-between">
            {journeySteps.map((step, i) => {
              const isActive = prefersReducedMotion || i <= activeIndex;
              return (
                <div
                  key={step.key}
                  className={cn(
                    "text-label flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-500",
                    isActive
                      ? "border-gold bg-gold text-charcoal"
                      : "border-ivory/30 bg-pine-deep text-ivory/50"
                  )}
                >
                  {step.number}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative h-28 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={journeySteps[activeIndex].key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0"
          >
            <Heading as="h3" size="h3" className="text-ivory mb-2">
              {t(`${journeySteps[activeIndex].key}.title`)}
            </Heading>
            <p className="font-body text-body text-mist mx-auto max-w-105">
              {t(`${journeySteps[activeIndex].key}.desc`)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
