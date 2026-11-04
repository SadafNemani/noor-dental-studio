"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconBrandWhatsapp, IconMenu2, IconPhone, IconX } from "@tabler/icons-react";
import { Link, usePathname } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import { navItems } from "@/data/navItems";
import { clinicInfo } from "@/data/clinicInfo";
import { cn } from "@/lib/cn";

const languages = [
  { locale: "en", label: "English" },
  { locale: "ar", label: "العربية" },
] as const;

export default function MobileMenu() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) dialogRef.current?.close();
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function openMenu() {
    dialogRef.current?.showModal();
    setOpen(true);
  }
  function closeMenu() {
    dialogRef.current?.close();
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t("openMenu")}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full md:hidden"
      >
        <IconMenu2 size={24} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={t("menu")}
        onClose={() => setOpen(false)}
        className="menu-dialog bg-pine-deep text-ivory fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto p-0 backdrop:bg-transparent md:hidden"
      >
        <div className="text-ivory flex min-h-full flex-col px-[8vw] pt-6 pb-8">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={closeMenu} className="font-heading text-ivory text-2xl">
              Noor
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label={t("closeMenu")}
              className="border-ivory/30 bg-ivory/10 text-ivory hover:bg-ivory/20 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors"
            >
              <IconX size={24} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={t("menu")} className="mt-10 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "border-ivory/10 font-heading border-b py-5 text-[clamp(2rem,9vw,2.75rem)] leading-none transition-colors",
                  isActive(item.href) ? "text-gold" : "text-ivory hover:text-gold"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-6 pt-10">
            <div className="text-ivory/80 flex items-center gap-6 text-sm">
              <a
                href={clinicInfo.whatsappHref}
                className="hover:text-ivory inline-flex items-center gap-2"
              >
                <IconBrandWhatsapp size={18} aria-hidden="true" />
                {t("whatsappLabel")}
              </a>
              <a
                href={clinicInfo.phoneHref}
                className="hover:text-ivory inline-flex items-center gap-2"
              >
                <IconPhone size={18} aria-hidden="true" />
                {t("callLabel")}
              </a>
            </div>

            <div role="group" aria-label={t("language")} className="flex gap-3">
              {languages.map((lang) => {
                const current = locale === lang.locale;
                return (
                  <Link
                    key={lang.locale}
                    href={pathname}
                    locale={lang.locale}
                    lang={lang.locale}
                    onClick={closeMenu}
                    aria-current={current ? "true" : undefined}
                    className={cn(
                      "flex h-12 flex-1 items-center justify-center rounded-full border text-base transition-colors",
                      current
                        ? "border-ivory bg-ivory text-charcoal"
                        : "border-ivory/30 text-ivory hover:border-ivory"
                    )}
                  >
                    {lang.label}
                  </Link>
                );
              })}
            </div>

            <div onClick={closeMenu}>
              <Button href="/booking" className="w-full justify-between">
                {t("bookAVisit")}
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
