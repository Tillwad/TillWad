import {
  Laptop,
  Smartphone,
  Wifi,
  Printer,
  ShieldCheck,
  Tv,
} from "lucide-react";

// Telefonnummer und E-Mail-Adresse stehen bewusst nicht hier, sondern zerlegt
// in app/schutz-links.tsx, damit sie nicht im Klartext im HTML landen.

export const SITE_URL = "https://www.tillwadehn.de";

export const ADRESSE = ["Breisgauer Str. 27", "14129 Berlin"];

export const PREIS_STUNDE = "46 € pro Stunde";

export const leistungen = [
  {
    icon: Laptop,
    farbe: "bg-blue-100 text-blue-700",
    titel: "Computer & Laptop",
    beschreibung:
      "Einrichtung, langsame Geräte wieder schnell machen, Programme installieren und alle Fragen rund um Windows oder Apple.",
  },
  {
    icon: Smartphone,
    farbe: "bg-amber-100 text-amber-700",
    titel: "Handy & Tablet",
    beschreibung:
      "Neues Handy einrichten, Fotos sichern, WhatsApp erklären und alles so einstellen, dass Sie gut damit zurechtkommen.",
  },
  {
    icon: Wifi,
    farbe: "bg-sky-100 text-sky-700",
    titel: "Internet & WLAN",
    beschreibung:
      "Internet funktioniert nicht? Ich richte Ihren Router ein und sorge dafür, dass das WLAN in der ganzen Wohnung gut ankommt.",
  },
  {
    icon: Printer,
    farbe: "bg-violet-100 text-violet-700",
    titel: "Drucker & Geräte",
    beschreibung:
      "Drucker anschließen und einrichten, damit das Drucken vom Computer und vom Handy aus einfach funktioniert.",
  },
  {
    icon: Tv,
    farbe: "bg-rose-100 text-rose-700",
    titel: "Fernseher & Streaming",
    beschreibung:
      "Smart-TV einrichten, Mediatheken und Streaming-Dienste wie die ARD-Mediathek oder Netflix verständlich erklärt.",
  },
  {
    icon: ShieldCheck,
    farbe: "bg-green-100 text-green-700",
    titel: "Sicherheit & Betrugsschutz",
    beschreibung:
      "Ich zeige Ihnen, wie Sie betrügerische E-Mails und Anrufe erkennen, und mache Ihre Geräte sicher.",
  },
];

export type Ort = {
  slug: string;
  name: string;
  text: string;
  bild: string;
  bildAlt: string;
  bildAutor: string;
  bildLizenz: string;
  bildLizenzUrl: string;
};

export const orte: Ort[] = [
  {
    slug: "kleinmachnow",
    name: "Kleinmachnow",
    text: "Auch außerhalb der Berliner Stadtgrenze bin ich für Sie da: Nach Kleinmachnow komme ich regelmäßig – die Anfahrt kostet Sie selbstverständlich nichts.",
    bild: "/images/orte/kleinmachnow.jpg",
    bildAlt: "Die Schleuse Kleinmachnow",
    bildAutor: "A.Savin",
    bildLizenz: "FAL",
    bildLizenzUrl: "http://artlibre.org/licence/lal/en",
  },
  {
    slug: "wannsee",
    name: "Wannsee",
    text: "Ob im Ortskern von Wannsee oder in den ruhigen Seitenstraßen Richtung Havel – ich komme zu Ihnen nach Hause und nehme mir Zeit für Ihr Anliegen.",
    bild: "/images/orte/wannsee.jpg",
    bildAlt: "Blick über den Großen Wannsee",
    bildAutor: "Times",
    bildLizenz: "CC BY-SA 3.0",
    bildLizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    slug: "schlachtensee",
    name: "Schlachtensee",
    text: "Rund um den Schlachtensee helfe ich Ihnen direkt bei Ihnen zu Hause – geduldig, verständlich und ohne Fachchinesisch.",
    bild: "/images/orte/schlachtensee.jpg",
    bildAlt: "Der Schlachtensee",
    bildAutor: "A.Savin",
    bildLizenz: "FAL",
    bildLizenzUrl: "http://artlibre.org/licence/lal/en",
  },
  {
    slug: "nikolassee",
    name: "Nikolassee",
    text: "In Nikolassee bin ich schnell bei Ihnen: Ich helfe direkt vor Ort bei Computer, Handy und Internet und erkläre alles in Ruhe.",
    bild: "/images/orte/nikolassee.jpg",
    bildAlt: "Der S-Bahnhof Nikolassee",
    bildAutor: "A.Savin",
    bildLizenz: "FAL",
    bildLizenzUrl: "http://artlibre.org/licence/lal/en",
  },
  {
    slug: "grunewald",
    name: "Grunewald",
    text: "Auch im Grunewald bin ich für Sie unterwegs und helfe bei allen Fragen rund um Computer, Fernseher, WLAN und Drucker.",
    bild: "/images/orte/grunewald.jpg",
    bildAlt: "Der Grunewaldturm",
    bildAutor: "Times",
    bildLizenz: "CC BY-SA 3.0",
    bildLizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    slug: "dahlem",
    name: "Dahlem",
    text: "In Dahlem komme ich direkt zu Ihnen nach Hause – vom Dorfkern bis zu den Straßen rund um die Freie Universität.",
    bild: "/images/orte/dahlem.jpg",
    bildAlt: "Die Domäne Dahlem",
    bildAutor: "Karl-Heinz Meurer",
    bildLizenz: "CC BY-SA 3.0",
    bildLizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    slug: "zehlendorf",
    name: "Zehlendorf",
    text: "Zehlendorf ist das Herz meines Einzugsgebiets – hier bin ich besonders schnell bei Ihnen und helfe bei allem, was Technik heißt.",
    bild: "/images/orte/zehlendorf.jpg",
    bildAlt: "Das Rathaus Zehlendorf",
    bildAutor: "Clemensfranz",
    bildLizenz: "CC BY-SA 3.0",
    bildLizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    slug: "teltow",
    name: "Teltow",
    text: "Auch nach Teltow komme ich gerne zu Ihnen nach Hause – die Anfahrt ist für Sie kostenlos, versprochen.",
    bild: "/images/orte/teltow.jpg",
    bildAlt: "Die St.-Andreas-Kirche in Teltow",
    bildAutor: "Bautsch",
    bildLizenz: "CC0",
    bildLizenzUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.de",
  },
];
