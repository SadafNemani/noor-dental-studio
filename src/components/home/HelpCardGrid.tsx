// src/components/home/HelpCardGrid.tsx
"use client";
import { useTranslations } from "next-intl";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import { helpCards } from "@/data/helpCards";
import { richText } from "@/lib/richText";
import HelpCardLink from "./HelpCardLink";

export default function HelpCardGrid() {
  const t = useTranslations("home.help");

  return (
    <div className="mx-auto max-w-275">
      <Arrive className="mb-14">
        <Heading as="h2" size="h2" className="leading-[1.05]">
          {t.rich("heading", richText)}
        </Heading>
      </Arrive>

      <div className="help-grid">
        {helpCards.map((card, i) => {
          const Icon = card.icon;
          const delay = i * 0.08;
          const label = t(card.key);
          const desc = t(`${card.key}Desc`);

          if (card.layout === "wide") {
            return (
              <Arrive key={card.key} delay={delay} className="[grid-area:wide]">
                <HelpCardLink
                  href={card.href}
                  className="shadow-soft flex items-center gap-6 bg-white p-8"
                >
                  <Icon size={72} className="text-gold shrink-0" />
                  <div className="pe-10">
                    <Text className="text-charcoal mb-1 text-lg font-medium">{label}</Text>
                    <Text muted>{desc}</Text>
                  </div>
                </HelpCardLink>
              </Arrive>
            );
          }
          if (card.layout === "tall") {
            return (
              <Arrive key={card.key} delay={delay} className="[grid-area:tall]">
                <HelpCardLink
                  href={card.href}
                  arrowClassName="text-gold"
                  className="bg-pine text-ivory flex flex-col justify-between p-8"
                >
                  <Icon size={88} className="text-gold" />
                  <div>
                    <Text className="text-ivory mb-1 text-lg font-medium">{label}</Text>
                    <Text className="text-mist">{desc}</Text>
                  </div>
                </HelpCardLink>
              </Arrive>
            );
          }
          if (card.layout === "ghost") {
            return (
              <Arrive key={card.key} delay={delay} className="[grid-area:ghost]">
                <HelpCardLink href={card.href} className="bg-sand p-6">
                  <Icon size={140} className="text-charcoal/10 absolute -inset-e-6 -bottom-6" />
                  <div className="relative pr-8">
                    <Text className="text-charcoal mb-1 font-medium">{label}</Text>
                    <Text muted className="text-sm">
                      {desc}
                    </Text>
                  </div>
                </HelpCardLink>
              </Arrive>
            );
          }

          return (
            <Arrive key={card.key} delay={delay} className="[grid-area:compact]">
              <HelpCardLink href={card.href} className="border-sand flex flex-col gap-3 border p-6">
                <Icon size={40} className="text-gold" />
                <div className="pe-8">
                  <Text className="text-charcoal mb-1 font-medium">{label}</Text>
                  <Text muted className="text-sm">
                    {desc}
                  </Text>
                </div>
              </HelpCardLink>
            </Arrive>
          );
        })}
      </div>
    </div>
  );
}
