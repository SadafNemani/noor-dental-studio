import { getTranslations } from "next-intl/server";
import { IconHandStop, IconMessageCircle, IconAdjustmentsHorizontal } from "@tabler/icons-react";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import AtmosphereWash from "@/components/motion/AtmoshphereWash";
import StepAccordion from "@/components/journey/StepAccordion";
import SplitCTA from "@/components/shared/SplitCTA";
import Footer from "@/components/layout/Footer";
import SolidNavTrigger from "@/components/layout/SolidNavTrigger";
import { richText } from "@/lib/richText";
import { firstVisitSteps } from "@/data/firstVisitJourney";
import { firstVisitFaqKeys } from "@/data/faq";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "firstVisit" });
}

const points = [
  { key: "pause", icon: IconHandStop },
  { key: "ask", icon: IconMessageCircle },
  { key: "choose", icon: IconAdjustmentsHorizontal },
] as const;

export default async function FirstVisitPage() {
  const t = await getTranslations("firstVisit");

  const steps = firstVisitSteps.map((key) => ({
    id: key,
    title: t(`journey.${key}.title`),
    body: t(`journey.${key}.desc`),
  }));

  const faqs = firstVisitFaqKeys.map((key) => ({
    id: key,
    title: t(`faq.${key}.q`),
    body: t(`faq.${key}.a`),
  }));

  return (
    <>
      <SolidNavTrigger />

      <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        <AtmosphereWash />
        <Container className="relative">
          <div className="max-w-190">
            <Arrive>
              <Eyebrow className="mb-5">{t("hero.eyebrow")}</Eyebrow>
            </Arrive>
            <Arrive delay={0.08}>
              <Heading
                size="h1"
                as="h1"
                className="mb-6 text-[clamp(3rem,6.5vw,6rem)] leading-[1.05] tracking-[-0.01em] text-balance"
              >
                {t.rich("hero.heading", richText)}
              </Heading>
            </Arrive>
            <Arrive delay={0.16}>
              <Text muted className="max-w-110 text-pretty">
                {t("hero.sub")}
              </Text>
            </Arrive>
          </div>
        </Container>
      </section>

      <section className="from-ivory bg-linear-to-b via-[#F6F1E8] to-[#EFE6D6] py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <div className="md:sticky md:top-32 md:self-start">
              <Arrive>
                <Eyebrow className="mb-4">{t("journey.eyebrow")}</Eyebrow>
                <Heading size="h2" className="max-w-90 text-balance">
                  {t("journey.heading")}
                </Heading>
              </Arrive>
            </div>
            <StepAccordion items={steps} numbered defaultOpenId={firstVisitSteps[0]} />
          </div>
        </Container>
      </section>

      <section className="bg-pine text-ivory py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-20">
            <Arrive>
              <div className="bg-gold mb-6 h-0.5 w-10" />
              <Heading
                size="h1"
                className="text-ivory text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-balance"
              >
                {t("control.heading")}
              </Heading>
            </Arrive>
            <Arrive delay={0.15}>
              <Text className="text-mist mb-8 text-pretty">{t("control.body")}</Text>
              <ul className="flex flex-col gap-4">
                {points.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.key} className="text-ivory flex items-center gap-3">
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        className="text-gold shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-body text-body">{t(`control.points.${p.key}`)}</span>
                    </li>
                  );
                })}
              </ul>
            </Arrive>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-180">
            <Arrive>
              <Heading size="h2" className="mb-10">
                {t("faq.heading")}
              </Heading>
            </Arrive>
            <StepAccordion items={faqs} />
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <SplitCTA
            image="/images/care-closing-room.webp"
            heading={t("closing.heading")}
            body={t("closing.body")}
            ctaLabel={t("closing.cta")}
            ctaHref="/booking"
          />
        </Container>
      </section>

      <Footer />
    </>
  );
}
