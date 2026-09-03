import type { MetadataRoute } from "next";
import { orte, SITE_URL } from "./daten";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    ...["/wlan-hilfe", "/drucker-hilfe", "/fernseher-hilfe"].map((pfad) => ({
      url: `${SITE_URL}${pfad}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...orte.map((ort) => ({
      url: `${SITE_URL}/it-hilfe/${ort.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
