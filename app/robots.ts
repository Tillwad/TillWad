import type { MetadataRoute } from "next";
import { SITE_URL } from "./daten";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Sagt Suchmaschinen, welche Schreibweise der Domain die richtige ist.
    host: SITE_URL,
  };
}
