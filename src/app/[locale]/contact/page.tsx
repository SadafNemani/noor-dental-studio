import { getTranslations } from "next-intl/server";
import { IconBrandWhatsapp, IconClock, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Arrive from "@/components/motion/Arrive";
import ActionCard from "@/components/contact/ActionCard";
import ContactForm from "@/components/contact/ContactForm";
import StaticMap from "@/components/contact/StaticMap";
import Footer from "@/components/layout/Footer";
import SolidNavTrigger from "@/components/layout/SolidNavTrigger";
import { richText } from "@/lib/richText";
import { clinicInfo } from "@/data/clinicInfo";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tFooter = await getTranslations("footer");
  const whatsappHref = `${clinicInfo.whatsappHref}?text=${encodeURIComponent(t("actions.whatsapp.prefill"))}`;

  const dtClass =
    "mb-3 flex items-center gap-2 font-body text-label uppercase tracking-wide text-stone";
  const iconClass = "text-gold";

  return (
    <>
      <SolidNavTrigger />

      <section className="pt-36 pb-10 md:pt-40 md:pb-14">
        <Container>
          <div className="max-w-180">
            <Arrive>
              <Eyebrow className="mb-5">{t("hero.eyebrow")}</Eyebrow>
            </Arrive>
            <Arrive delay={0.08}>
              <Heading
                size="h1"
                as="h1"
                className="mb-5 text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.01em] text-balance"
              >
                {t.rich("hero.heading", richText)}
              </Heading>
            </Arrive>
            <Arrive delay={0.16}>
              <Text muted className="max-w-115 text-pretty">
                {t("hero.sub")}
              </Text>
            </Arrive>
          </div>
        </Container>
      </section>

      <section className="pb-14 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <Arrive>
              <ActionCard
                tone="dark"
                external
                href={whatsappHref}
                icon={IconBrandWhatsapp}
                title={t("actions.whatsapp.title")}
                detail={t("actions.whatsapp.desc")}
              />
            </Arrive>
            <Arrive delay={0.08}>
              <ActionCard
                href={clinicInfo.phoneHref}
                icon={IconPhone}
                title={t("actions.call.title")}
                detail={<bdi dir="ltr">{tFooter("phone")}</bdi>}
              />
            </Arrive>
            <Arrive delay={0.16}>
              <ActionCard
                href={clinicInfo.emailHref}
                icon={IconMail}
                title={t("actions.email.title")}
                detail={<bdi dir="ltr">{clinicInfo.email}</bdi>}
              />
            </Arrive>
          </div>
        </Container>
      </section>

      <section className="from-ivory bg-linear-to-b via-[#F6F1E8] to-[#EFE6D6] pt-10 pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-12">
            <div className="rounded-card shadow-soft bg-white p-8 md:p-10">
              <ContactForm />
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-card shadow-soft bg-white p-8 md:p-10">
                <Heading size="h3" className="mb-6">
                  {t("details.heading")}
                </Heading>
                <dl className="divide-sand divide-y">
                  <div className="pb-5">
                    <dt className={dtClass}>
                      <IconClock
                        size={16}
                        strokeWidth={1.5}
                        className={iconClass}
                        aria-hidden="true"
                      />
                      {t("details.hoursLabel")}
                    </dt>
                    <dd className="font-body text-body text-charcoal flex flex-col gap-1.5">
                      <span className="flex justify-between gap-4">
                        <span>{t("details.weekdays")}</span>
                        <span>{t("details.weekdaysTime")}</span>
                      </span>
                      <span className="text-stone flex justify-between gap-4">
                        <span>{t("details.sunday")}</span>
                        <span>{t("details.closed")}</span>
                      </span>
                    </dd>
                  </div>
                  <div className="py-5">
                    <dt className={dtClass}>
                      <IconMapPin
                        size={16}
                        strokeWidth={1.5}
                        className={iconClass}
                        aria-hidden="true"
                      />
                      {t("details.locationLabel")}
                    </dt>
                    <dd className="font-body text-body text-charcoal">{t("details.address")}</dd>
                  </div>
                  <div className="py-5">
                    <dt className={dtClass}>
                      <IconPhone
                        size={16}
                        strokeWidth={1.5}
                        className={iconClass}
                        aria-hidden="true"
                      />
                      {t("details.phoneLabel")}
                    </dt>
                    <dd className="font-body text-body text-charcoal">
                      <a
                        href={clinicInfo.phoneHref}
                        className="hover:text-pine cursor-pointer transition-colors"
                      >
                        <bdi dir="ltr">{tFooter("phone")}</bdi>
                      </a>
                    </dd>
                  </div>
                  <div className="pt-5">
                    <dt className={dtClass}>
                      <IconMail
                        size={16}
                        strokeWidth={1.5}
                        className={iconClass}
                        aria-hidden="true"
                      />
                      {t("details.emailLabel")}
                    </dt>
                    <dd className="font-body text-body text-charcoal">
                      <a
                        href={clinicInfo.emailHref}
                        className="hover:text-pine cursor-pointer transition-colors"
                      >
                        <bdi dir="ltr">{clinicInfo.email}</bdi>
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <StaticMap
                label={t("map.label")}
                ariaLabel={t("map.ariaLabel")}
                address={t("details.address")}
                directionsLabel={t("map.directions")}
                href={clinicInfo.mapEmbedUrl}
              />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
