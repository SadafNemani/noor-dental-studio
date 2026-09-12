"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useDirection } from "@/hooks/useDirection";
import { useScrolled } from "@/hooks/useScrolled";
import Container from "./Container";
import Button from "../ui/Button";
import LangToggle from "../ui/LangToggle";
import { cn } from "@/lib/cn";
import { clinicInfo } from "@/data/clinicInfo";

export default function Navbar() {
  const { isRTL } = useDirection();
  const scrolled = useScrolled();
  const t = useTranslations("nav");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/your-care", label: t("yourCare") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "fixed inset-x-0 top-0 z-100 transition-colors duration-300",
        scrolled
          ? "text-charcoal shadow-soft bg-white/90 backdrop-blur"
          : "text-ivory bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-heading text-lg">
          Noor
        </Link>

        <nav className="text-label hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-70">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href={clinicInfo.whatsappHref}
            aria-label={t("whatsappLabel")}
            className="hidden sm:inline"
          >
            <i className="ti ti-brand-whatsapp text-lg" aria-hidden="true" />
          </a>
          <a href={clinicInfo.phoneHref} aria-label={t("callLabel")} className="hidden sm:inline">
            <i className="ti ti-phone text-lg" aria-hidden="true" />
          </a>
          <Button
            href="/booking"
            className={!scrolled ? "bg-gold text-charcoal hover:bg-gold/90" : undefined}
          >
            {t("bookAVisit")}
          </Button>
        </div>
      </Container>
    </header>
  );
}
