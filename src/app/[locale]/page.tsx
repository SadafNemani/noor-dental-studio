import PinnedSceneSystem from "@/components/scenes/PinnedSceneSystem";
import Scene from "@/components/scenes/Scene";
import GradientBlob from "@/components/motion/GradientBlob";
import Arrive from "@/components/motion/Arrive";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Button from "@/components/ui/Button";
import HelpCardGrid from "@/components/home/HelpCardGrid";
import PillarsRow from "@/components/home/PillarsRow";
import DoctorTeaser from "@/components/home/DoctorTeaser";
import TreatmentTeaser from "@/components/home/TreatmentTeaser";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getTranslations } from "next-intl/server";
import { richText } from "@/lib/richText";
import AtmosphereWash from "@/components/motion/AtmoshphereWash";
import VeilRevealBackground from "@/components/home/VeilRevealBackground";

export default async function HomePage() {
  const t = await getTranslations("home.hero");
  const tClosing = await getTranslations("home.closing");

  return (
    <>
      <PinnedSceneSystem>
        <Scene background="image" image="/images/home-hero.webp" mirrorInRtl>
          <div className="relative flex flex-col gap-10 pt-24 md:h-[72vh] md:justify-between md:gap-5 md:pt-10">
            <Arrive>
              <span className="font-body text-ivory/80 text-[11px] font-medium tracking-[0.18em] uppercase">
                {t("eyebrow")}
              </span>
            </Arrive>

            <div className="max-w-180">
              <Arrive delay={0.06}>
                <Heading as="h1" size="h1" className="text-ivory leading-[1.04]">
                  {t.rich("heading", richText)}
                </Heading>
              </Arrive>
            </div>

            <Arrive delay={0.16}>
              <Text className="text-mist mb-8 max-w-95">{t("sub")}</Text>
            </Arrive>

            <Arrive delay={0.22}>
              <div className="flex flex-wrap gap-4">
                <Button href="/booking">{t("bookCta")}</Button>

                <Button href="/about" variant="secondary" className="text-ivory">
                  {t("meetCta")}
                </Button>
              </div>
            </Arrive>
          </div>
        </Scene>

        <Scene background="light">
          <div className="relative w-full">
            <GradientBlob className="-inset-s-40 -top-40" />
            <HelpCardGrid />
          </div>
        </Scene>

        <Scene background="light" backgroundEffect={<AtmosphereWash />}>
          <PillarsRow />
        </Scene>

        <Scene background="dark">
          <Container>
            <DoctorTeaser />
          </Container>
        </Scene>
        <Scene
          background="dark"
          backgroundEffect={<VeilRevealBackground image="/images/invisalign-reveal.webp" mirror />}
          className="invisalign-scene"
        >
          <Container>
            <TreatmentTeaser />
          </Container>
        </Scene>
      </PinnedSceneSystem>

      <section className="px-[8vw] py-24 text-center">
        <Heading size="h2" className="mb-3">
          {tClosing("heading")}
        </Heading>

        <Text muted className="mb-8">
          {tClosing("body")}
        </Text>

        <Button href="/booking">{tClosing("cta")}</Button>
      </section>

      <Footer />
    </>
  );
}
