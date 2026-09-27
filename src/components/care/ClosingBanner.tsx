"use client";

import { useTranslations } from "next-intl";
import Container from "../layout/Container";
import Heading from "../typography/Heading";
import Arrive from "../motion/Arrive";
import { richText } from "@/lib/richText";

export default function ClosingBanner() {
  const t = useTranslations("yourCare.banner");

  return (
    <section className="pb-24 md:pb-32">
      <Container>
        <Arrive>
          <div
            className="rounded-card relative flex min-h-70 items-center justify-end overflow-hidden bg-cover bg-center p-10 md:min-h-90 md:p-16"
            style={{ backgroundImage: "url(/images/care-banner-plant.webp" }}
          >
            <div className="from-ivory/70 via-ivory/10 absolute inset-0 bg-linear-to-r to-transparent" />
            <div className="relative max-w-[320px] text-end">
              <Heading size="h2" className="mb-3">
                <span className="block">{t.rich("heading", richText)}</span>
              </Heading>
            </div>
          </div>
        </Arrive>
      </Container>
    </section>
  );
}
