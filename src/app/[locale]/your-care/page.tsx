import { getTranslations } from "next-intl/server";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import Button from "@/components/ui/Button";
import TreatmentSelector from "@/components/care/TreatmentSelector";
import ScrollCue from "@/components/care/ScrollCue";
import Footer from "@/components/layout/Footer";
import SolidNavTrigger from "@/components/layout/SolidNavTrigger";
import { richText } from "@/lib/richText";

export default async function YourCarePage() {
  const t = await getTranslations("yourCare");

  return (
    <>
      <SolidNavTrigger />
      <section className="pt-36 pb-16 md:pt-44">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-start">
            <div className="max-w-140">
              <Arrive>
                <Eyebrow className="mb-5">{t("hero.eyebrow")}</Eyebrow>
              </Arrive>

              <Arrive delay={0.8}>
                <Heading size="h1" className="mb-6" as="h1">
                  {t.rich("hero.heading", richText)}
                </Heading>
              </Arrive>

              <Arrive delay={0.16}>
                <Text muted className="mb-5 max-w-110">
                  {t("hero.body")}
                </Text>
              </Arrive>

              <Arrive delay={0.24}>
                <ScrollCue targetId="treatments" label={t("hero.exploreCue")} />
              </Arrive>
            </div>

            <Arrive delay={0.12} className="hidden md:block">
              <div className="rounded-card bg-sand ms-auto mt-10 aspect-3/4 w-full max-w-70 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: "url(/images/care-hero-portrait.webp)" }}
                />
              </div>
            </Arrive>
          </div>
        </Container>
      </section>

      <section id="treatments" className="from-ivory bg-linear-to-b to-[#F6F1E8] py-10 md:py-16">
        <Container>
          <TreatmentSelector />
        </Container>
      </section>

      <section className="bg-pine text-ivory relative overflow-hidden py-28 text-center">
        <span
          aria-hidden="true"
          className="font-heading text-ivory/6 pointer-events-none absolute inset-0 flex items-center justify-center text-[28vw] leading-none font-semibold"
        >
          Noor
        </span>

        <Container className="relative">
          <Arrive>
            <div className="bg-gold mx-auto mb-6 h-0.5 w-10" />
            <Heading size="h2" className="text-ivory mx-auto mb-4 max-w-130">
              {t("closing.heading")}
            </Heading>
            <Text className="text-mist mx-auto mb-8 max-w-100">{t("closing.body")}</Text>
            <Button href="/booking">{t("closing.cta")}</Button>
          </Arrive>
        </Container>
      </section>

      <Footer />
    </>
  );
}
