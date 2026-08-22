import type { MetadataRoute } from "next";
import { SITE_URL } from "./daten";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Der Verwaltungsbereich gehört nicht in den Index. Die Seite selbst
      // setzt zusätzlich noindex, denn robots.txt allein hält Suchmaschinen
      // nicht zuverlässig davon ab, eine URL aufzunehmen.
      disallow: "/admin",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Sagt Suchmaschinen, welche Schreibweise der Domain die richtige ist.
    host: SITE_URL,
  };
}
