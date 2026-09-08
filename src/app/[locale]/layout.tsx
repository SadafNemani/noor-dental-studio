import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fraunces, inter, markaziText, plexArabic } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Noor Dental Studio",
  description: "Designing calm, confident smiles.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const fontVars = `${fraunces.variable} ${inter.variable} ${markaziText.variable} ${plexArabic.variable}`;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={fontVars}
        style={
          {
            "--font-heading": isRTL ? "var(--font-heading-ar)" : "var(--font-heading-en)",
            "--font-body": isRTL ? "var(--font-body-ar)" : "var(--font-body-en)",
          } as React.CSSProperties
        }
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
