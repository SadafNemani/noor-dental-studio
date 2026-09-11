"use client";

import { useTranslations } from "next-intl";
import Card from "../ui/Card";
import IconBadge from "../ui/IconBadge";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Arrive from "../motion/Arrive";
import { helpCards } from "@/data/helpCards";

export default function HelpCardGrid() {
  const t = useTranslations("home.help");

  return (
    <div className="mx-auto max-w-260">
      <Arrive>
        <Heading size="h2" className="mb-12 text-center">
          {t("heading")}
        </Heading>
      </Arrive>

      <div className="grid grid-cols-2 gap-4.5 sm:grid-cols-4">
        {helpCards.map((card, i) => (
          <Arrive key={card.key} delay={i * 0.08}>
            <Card className="flex flex-col items-center gap-3 text-center">
              <IconBadge>
                <i className={`ti ${card.icon}`} aria-hidden="true" />
              </IconBadge>

              <Text as="span" className="text-charcoal">
                {t(card.key)}
              </Text>
            </Card>
          </Arrive>
        ))}
      </div>
    </div>
  );
}
