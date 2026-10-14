import { getTranslations } from "next-intl/server";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import Heading from "@/components/typography/Heading";
import Arrive from "@/components/motion/Arrive";
import ClinicGallery from "@/components/about/ClinicGallery";
import SplitCTA from "@/components/shared/SplitCTA";
import Footer from "@/components/layout/Footer";
import SolidNavTrigger from "@/components/layout/SolidNavTrigger";
import { richText } from "@/lib/richText";

const credentialKeys = ["item1", "item2", "item3"] as const;

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      <SolidNavTrigger />

      <section className="relative overflow-hidden pt-36 pb-20 md:pt-40 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="max-w-155">
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
                <p className="text-label text-stone flex items-center gap-4 tracking-wide uppercase">
                  <span aria-hidden="true" className="bg-gold h-px w-10" />
                  {t("hero.role")}
                </p>
              </Arrive>
            </div>

            <Arrive delay={0.12}>
              <div className="relative ms-auto w-full max-w-105">
                <div
                  aria-hidden="true"
                  className="rounded-card border-gold/40 absolute -inset-e-4 -bottom-4 h-full w-full border"
                />
                <div
                  aria-hidden="true"
                  className="bg-gold/10 pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
                />
                <div className="noor-image-frame relative aspect-2/3 w-full">
                  <div
                    role="img"
                    aria-label={t("hero.eyebrow")}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url(/images/doctor-portrait.webp)" }}
                  />
                </div>
              </div>
            </Arrive>
          </div>
        </Container>
      </section>

      <section className="from-ivory bg-linear-to-b via-[#F6F1E8] to-[#EFE6D6] py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.08fr_1.2fr] md:gap-20">
            <Arrive>
              <div className="bg-gold mb-5 h-0.5 w-10" />
              <Heading size="h2" className="max-w-90 text-balance">
                {t("story.heading")}
              </Heading>
            </Arrive>

            <Arrive delay={0.12}>
              <p className="font-heading text-charcoal text-[clamp(1.4rem,2.5vw,2.1rem)] leading-[1.35] text-pretty">
                {t("story.body")}
              </p>
            </Arrive>
          </div>
        </Container>
      </section>

      <section className="bg-pine text-ivory relative overflow-hidden py-24 md:py-36">
        <Container className="relative">
          <Arrive>
            <figure className="relative mx-auto max-w-245">
              <span
                aria-hidden="true"
                className="font-heading text-gold/20 pointer-events-none absolute inset-s-0 -top-16 text-[12rem] leading-none md:-top-24 md:text-[16rem]"
              >
                “
              </span>

              <blockquote className="font-heading text-ivory relative text-[clamp(2rem,5vw,4.25rem)] leading-[1.1] font-medium text-balance">
                {t("philosophy.quote")}
              </blockquote>

              <figcaption className="text-label text-mist relative mt-8 flex items-center gap-4">
                <span aria-hidden="true" className="bg-gold h-px w-10" />
                {t("philosophy.attribution")}
              </figcaption>
            </figure>
          </Arrive>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Arrive>
            <Heading size="h2" className="mb-12">
              {t("credentials.heading")}
            </Heading>
          </Arrive>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {credentialKeys.map((key, i) => (
              <Arrive key={key} delay={i * 0.1}>
                <div className="border-sand border-t pt-6">
                  <span className="font-heading text-gold mb-4 block text-[clamp(2.5rem,4vw,3.5rem)] leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-heading text-charcoal text-[clamp(1.2rem,1.8vw,1.5rem)] leading-snug text-balance">
                    {t(`credentials.${key}`)}
                  </p>
                </div>
              </Arrive>
            ))}
          </div>
        </Container>
      </section>

      <section className="from-ivory bg-linear-to-b via-[#F6F1E8] to-[#EFE6D6] py-20 md:py-28">
        <Container>
          <Arrive>
            <Heading size="h2" className="mb-10 md:mb-14">
              {t("clinic.heading")}
            </Heading>
          </Arrive>

          <ClinicGallery />
        </Container>
      </section>

      <section className="py-10 md:py-28">
        <Container>
          <SplitCTA
            image="/images/about-corridor.webp"
            heading={t("closing.heading")}
            body={t("closing.body")}
            ctaLabel={"closing.cta"}
            ctaHref="/booking"
          />
        </Container>
      </section>

      <Footer />
    </>
  );
}
