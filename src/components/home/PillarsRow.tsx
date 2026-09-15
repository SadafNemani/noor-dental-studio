"use client";
import { useTranslations } from "next-intl";
import Arrive from "@/components/motion/Arrive";
import Eyebrow from "@/components/typography/Eyebrow";
import { richText } from "@/lib/richText";

const lineStyles = [
  {
    key: "line1",
    size: "text-[clamp(1.75rem,3.2vw,2.75rem)]",
    align: "md:self-start md:text-start md:max-w-[480px]",
  },
  {
    key: "line2",
    size: "text-[clamp(2.25rem,4.2vw,3.5rem)]",
    align: "md:self-center md:text-center md:max-w-[560px]",
  },
  {
    key: "line3",
    size: "text-[clamp(1.9rem,3.5vw,3rem)]",
    align: "md:self-end md:text-end md:max-w-[500px]",
  },
] as const;

export default function PillarsRow() {
  const t = useTranslations("home.pillars");

  return (
    <div className="relative w-full">
      <div className="relative mx-auto max-w-225 text-center">
        <Arrive>
          <Eyebrow className="mb-14">{t("heading")}</Eyebrow>
        </Arrive>

        <div className="flex flex-col gap-6 md:gap-3">
          {lineStyles.map((line, i) => (
            <div key={line.key} className={`approach-line-${i + 1} flex ${line.align}`}>
              <p className={`font-heading text-charcoal leading-snug font-medium ${line.size}`}>
                {t.rich(line.key, richText)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
