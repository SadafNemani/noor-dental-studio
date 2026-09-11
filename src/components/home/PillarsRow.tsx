"use client";

import { useTranslations } from "next-intl";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Arrive from "../motion/Arrive";

export default function PillarsRow() {
  const t = useTranslations("home.pillars");
  const pillars = ["clear", "calm", "personal"] as const;

  return (
    <div className="mx-auto max-w-225 text-center">
      <Arrive>
        <Heading size="h2" className="mb-12">
          {t("heading")}
        </Heading>
      </Arrive>

      <div className="grid grid-cols-3 gap-8">
        {pillars.map((key, i) => (
          <Arrive key={key} delay={i * 0.08}>
            <Heading as="h3" size="h3" className="text-pine mb-2">
              {t(`${key}Title`)}
            </Heading>

            <Text muted>{t(`${key}Desc`)}</Text>
          </Arrive>
        ))}
      </div>
    </div>
  );
}
