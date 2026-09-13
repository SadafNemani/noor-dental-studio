import PinnedSceneSystem from "@/components/scenes/PinnedSceneSystem";
import Scene from "@/components/scenes/Scene";
import GradientBlob from "@/components/motion/GradientBlob";
import Arrive from "@/components/motion/Arrive";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Eyebrow from "@/components/typography/Eyebrow";
import Button from "@/components/ui/Button";
import HelpCardGrid from "@/components/home/HelpCardGrid";
import PillarsRow from "@/components/home/PillarsRow";
import DoctorTeaser from "@/components/home/DoctorTeaser";
import TreatmentTeaser from "@/components/home/TreatmentTeaser";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home.hero");
  const tClosing = await getTranslations("home.closing");

  return (
    <>
      <PinnedSceneSystem>
        <Scene background="image" image="/images/home-hero.webp">
          <div className="max-w-140">
            <Arrive>
              <Eyebrow className="text-gold mb-4">{t("eyebrow")}</Eyebrow>
            </Arrive>

            <Arrive delay={0.06}>
              <Heading size="h1" className="mb-5">
                {t("heading")}
              </Heading>
            </Arrive>

            <Arrive delay={0.12}>
              <Text className="text-mist mb-8 max-w-95">{t("sub")}</Text>
            </Arrive>

            <Arrive delay={0.18}>
              <div className="flex flex-wrap gap-3.5">
                <Button href="/booking" className="bg-gold text-charcoal hover:bg-gold/90">
                  {t("bookCta")}
                </Button>

                <Button href="/about" variant="ghost">
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

        <Scene background="light">
          <PillarsRow />
        </Scene>

        <Scene background="dark">
          <Container>
            <DoctorTeaser />
          </Container>
        </Scene>

        <Scene background="dark">
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
