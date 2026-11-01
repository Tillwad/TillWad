import type { MetadataRoute } from "next";
import { orte, SITE_URL } from "./daten";
import { produkte } from "./shop/produkte";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    ...[
      "/it-hilfe",
      "/computerhilfe-senioren",
      "/wlan-hilfe",
      "/drucker-hilfe",
      "/fernseher-hilfe",
      "/termin",
    ].map((pfad) => ({
      url: `${SITE_URL}${pfad}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...orte.map((ort) => ({
      url: `${SITE_URL}/it-hilfe/${ort.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...produkte.map((produkt) => ({
      url: `${SITE_URL}/shop/${produkt.slug}`,
      lastModified: new Date(),
      priority: 0.6,
    })),
  ];
}
