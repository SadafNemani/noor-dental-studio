import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { SITE_URL, ALLOW_INDEXING } from "@/lib/seo";

import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/markazi-text";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";

import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import { NavEnvironmentProvider } from "@/context/NavEnvironmentContext";
import DemoBanner from "@/components/layout/DemoBanner";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: t("siteName"),
    title: { default: t("home.title"), template: `%s | ${t("siteName")}` },
    robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const isRTL = locale === "ar";

  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavEnvironmentProvider>
            <a
              href="#main"
              className="focus:bg-gold focus:text-charcoal sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-110 focus:rounded-full focus:px-5 focus:py-3 focus:text-sm focus:font-medium"
            >
              {tNav("skipToContent")}
            </a>
            <Navbar />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <DemoBanner />
            <Footer />
          </NavEnvironmentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
