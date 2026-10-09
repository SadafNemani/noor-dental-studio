import { getTranslations } from "next-intl/server";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import Button from "@/components/ui/Button";
import ScrollCue from "@/components/care/ScrollCue";
import StepJourney from "@/components/journey/StepJourney";
import CompareSlider from "@/components/compare/CompareSlider";
import SplitCTA from "@/components/shared/SplitCTA";
import Footer from "@/components/layout/Footer";
import SolidNavTrigger from "@/components/layout/SolidNavTrigger";

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
                  {t("hero.heading")}
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
              <div className="noor-image-frame relative -ms-16 mt-4 aspect-3/4 w-full max-w-75 overflow-hidden">
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

      <section className="py-20 md:py-28">
        <Container>
          <Arrive>
            <Heading size="h2" className="mb-10 text-center">
              {t("compare.heading")}
            </Heading>
          </Arrive>

          <Arrive delay={0.1} className="mx-auto max-w-160">
            <CompareSlider beforeLabel={t("compare.before")} afterLabel={t("compare.after")} />
          </Arrive>
        </Container>
      </section>

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

      <section className="py-20 md:py-28">
        <Container>
          <Arrive className="mx-auto max-w-140 text-center">
            <Heading size="h2" className="mb-4">
              {t("pricing.heading")}
            </Heading>
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
          <div className="mx-auto grid max-w-225 grid-cols-1 gap-10 md:grid-cols-2">
            {(["sara", "omar"] as const).map((key, i) => (
              <Arrive key={key} delay={i * 0.1}>
                <p className="font-heading text-h3 text-charcoal mb-4 leading-snug">
                  {t(`testimonials.${key}.quote`)}
                </p>
                <Text muted className="text-label tracking-wide uppercase">
                  {t(`testimonials.${key}.name`)}
                </Text>
              </Arrive>
            ))}
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
