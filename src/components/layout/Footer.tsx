import { getTranslations } from "next-intl/server";
import Container from "./Container";
import Button from "../ui/Button";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="border-sand border-t py-6">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-label text-stone flex flex-wrap gap-5">
          <span className="flex items-center gap-1.5">
            <i className="ti ti-clock" aria-hidden="true" />
            {t("hours")}
          </span>

          <span className="flex items-center gap-1.5">
            <i className="ti ti-map-pin" aria-hidden="true" />
            {t("location")}
          </span>

          <a
            href="https://wa.me/97140000000"
            className="hover:text-charcoal flex items-center gap-1.5"
          >
            <i className="ti ti-brand-whatsapp" aria-hidden="true" />
            {t("whatsapp")}
          </a>
          <a href="tel:+97140000000" className="hover:text-charcoal flex items-center gap-1.5">
            <i className="ti ti-phone" aria-hidden="true" />
            {t("phone")}
          </a>
        </div>
      </Container>
    </footer>
  );
}
