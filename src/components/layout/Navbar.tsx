"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { IconBrandWhatsapp, IconPhone } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { useDirection } from "@/hooks/useDirection";
import { useNavEnvironment } from "@/context/NavEnvironmentContext";
import Button from "@/components/ui/Button";
import LangToggle from "@/components/ui/LangToggle";
import { clinicInfo } from "@/data/clinicInfo";

const envStyles = {
  image: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "#FAF6F1",
    borderRadius: 24,
    marginTop: 14,
    boxShadow: "0 0px 0px rgba(0,0,0,0)",
  },
  dark: {
    backgroundColor: "rgba(24,38,32,0.45)",
    color: "#FAF6F1",
    borderRadius: 24,
    marginTop: 14,
    boxShadow: "0 0px 0px rgba(0,0,0,0)",
  },
  light: {
    backgroundColor: "rgba(255,253,251,0.85)",
    color: "#26241F",
    borderRadius: 24,
    marginTop: 14,
    boxShadow: "0 20px 40px rgba(35,36,25,0.10)",
  },
  solid: {
    backgroundColor: "rgba(255,253,251,0.92)",
    color: "#26241F",
    borderRadius: 24,
    marginTop: 14,
    boxShadow: "0 20px 40px rgba(35,36,25,0.10)",
  },
} as const;

export default function Navbar() {
  const { isRTL } = useDirection();
  const { environment } = useNavEnvironment();
  const t = useTranslations("nav");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/your-care", label: t("yourCare") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header dir={isRTL ? "rtl" : "ltr"} className="fixed inset-x-0 top-0 z-100 mx-[3vw]">
      <motion.div
        animate={envStyles[environment]}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 backdrop-blur-md md:px-8"
      >
        <Link href="/" className="font-heading text-2xl">
          Noor
        </Link>

        <nav className="hidden gap-8 text-sm font-medium tracking-wide md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-opacity hover:opacity-70">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={clinicInfo.whatsappHref}
            aria-label={t("whatsappLabel")}
            className="hidden opacity-60 transition-opacity hover:opacity-100 sm:inline"
          >
            <IconBrandWhatsapp size={17} aria-hidden="true" />
          </a>
          <a
            href={clinicInfo.phoneHref}
            aria-label={t("callLabel")}
            className="hidden opacity-60 transition-opacity hover:opacity-100 sm:inline"
          >
            <IconPhone size={17} aria-hidden="true" />
          </a>
          <LangToggle />

          <Button href="/booking">{t("bookAVisit")}</Button>
        </div>
      </motion.div>
    </header>
  );
}
