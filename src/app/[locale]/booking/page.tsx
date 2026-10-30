import { getTranslations } from "next-intl/server";
import { IconBrandWhatsapp, IconClock, IconMapPin, IconPhone } from "@tabler/icons-react";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import BookingStepper from "@/components/booking/BookingStepper";
import Footer from "@/components/layout/Footer";
import SolidNavTrigger from "@/components/layout/SolidNavTrigger";
import { richText } from "@/lib/richText";
import { clinicInfo } from "@/data/clinicInfo";
import { isReasonKey } from "@/data/bookingReasons";

import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "booking" });
}

const contactRows = [
  { key: "hours", icon: IconClock, href: null },
  { key: "location", icon: IconMapPin, href: null },
  { key: "whatsapp", icon: IconBrandWhatsapp, href: clinicInfo.whatsappHref },
  { key: "phone", icon: IconPhone, href: clinicInfo.phoneHref },
] as const;

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const t = await getTranslations("booking");
  const tFooter = await getTranslations("footer");
  const { reason } = await searchParams;
  const initialReason = isReasonKey(reason) ? reason : null;

  return (
    <>
      <SolidNavTrigger />

      <section className="pt-36 pb-10 md:pt-40 md:pb-14">
        <Container>
          <div className="max-w-180">
            <Arrive>
              <Eyebrow className="mb-5">{t("page.eyebrow")}</Eyebrow>
            </Arrive>

            <Arrive delay={0.8}>
              <Heading
                size="h1"
                as="h1"
                className="mb-5 text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.01] text-balance"
              >
                {t.rich("page.heading", richText)}
              </Heading>
            </Arrive>

            <Arrive delay={0.16}>
              <Text muted className="max-w-115 text-pretty">
                {t("page.sub")}
              </Text>
            </Arrive>
          </div>
        </Container>
      </section>

      <section className="from-ivory bg-linear-to-b via-[#F6F1E8] to-[#EFE6D6] pt-10 pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.25fr_0.75fr] md:items-start md:gap-16">
            <div className="rounded-card shadow-soft bg-white p-6 md:min-h-135 md:p-10">
              <BookingStepper initialReason={initialReason} />
            </div>

            <aside className="md:sticky md:top-32">
              <div className="bg-gold mb-5 h-0.5 w-10" />
              <Heading size="h3" className="mb-3">
                {t("page.asideHeading")}
              </Heading>
              <Text muted className="mb-8 text-pretty">
                {t("page.asideBody")}
              </Text>
              <ul className="flex flex-col gap-4">
                {contactRows.map((row) => {
                  const Icon = row.icon;
                  const text = row.key === "phone" ? clinicInfo.phone : tFooter(row.key);
                  const label = row.key === "phone" ? <bdi dir="ltr">{text}</bdi> : text;
                  const inner = (
                    <>
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-gold shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-body text-body">{label}</span>
                    </>
                  );
                  return (
                    <li key={row.key}>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="text-charcoal hover:text-pine flex cursor-pointer items-center gap-3 transition-colors"
                        >
                          {inner}
                        </a>
                      ) : (
                        <span className="text-charcoal/80 flex items-center gap-3">{inner}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
