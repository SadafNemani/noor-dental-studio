import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { routes } from "@/lib/routes";
import { SITE_URL, localizedPath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes).flatMap(({ path }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${localizedPath(locale, path)}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}${localizedPath(l, path)}`])
        ),
      },
    }))
  );
}
