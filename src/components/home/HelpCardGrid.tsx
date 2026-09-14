// src/components/home/HelpCardGrid.tsx
"use client";
import { useTranslations } from "next-intl";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import { helpCards } from "@/data/helpCards";
import { richText } from "@/lib/richText";

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

          if (card.layout === "wide") {
            return (
              <Arrive
                key={card.key}
                delay={delay}
                className="rounded-card shadow-soft flex items-center gap-6 bg-white p-8 [grid-area:wide]"
              >
                <Icon size={72} className="text-gold shrink-0" />
                <div>
                  <Text className="text-charcoal mb-1 text-lg font-medium">{t(card.key)}</Text>
                  <Text muted>{t(`${card.key}Desc`)}</Text>
                </div>
              </Arrive>
            );
          }
          if (card.layout === "tall") {
            return (
              <Arrive
                key={card.key}
                delay={delay}
                className="rounded-card bg-pine text-ivory flex flex-col justify-between p-8 [grid-area:tall]"
              >
                <Icon size={88} className="text-gold" />
                <div>
                  <Text className="text-ivory mb-1 text-lg font-medium">{t(card.key)}</Text>
                  <Text className="text-mist">{t(`${card.key}Desc`)}</Text>
                </div>
              </Arrive>
            );
          }
          if (card.layout === "ghost") {
            return (
              <Arrive
                key={card.key}
                delay={delay}
                className="rounded-card bg-sand relative overflow-hidden p-6 [grid-area:ghost]"
              >
                <Icon size={140} className="text-charcoal/10 absolute -inset-e-6 -bottom-6" />
                <div className="relative">
                  <Text className="text-charcoal mb-1 font-medium">{t(card.key)}</Text>
                  <Text muted className="text-sm">
                    {t(`${card.key}Desc`)}
                  </Text>
                </div>
              </Arrive>
            );
          }

          return (
            <Arrive
              key={card.key}
              delay={delay}
              className="rounded-card border-sand flex flex-col gap-3 border p-6 [grid-area:compact]"
            >
              <Icon size={40} className="text-gold" />
              <div>
                <Text className="text-charcoal mb-1 font-medium">{t(card.key)}</Text>
                <Text muted className="text-sm">
                  {t(`${card.key}Desc`)}
                </Text>
              </div>
            </Arrive>
          );
        })}
      </div>
    </div>
  );
}
