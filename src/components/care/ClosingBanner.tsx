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
            className="rounded-card relative flex h-50 items-center justify-end overflow-hidden bg-cover bg-center p-10 md:h-70 md:p-16"
            style={{ backgroundImage: "url(/images/care-banner-plant.webp" }}
          >
            <div className="to-ivory/70 from-ivory/30 pointer-events-none absolute inset-0 bg-linear-to-r md:from-transparent" />
            <div className="relative ml-auto text-right">
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
