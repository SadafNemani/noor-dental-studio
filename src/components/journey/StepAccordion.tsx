"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Arrive from "../motion/Arrive";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  title: string;
  body: string;
};

type StepAccordionProps = {
  items: AccordionItem[];
  numbered?: boolean;
  defaultOpenId?: string | null;
  className?: string;
};

export default function StepAccordion({
  items,
  numbered = false,
  defaultOpenId = null,
  className,
}: StepAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        const panelId = `acc-panel-${item.id}`;
        const buttonId = `acc-button-${item.id}`;

        return (
          <Arrive key={item.id} delay={i * 0.05}>
            <div className="border-sand border-b">
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-start"
              >
                <span className="flex min-w-0 items-center gap-4">
                  {numbered && (
                    <span className="font-heading text-charcoal/25 text-[clamp(1.75rem,3vw,2.5rem)] leading-none tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <Heading as="h3" size="h3" className="min-w-0">
                    {item.title}
                  </Heading>
                </span>
                <IconChevronDown
                  size={20}
                  aria-hidden="true"
                  className={cn(
                    "text-gold shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
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
                    <Text
                      muted
                      className={cn(
                        "pb-6 text-pretty",
                        numbered && "ps-[calc(clamp(1.75rem,3vw,2.5rem)+1rem)]"
                      )}
                    >
                      {item.body}
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
