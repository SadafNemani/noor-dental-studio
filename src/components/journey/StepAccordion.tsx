"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { firstVisitSteps } from "@/data/firstVisitJourney";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Arrive from "../motion/Arrive";
import { cn } from "@/lib/cn";

export default function StepAccordion() {
  const t = useTranslations("firstVisit.journey");
  const [openKey, setOpenKey] = useState<string | null>(firstVisitSteps[0]);

  return (
    <div className="mx-auto max-w-160">
      {firstVisitSteps.map((key, i) => {
        const isOpen = openKey === key;
        const panelId = `step-panel-${key}`;
        const buttonId = `step-button-${key}`;

        return (
          <Arrive key={key} delay={i * 0.05}>
            <div className="border-sand border-b">
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenKey(isOpen ? null : key)}
                className="flex w-full items-center justify-between gap-4 py-5 text-start"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="font-body text-label text-stone">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Heading as="h3" size="h3" className="min-w-0">
                    {t(`${key}.title`)}
                  </Heading>
                </span>
                <i
                  className={cn(
                    "ti ti-chevron-down text-stone shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <Text muted className="ps-6 pb-6 sm:ps-10">
                      {t(`${key}.desc`)}
                    </Text>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Arrive>
        );
      })}
    </div>
  );
}
