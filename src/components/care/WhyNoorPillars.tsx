"use client";

import { useTranslations } from "next-intl";
import { IconHeartHandshake, IconScan, IconUsersGroup } from "@tabler/icons-react";
import Container from "../layout/Container";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Arrive from "../motion/Arrive";

const items = [
  { key: "personalized", icon: IconHeartHandshake },
  { key: "technology", icon: IconScan },
  { key: "support", icon: IconUsersGroup },
] as const;

export default function WhyNoorPillars() {
  const t = useTranslations("yourCare.whyNoor");

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Arrive>
          <Heading size="h2" className="mb-14 text-center">
            {t("heading")}
          </Heading>
        </Arrive>

        <div className="divide-sand grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Arrive
                key={item.key}
                delay={i * 0.1}
                className="flex flex-col items-center gap-3 px-6 py-8 text-center"
              >
                <Icon size={28} strokeWidth={1.5} className="text-gold" />
                <p className="font-heading text-h3 text-charcoal">{t(`${item.key}.title`)}</p>
                <Text muted className="text-sm">
                  {t(`${item.key}.desc`)}
                </Text>
              </Arrive>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
