"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import TreatmentRow from "./TreatmentRow";
import Text from "../typography/Text";
import { treatments } from "@/data/treatments";

export default function TreatmentSelector() {
  const t = useTranslations("yourCare.treatments");
  const [activeImage, setActiveImage] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);

  function handleEnter(i: number) {
    setActiveImage(i);
    setFocused(i);
  }
  function handleLeave() {
    setFocused(null);
  }

  return (
    <div>
      <div className="hidden md:grid md:grid-cols-[1.3fr_1fr] md:items-start md:gap-16">
        <div>
          {treatments.map((treatment, i) => (
            <TreatmentRow
              key={treatment.slug}
              href={treatment.href}
              isActive={focused === null ? undefined : focused === i}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(i)}
              onBlur={handleLeave}
            >
              <div className="group flex items-baseline gap-6">
                <span className="font-heading text-h3 text-stone/50 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading text-h3 text-charcoal">
                      {t(`${treatment.slug}.name`)}
                    </h3>
                    {treatment.href && (
                      <span
                        aria-hidden="true"
                        className="font-body text-pine text-lg transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      >
                        ↗
                      </span>
                    )}
                  </div>

                  <Text muted className="mt-1 max-w-95">
                    {t(`${treatment.slug}.desc`)}
                  </Text>
                </div>
              </div>
            </TreatmentRow>
          ))}
        </div>

        <div className="rounded-card bg-sand sticky top-32 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={treatments[activeImage].slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="aspect-square bg-cover bg-center"
              style={{ backgroundImage: `url(${treatments[activeImage].image})` }}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="md:hidden">
        {treatments.map((treatment, i) => (
          <TreatmentRow key={treatment.slug} href={treatment.href}>
            <div className="mb-4 flex items-start gap-6">
              <span className="font-heading text-h3 text-stone/50 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading text-h3 text-charcoal">
                    {t(`${treatment.slug}.name`)}
                  </h3>
                  {treatment.href && (
                    <span
                      aria-hidden="true"
                      className="font-body text-pine text-lg rtl:-scale-x-100"
                    >
                      ↗
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div
              className="rounded-card bg-sand mb-3 aspect-square bg-cover bg-center"
              style={{ backgroundImage: `url(${treatment.image})` }}
            />
            <Text muted>{t(`${treatment.slug}.desc`)}</Text>
          </TreatmentRow>
        ))}
      </div>
    </div>
  );
}
