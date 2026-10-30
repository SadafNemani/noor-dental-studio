import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { routes, type PageKey } from "./routes";

type Locale = (typeof routing.locales)[number];

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  ""
);
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

const OG_LOCALE: Record<Locale, string> = { en: "en_US", ar: "ar_AE" };

export function localizedPath(locale: string, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedPath(l, path)])),
    "x-default": localizedPath(routing.defaultLocale, path),
  };
}

export async function buildPageMetadata({
  locale,
  page,
}: {
  locale: string;
  page: PageKey;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const { path } = routes[page];
  const siteName = t("siteName");
  const isHome = page === "home";
  const title = t(`${page}.title`);
  const fullTitle = isHome ? title : `${title} | ${siteName}`;
  const description = t(`${page}.description`);
  const url = localizedPath(locale, path);
  const image = { url: `/og/noor-${locale}.jpg`, width: 1200, height: 630, alt: siteName };

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName,
      title: fullTitle,
      description,
      url,
      locale: OG_LOCALE[locale as Locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
