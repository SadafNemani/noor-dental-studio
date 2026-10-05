import { getTranslations } from "next-intl/server";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import TreatmentSelector from "@/components/care/TreatmentSelector";
import ScrollCue from "@/components/care/ScrollCue";
import Footer from "@/components/layout/Footer";
import SolidNavTrigger from "@/components/layout/SolidNavTrigger";
import { richText } from "@/lib/richText";
import WhyNoorPillars from "@/components/care/WhyNoorPillars";
import ClosingBanner from "@/components/care/ClosingBanner";
import SplitCTA from "@/components/shared/SplitCTA";

export default async function YourCarePage() {
  const t = await getTranslations("yourCare");

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
                  as="h1"
                >
                  {t.rich("hero.heading", richText)}
                </Heading>
              </Arrive>

              <Arrive delay={0.16}>
                <Text muted className="mb-5 max-w-110 text-pretty">
                  {t("hero.body")}
                </Text>
              </Arrive>

              <Arrive delay={0.24}>
                <ScrollCue targetId="treatments" label={t("hero.exploreCue")} />
              </Arrive>
            </div>

            <Arrive delay={0.12} className="hidden md:block">
              <div className="rounded-card relative mt-4 aspect-4/3 w-full max-w-150 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url(/images/care-hero-portrait.webp)" }}
                />
                <div className="bg-gold/10 pointer-events-none absolute -inset-8 -z-10 rounded-full blur-3xl" />
              </div>
            </Arrive>
          </div>
        </Container>
      </section>

      <section
        id="treatments"
        className="from-ivory bg-linear-to-b via-[#F6F1E8] to-[#EFE6D6] py-10 md:py-16"
      >
        <Container>
          <TreatmentSelector />
        </Container>
      </section>

      <section className="pt-20 md:pt-28">
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

      <WhyNoorPillars />

      <ClosingBanner />

      <Footer />
    </>
  );
}
