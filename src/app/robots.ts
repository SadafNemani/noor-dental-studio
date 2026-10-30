import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(ALLOW_INDEXING ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
