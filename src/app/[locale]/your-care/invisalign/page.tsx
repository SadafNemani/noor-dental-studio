import { getTranslations } from "next-intl/server";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import Button from "@/components/ui/Button";
import ScrollCue from "@/components/care/ScrollCue";
import StepJourney from "@/components/journey/StepJourney";
import SplitCTA from "@/components/shared/SplitCTA";
import Footer from "@/components/layout/Footer";
import SolidNavTrigger from "@/components/layout/SolidNavTrigger";
import { richText } from "@/lib/richText";
import CompareGallery from "@/components/compare/CompareGallery";
import { IconCoin } from "@tabler/icons-react";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "invisalign" });
}

export default async function InvisalignPage() {
  const t = await getTranslations("invisalign");

  return (
    <>
      <SolidNavTrigger />

      <section className="pt-36 pb-20 md:pt-40 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <div className="max-w-140">
              <Arrive>
                <Eyebrow className="mb-5">{t("hero.eyebrow")}</Eyebrow>
              </Arrive>

              <Arrive delay={0.8}>
                <Heading
                  size="h1"
                  className="mb-6 text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.01em] text-balance"
                >
                  {t.rich("hero.heading", richText)}
                </Heading>
              </Arrive>

              <Arrive delay={0.16}>
                <Text muted className="mb-5 max-w-105 text-pretty">
                  {t("hero.sub")}
                </Text>
              </Arrive>

              <Arrive delay={0.24}>
                <ScrollCue targetId="journey" label={t("hero.cta")} />
              </Arrive>
            </div>

            <Arrive delay={0.12} className="hidden md:block">
              <div className="noor-image-frame relative -ms-16 mt-4 aspect-4/3 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url(/images/invisalign-hero.webp)" }}
                />
                <div className="bg-gold/10 pointer-events-none absolute -inset-8 -z-10 rounded-full blur-3xl" />
              </div>
            </Arrive>
          </div>
        </Container>
      </section>

      <div id="journey">
        <StepJourney />
      </div>

      <section className="from-ivory bg-linear-to-b via-[#F6F1E8] to-[#EFE6D6] py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <Arrive>
              <div className="noor-image-frame aspect-4/3 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: "url(/images/invisalign-technology.webp" }}
                />
              </div>
            </Arrive>

            <Arrive delay={0.1}>
              <Heading size="h2" className="mb-4 max-w-95">
                {t("technology.heading")}
              </Heading>
              <Text muted className="max-w-105 text-pretty">
                {t("technology.body")}
              </Text>
            </Arrive>
          </div>
        </Container>
      </section>

      <CompareGallery />

      <section className="py-20 md:py-28">
        <Container>
          <Arrive className="mx-auto max-w-140 text-center">
            <IconCoin
              size={36}
              strokeWidth={1.25}
              className="text-gold mx-auto mb-5"
              aria-hidden="true"
            />
            <Eyebrow className="mb-3">{t("pricing.heading")}</Eyebrow>
            <p className="font-heading text-charcoal mb-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-none font-semibold">
              <bdi>{t("pricing.range")}</bdi>
            </p>
            <div className="bg-gold mx-auto mb-6 h-px w-10" />
            <Text muted className="mb-8 text-pretty">
              {t("pricing.body")}
            </Text>
            <Button href="/booking">{t("pricing.cta")}</Button>
          </Arrive>
        </Container>
      </section>

      <section className="bg-sand/50 py-20 md:py-28">
        <Container>
          <Arrive>
            <Heading size="h2" className="mb-12 text-center">
              {t("testimonials.heading")}
            </Heading>
          </Arrive>
          <div className="mx-auto grid max-w-225 grid-cols-1 gap-6 md:grid-cols-2">
            {(["sara", "omar"] as const).map((key, i) => {
              const name = t(`testimonials.${key}.name`);
              return (
                <Arrive key={key} delay={i * 0.1}>
                  <figure className="rounded-card shadow-soft relative h-full bg-white p-8 pt-12">
                    <span
                      aria-hidden="true"
                      className="font-heading text-gold/70 absolute inset-s-6 top-3 text-[5rem] leading-none"
                    >
                      “
                    </span>
                    <blockquote className="font-heading text-h3 text-charcoal mb-8 leading-snug">
                      {t(`testimonials.${key}.quote`)}
                    </blockquote>
                    <figcaption className="border-sand flex items-center gap-3 border-t pt-5">
                      <span
                        aria-hidden="true"
                        className="bg-pine font-heading text-ivory flex h-10 w-10 items-center justify-center rounded-full"
                      >
                        {name.charAt(0)}
                      </span>
                      <span>
                        <span className="text-charcoal block text-sm font-medium">{name}</span>
                        <span className="text-label text-stone block">
                          {t(`testimonials.${key}.role`)}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Arrive>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SplitCTA
            image="/images/invisalign-closing.webp"
            heading={t("closing.heading")}
            body={t("pricing.body")}
            ctaLabel={t("closing.cta")}
            ctaHref="/booking"
          />
        </Container>
      </section>

      <Footer />
    </>
  );
}
