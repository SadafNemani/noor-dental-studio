"use client";
import PinnedSceneSystem from "@/components/scenes/PinnedSceneSystem";
import Scene from "@/components/scenes/Scene";
import Arrive from "@/components/motion/Arrive";
import GradientBlob from "@/components/motion/GradientBlob";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function TestScenesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <>
      <button
        className="rounded-button bg-charcoal text-ivory fixed top-20 right-4 z-60 px-4 py-2 text-xs"
        onClick={() => router.replace(pathname, { locale: locale === "en" ? "ar" : "en" })}
      >
        Toggle {locale === "en" ? "AR" : "EN"}
      </button>

      <PinnedSceneSystem>
        <Scene background="dark">
          <Arrive>
            <h1 className="font-heading text-h1">Scene one</h1>
          </Arrive>
          <Arrive delay={0.1}>
            <p className="font-body text-body">Testing the pin and crossfade.</p>
          </Arrive>
        </Scene>

        <Scene background="light">
          <GradientBlob className="-top-40 -left-40" />
          <Arrive>
            <h2 className="font-heading text-h2 text-charcoal">Scene two</h2>
          </Arrive>
        </Scene>
      </PinnedSceneSystem>
    </>
  );
}
