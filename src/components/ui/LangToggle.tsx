"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "en" ? "ar" : "en";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="text-label rounded-full border border-current px-3 py-1"
      aria-label={`Switch to ${nextLocale === "ar" ? "Arabic" : "English"}`}
    >
      {nextLocale === "ar" ? "عربي" : "EN"}
    </button>
  );
}
