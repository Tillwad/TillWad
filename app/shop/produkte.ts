import {
  type LucideIcon,
  Laptop,
  PcCase,
  Monitor,
  Wifi,
  Printer,
  HardDrive,
  Mouse,
  Tablet,
  ShieldCheck,
} from "lucide-react";

// Das Sortiment des Shops. Bewusst eine Datei im Repo statt einer Datenbank:
// Bei rund 30 Produkten, die sich selten ändern, ist das die einfachste und
// günstigste Lösung – jede Änderung geht über einen ganz normalen Commit.
//
// Zu den Preisen: Im Affiliate-Modus (VERKAUFSMODUS in konfiguration.ts) ist
// preisEuro eine ungefähre Marktpreis-Angabe zur Orientierung ("ca. …"),
// recherchiert am 2026-11-01 – gelegentlich gegen die Realität prüfen.
// Falls der Shop je wieder selbst verkauft ("shop"-Modus): Preise vorher
// gegen den Kosatec-EK kalkulieren (werkzeuge/preis-checkliste.md).
// Faustformel als Kleinunternehmer: Kosten = EK netto × 1,19, darauf ~12 %
// Aufschlag, aufgerundet auf 9er-Endung.

export type Kategorie = {
  schluessel: string;
  titel: string;
  icon: LucideIcon;
  farbe: string;
  beschreibung: string;
};

export const kategorien: Kategorie[] = [
  {
    schluessel: "laptops",
    titel: "Laptops",
    icon: Laptop,
    farbe: "bg-blue-100 text-blue-700",
    beschreibung:
      "Drei Preisklassen, alle von mir ausgesucht. Welche die richtige ist, hängt davon ab, was Sie damit machen möchten. Im Zweifel rufen Sie mich vor dem Kauf einfach an.",
  },
  {
    schluessel: "desktop",
    titel: "Desktop & All-in-One",
    icon: PcCase,
    farbe: "bg-slate-200 text-slate-700",
    beschreibung:
      "Für den festen Platz am Schreibtisch. Ein All-in-One hat den Computer gleich im Bildschirm eingebaut: ein Kabel weniger, kein Kasten unterm Tisch.",
  },
  {
    schluessel: "monitore",
    titel: "Monitore",
    icon: Monitor,
    farbe: "bg-violet-100 text-violet-700",
    beschreibung:
      "Ein größerer Bildschirm ist die einfachste Verbesserung am Arbeitsplatz, gerade wenn die Augen nicht mehr die jüngsten sind.",
  },
  {
    schluessel: "netzwerk",
    titel: "Internet & WLAN",
    icon: Wifi,
    farbe: "bg-sky-100 text-sky-700",
    beschreibung:
      "Mein stärkstes Gebiet: Router, Verstärker und Adapter, mit denen das WLAN in jeder Ecke der Wohnung ankommt. Auf Wunsch richte ich alles bei Ihnen ein.",
  },
  {
    schluessel: "drucker",
    titel: "Drucker",
    icon: Printer,
    farbe: "bg-rose-100 text-rose-700",
    beschreibung:
      "Zwei ehrliche Empfehlungen statt dreißig Modellen: ein Tintentank-Drucker für alle, die öfter drucken, und ein Laserdrucker für alle, die selten drucken.",
  },
  {
    schluessel: "datensicherung",
    titel: "Datensicherung",
    icon: HardDrive,
    farbe: "bg-amber-100 text-amber-700",
    beschreibung:
      "Fotos und Dokumente gibt es nur einmal. Hier finden Sie alles, um sie zu sichern: von der einfachen Festplatte bis zur automatischen Sicherung für die ganze Familie.",
  },
  {
    schluessel: "zubehoer",
    titel: "Zubehör",
    icon: Mouse,
    farbe: "bg-green-100 text-green-700",
    beschreibung:
      "Die kleinen Dinge, die den Alltag am Computer leichter machen: von der kabellosen Tastatur bis zur Steckdosenleiste, die Ihre Geräte bei Gewitter schützt.",
  },
  {
    schluessel: "tablets",
    titel: "Tablets & Smart Home",
    icon: Tablet,
    farbe: "bg-indigo-100 text-indigo-700",
    beschreibung:
      "Tablets für E-Mails, Fotos und Videoanrufe mit der Familie, dazu ein paar einfache smarte Helfer für zu Hause.",
  },
  {
    schluessel: "software",
    titel: "Software",
    icon: ShieldCheck,
    farbe: "bg-teal-100 text-teal-700",
    beschreibung:
      "Office und Virenschutz als Jahreslizenz. Auf Wunsch installiere ich alles bei Ihnen und richte es fertig ein.",
  },
];

export type Preisklasse = "Einsteiger" | "Mittelklasse" | "Premium";

export type Einrichtung = {
  titel: string;
  preisEuro: number;
  beschreibung: string;
};

export type Produkt = {
  slug: string;
  name: string;
  kategorie: string;
  preisklasse?: Preisklasse;
  preisEuro: number;
  /** Zusatz hinter dem Preis, etwa "pro Jahr" bei Lizenzen. */
  preisZusatz?: string;
  /**
   * Suchbegriff für den Amazon-Partnerlink (Affiliate-Modus). Bewusst eine
   * Suche statt eines festen Produktlinks: Die geht nicht kaputt, wenn
   * Amazon ein Angebot auslistet. Link-Aufbau siehe amazonLink() in
   * konfiguration.ts.
   */
  amazonSuche?: string;
  /** Die persönliche Empfehlung – das, was Amazon nicht hat. */
  idealFuer: string;
  beschreibung: string;
  merkmale: string[];
  /** Optional dazubuchbare Einrichtung bei Ihnen zu Hause. */
  einrichtung?: Einrichtung;
  /** Abweichende Lieferzeit, sonst gilt LIEFERZEIT aus der Konfiguration. */
  lieferzeit?: string;
  /**
   * Produktfoto unter public/images/shop/, z. B. "/images/shop/<slug>.jpg".
   * Fehlt das Bild, zeigen Shop und Produktseite das Kategorie-Symbol.
   */
  bild?: string;
  bildAlt?: string;
};

export const produkte: Produkt[] = [
  // ── Laptops ────────────────────────────────────────────────────────────
  {
    slug: "lenovo-ideapad-slim-3",
    name: "Lenovo IdeaPad Slim 3 (15 Zoll)",
    kategorie: "laptops",
    preisklasse: "Einsteiger",
    preisEuro: 529,
    amazonSuche: "Lenovo IdeaPad Slim 3 15 Zoll Ryzen 16GB 512GB",
    bild: "/images/shop/lenovo-ideapad-slim-3.png",
    bildAlt: "Produktfoto: Lenovo IdeaPad Slim 3 (15 Zoll)",
    idealFuer:
      "Ideal für alle, die E-Mails schreiben, im Internet lesen und Fotos ansehen möchten. Mehr Laptop braucht man dafür nicht.",
    beschreibung:
      "Mein Standard-Tipp für den Alltag: ein unkomplizierter 15-Zoll-Laptop mit gut lesbarem Bildschirm und ordentlicher Tastatur. Er startet schnell, läuft leise und kann alles, was zu Hause anfällt, ohne dass Sie für Leistung bezahlen, die Sie nie abrufen.",
    merkmale: [
      "Großer 15,3-Zoll-Bildschirm, entspiegelt und gut lesbar",
      "Schneller SSD-Speicher, startet in Sekunden",
      "16 GB Arbeitsspeicher, 512 GB Speicherplatz",
      "Windows 11 vorinstalliert",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 89,
      beschreibung:
        "Ich packe den Laptop aus, richte Windows, E-Mail und Drucker ein, übernehme Ihre Daten vom alten Gerät und erkläre Ihnen alles in Ruhe.",
    },
  },
  {
    slug: "lenovo-thinkpad-e14",
    name: "Lenovo ThinkPad E14",
    kategorie: "laptops",
    preisklasse: "Mittelklasse",
    preisEuro: 699,
    amazonSuche: "Lenovo ThinkPad E14 16GB 512GB",
    bild: "/images/shop/lenovo-thinkpad-e14.png",
    bildAlt: "Produktfoto: Lenovo ThinkPad E14",
    idealFuer:
      "Ideal für alle, die täglich am Laptop sitzen: im Homeoffice, für die Vereinsarbeit oder die Steuererklärung.",
    beschreibung:
      "Die ThinkPad-Reihe ist seit Jahrzehnten der Klassiker für zuverlässiges Arbeiten: eine der besten Tastaturen überhaupt, robustes Gehäuse, viele Anschlüsse. Wer den Laptop jeden Tag nutzt, merkt den Unterschied zum Einsteigergerät sofort.",
    merkmale: [
      "14-Zoll-Bildschirm, sehr gute Tastatur",
      "16 GB Arbeitsspeicher, 512 GB SSD",
      "Robust gebaut, auf Langlebigkeit ausgelegt",
      "Windows 11 Pro vorinstalliert",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 89,
      beschreibung:
        "Ich packe den Laptop aus, richte Windows, E-Mail und Drucker ein, übernehme Ihre Daten vom alten Gerät und erkläre Ihnen alles in Ruhe.",
    },
  },
  {
    slug: "apple-macbook-air-13",
    name: "Apple MacBook Air (13 Zoll)",
    kategorie: "laptops",
    preisklasse: "Premium",
    preisEuro: 1149,
    amazonSuche: "Apple MacBook Air 13 Zoll M4",
    bild: "/images/shop/apple-macbook-air-13.jpg",
    bildAlt: "Produktfoto: Apple MacBook Air (13 Zoll)",
    idealFuer:
      "Ideal für alle, die bereits iPhone oder iPad nutzen: Fotos, Nachrichten und Termine sind dann automatisch auf allen Geräten gleich.",
    beschreibung:
      "Das MacBook Air ist leise (es hat keinen Lüfter), hält mit einer Akkuladung einen ganzen Tag durch und bleibt viele Jahre schnell. Wer von Windows umsteigt, bekommt von mir auf Wunsch eine geduldige Einführung dazu.",
    merkmale: [
      "13,6-Zoll-Bildschirm, hervorragende Darstellung",
      "Komplett lautlos, sehr lange Akkulaufzeit",
      "Arbeitet nahtlos mit iPhone und iPad zusammen",
      "Erfahrungsgemäß 8 bis 10 Jahre nutzbar",
    ],
    einrichtung: {
      titel: "Einrichtung und Umstiegshilfe bei Ihnen zu Hause",
      preisEuro: 89,
      beschreibung:
        "Ich richte das MacBook ein, übernehme Ihre Daten und zeige Ihnen die Unterschiede zu Windows, so lange, bis Sie sich sicher fühlen.",
    },
  },

  // ── Desktop & All-in-One ───────────────────────────────────────────────
  {
    slug: "lenovo-mini-pc",
    name: "Lenovo ThinkCentre Mini-PC",
    kategorie: "desktop",
    preisEuro: 649,
    amazonSuche: "Lenovo ThinkCentre Tiny Mini-PC Ryzen 16GB 512GB",
    bild: "/images/shop/lenovo-mini-pc.png",
    bildAlt: "Produktfoto: Lenovo ThinkCentre Mini-PC",
    idealFuer:
      "Ideal für den festen Schreibtisch-Platz: kaum größer als ein Buch, aber ein vollwertiger Computer für alle Alltagsaufgaben.",
    beschreibung:
      "Wer einen Bildschirm, eine Tastatur und eine Maus hat (oder dazu bestellt), bekommt mit diesem kleinen Kasten einen flotten, leisen Arbeitsplatz-Computer. Er verschwindet hinter dem Monitor oder unter dem Tisch und verbraucht dabei weniger Strom als eine Glühbirne.",
    merkmale: [
      "Sehr kompakt und leise",
      "16 GB Arbeitsspeicher, 512 GB SSD",
      "Genug Anschlüsse für Drucker, Bildschirm und mehr",
      "Windows 11 vorinstalliert",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 89,
      beschreibung:
        "Ich schließe alles an, richte Windows, E-Mail und Drucker ein und übernehme Ihre Daten vom alten Computer.",
    },
  },
  {
    slug: "hp-all-in-one-27",
    name: "HP All-in-One (27 Zoll)",
    kategorie: "desktop",
    preisEuro: 649,
    amazonSuche: "HP All-in-One 27 Zoll Ryzen 16GB",
    bild: "/images/shop/hp-all-in-one-27.png",
    bildAlt: "Produktfoto: HP All-in-One (27 Zoll)",
    idealFuer:
      "Ideal für alle, die es aufgeräumt mögen: großer Bildschirm und Computer in einem Gerät, nur ein Stromkabel. Mein Tipp für Senioren.",
    beschreibung:
      "Beim All-in-One steckt der Computer direkt im Bildschirm. Es gibt keinen Kasten, kaum Kabel und nichts, was man falsch zusammenstecken kann. Der große 27-Zoll-Bildschirm zeigt Schrift angenehm groß. Auf Wunsch stelle ich sie noch größer ein.",
    merkmale: [
      "Großer 27-Zoll-Bildschirm, Computer eingebaut",
      "Nur ein Stromkabel, kein Kabelsalat",
      "Kabellose Tastatur und Maus liegen bei",
      "Windows 11 vorinstalliert",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 89,
      beschreibung:
        "Ich stelle das Gerät auf, richte alles ein, übernehme Ihre Daten und stelle Schrift und Bedienung so ein, dass Sie gut zurechtkommen.",
    },
  },

  // ── Monitore ───────────────────────────────────────────────────────────
  {
    slug: "monitor-24",
    name: "AOC Monitor (24 Zoll)",
    kategorie: "monitore",
    preisklasse: "Einsteiger",
    preisEuro: 69,
    amazonSuche: "AOC 24B3HA2 Monitor",
    bild: "/images/shop/monitor-24.png",
    bildAlt: "Produktfoto: AOC Monitor (24 Zoll)",
    idealFuer:
      "Ideal als Standard-Bildschirm für den Laptop zu Hause oder als Ersatz für einen alten, flimmernden Monitor.",
    beschreibung:
      "Ein solider 24-Zoll-Bildschirm mit scharfem, augenschonendem Bild. Am Laptop angeschlossen macht er aus dem kleinen Klappbildschirm einen richtigen Arbeitsplatz.",
    merkmale: [
      "24 Zoll, scharfes Full-HD-Bild",
      "Augenschonend: flimmerfrei und entspiegelt",
      "Passt an jeden Computer und Laptop",
      "Passendes Kabel liegt bei",
    ],
    einrichtung: {
      titel: "Anschließen und einrichten",
      preisEuro: 46,
      beschreibung:
        "Ich schließe den Monitor an, ordne die Bildschirme sinnvoll an und stelle die Schriftgröße angenehm ein.",
    },
  },
  {
    slug: "monitor-27",
    name: "Dell Monitor (27 Zoll)",
    kategorie: "monitore",
    preisklasse: "Mittelklasse",
    preisEuro: 209,
    amazonSuche: "Dell S2725DS Monitor",
    bild: "/images/shop/monitor-27.png",
    bildAlt: "Produktfoto: Dell Monitor (27 Zoll)",
    idealFuer:
      "Ideal für alle, die viel lesen oder nebeneinander arbeiten möchten. Die größere Fläche ist spürbar bequemer für die Augen.",
    beschreibung:
      "Drei Zoll klingen nach wenig, machen aber einen deutlichen Unterschied: größere Schrift ohne Qualitätsverlust und Platz für zwei Fenster nebeneinander, etwa E-Mail und Fotos.",
    merkmale: [
      "27 Zoll, hohe Auflösung (QHD)",
      "Höhenverstellbarer Standfuß",
      "Augenschonend: flimmerfrei und entspiegelt",
      "Passendes Kabel liegt bei",
    ],
    einrichtung: {
      titel: "Anschließen und einrichten",
      preisEuro: 46,
      beschreibung:
        "Ich schließe den Monitor an, ordne die Bildschirme sinnvoll an und stelle die Schriftgröße angenehm ein.",
    },
  },

  // ── Internet & WLAN ────────────────────────────────────────────────────
  {
    slug: "fritzbox-7530-ax",
    name: "FRITZ!Box 7530 AX",
    kategorie: "netzwerk",
    preisklasse: "Einsteiger",
    preisEuro: 139,
    amazonSuche: "AVM FRITZ!Box 7530 AX",
    bild: "/images/shop/fritzbox-7530-ax.jpg",
    bildAlt: "Produktfoto: FRITZ!Box 7530 AX",
    idealFuer:
      "Ideal für die normale Wohnung mit DSL-Anschluss, mit deutlich besserem WLAN als bei den Leihgeräten vieler Anbieter.",
    beschreibung:
      "Die FRITZ!Box ist der Goldstandard unter den Routern: zuverlässig, auf Deutsch bedienbar und viele Jahre mit Updates versorgt. Dieses Modell reicht für die allermeisten Wohnungen vollkommen aus.",
    merkmale: [
      "Modernes, schnelles WLAN (Wi-Fi 6)",
      "Für alle DSL-Anschlüsse geeignet",
      "Anrufbeantworter und Telefonanlage eingebaut",
      "Menü und Anleitung komplett auf Deutsch",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 89,
      beschreibung:
        "Ich schließe die FRITZ!Box an, übernehme wenn möglich Ihren bisherigen WLAN-Namen samt Passwort (dann verbinden sich alle Geräte von selbst) und prüfe den Empfang in der ganzen Wohnung.",
    },
  },
  {
    slug: "fritzbox-7690",
    name: "FRITZ!Box 7690",
    kategorie: "netzwerk",
    preisklasse: "Premium",
    preisEuro: 229,
    amazonSuche: "AVM FRITZ!Box 7690",
    bild: "/images/shop/fritzbox-7690.jpg",
    bildAlt: "Produktfoto: FRITZ!Box 7690",
    idealFuer:
      "Ideal für das größere Haus und für alle, die den schnellsten verfügbaren Anschluss wirklich ausnutzen möchten.",
    beschreibung:
      "Das Spitzenmodell für DSL: schnellstes WLAN der neuesten Generation (Wi-Fi 7), starke Reichweite und genug Leistung, wenn viele Geräte gleichzeitig im Netz sind, vom Fernseher bis zur Videotelefonie.",
    merkmale: [
      "Schnellstes WLAN der neuesten Generation (Wi-Fi 7)",
      "Hohe Reichweite, ideal für mehrere Etagen",
      "Anrufbeantworter und Telefonanlage eingebaut",
      "Menü und Anleitung komplett auf Deutsch",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 89,
      beschreibung:
        "Ich schließe die FRITZ!Box an, übernehme wenn möglich Ihren bisherigen WLAN-Namen samt Passwort und prüfe den Empfang im ganzen Haus.",
    },
  },
  {
    slug: "fritz-repeater-1200-ax",
    name: "FRITZ!Repeater 1200 AX",
    kategorie: "netzwerk",
    preisEuro: 79,
    amazonSuche: "AVM FRITZ!Repeater 1200 AX",
    bild: "/images/shop/fritz-repeater-1200-ax.jpg",
    bildAlt: "Produktfoto: FRITZ!Repeater 1200 AX",
    idealFuer:
      "Ideal, wenn das WLAN in einem Zimmer schwächelt: Der Repeater reicht das Signal dorthin weiter, wo es gebraucht wird.",
    beschreibung:
      "Der Repeater kommt einfach in eine Steckdose auf halbem Weg zwischen Router und Funkloch. Mit einer FRITZ!Box verbindet er sich auf Knopfdruck und übernimmt automatisch Namen und Passwort Ihres WLANs.",
    merkmale: [
      "Steckt direkt in der Steckdose, kein Kabel nötig",
      "Verbindet sich mit der FRITZ!Box auf Knopfdruck",
      "WLAN-Name und Passwort bleiben dieselben",
      "Modernes, schnelles WLAN (Wi-Fi 6)",
    ],
    einrichtung: {
      titel: "Einrichtung und Ausmessen bei Ihnen zu Hause",
      preisEuro: 69,
      beschreibung:
        "Ich messe aus, wo der Repeater am meisten bringt, richte ihn ein und prüfe, dass das WLAN danach wirklich überall ankommt.",
    },
  },
  {
    slug: "tp-link-deco-mesh",
    name: "TP-Link Deco Mesh-WLAN (2er-Set)",
    kategorie: "netzwerk",
    preisEuro: 139,
    amazonSuche: "TP-Link Deco X50 2er Set",
    bild: "/images/shop/tp-link-deco-mesh.jpg",
    bildAlt: "Produktfoto: TP-Link Deco Mesh-WLAN (2er-Set)",
    idealFuer:
      "Ideal für verwinkelte Wohnungen und Häuser, in denen ein einzelner Repeater nicht mehr reicht.",
    beschreibung:
      "Zwei kleine Stationen spannen gemeinsam ein einziges, starkes WLAN über die ganze Wohnung. Ihre Geräte wechseln automatisch zur jeweils näheren Station, ohne Aussetzer und ohne dass Sie etwas umstellen müssen.",
    merkmale: [
      "Ein WLAN-Name für die ganze Wohnung",
      "Geräte wechseln automatisch zur besten Station",
      "Bei Bedarf um weitere Stationen erweiterbar",
      "Funktioniert mit jedem Router, auch der FRITZ!Box",
    ],
    einrichtung: {
      titel: "Einrichtung und Ausmessen bei Ihnen zu Hause",
      preisEuro: 69,
      beschreibung:
        "Ich finde die besten Plätze für die Stationen, richte alles ein und verbinde Ihre Geräte neu, wo es nötig ist.",
    },
  },
  {
    slug: "fritz-powerline-1220e",
    name: "FRITZ!Powerline 1220E (2er-Set)",
    kategorie: "netzwerk",
    preisEuro: 119,
    amazonSuche: "AVM FRITZ!Powerline 1220E Set",
    bild: "/images/shop/fritz-powerline-1220e.jpg",
    bildAlt: "Produktfoto: FRITZ!Powerline 1220E (2er-Set)",
    idealFuer:
      "Ideal für dicke Wände und weite Wege, an denen Funk scheitert: Das Internet läuft hier über die Stromleitung.",
    beschreibung:
      "Powerline schickt das Internet durch die vorhandene Stromleitung: ein Adapter an den Router, der zweite ins entfernte Zimmer, fertig. Das ist oft die einzige saubere Lösung für Keller, Dachgeschoss oder Altbauten mit sehr dicken Wänden.",
    merkmale: [
      "Nutzt die vorhandene Stromleitung, kein Bohren",
      "Stabiler als Funk durch dicke Wände und Decken",
      "Zwei Netzwerk-Anschlüsse je Adapter",
      "Steckdose am Adapter bleibt nutzbar",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 69,
      beschreibung:
        "Ich prüfe, ob Ihre Stromleitung mitspielt, richte beide Adapter ein und verbinde die Geräte im entfernten Zimmer.",
    },
  },

  // ── Drucker ────────────────────────────────────────────────────────────
  {
    slug: "epson-ecotank-et-2870",
    name: "Epson EcoTank ET-2870",
    kategorie: "drucker",
    preisEuro: 199,
    amazonSuche: "Epson EcoTank ET-2870",
    bild: "/images/shop/epson-ecotank-et-2870.jpg",
    bildAlt: "Produktfoto: Epson EcoTank ET-2870",
    idealFuer:
      "Ideal für alle, die regelmäßig drucken: Statt teurer Patronen gibt es Tintentanks, die jahrelang halten.",
    beschreibung:
      "Beim EcoTank füllt man Tinte aus kleinen Flaschen nach, statt Patronen zu kaufen. Die mitgelieferte Tinte reicht erfahrungsgemäß für mehrere Jahre normales Drucken. Drucken, Scannen und Kopieren, auch direkt vom Handy.",
    merkmale: [
      "Drucken, Scannen und Kopieren in einem Gerät",
      "Tinte zum Nachfüllen, Vorrat für Jahre liegt bei",
      "Sehr niedrige Druckkosten pro Seite",
      "Druckt auch vom Handy und Tablet",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 49,
      beschreibung:
        "Ich schließe den Drucker ans WLAN an, verbinde Computer, Handy und Tablet und drucke mit Ihnen gemeinsam die erste Seite.",
    },
  },
  {
    slug: "brother-laser-multifunktion",
    name: "Brother Laser-Multifunktionsgerät",
    kategorie: "drucker",
    preisEuro: 199,
    amazonSuche: "Brother DCP-L2627DWE",
    bild: "/images/shop/brother-laser-multifunktion.png",
    bildAlt: "Produktfoto: Brother Laser-Multifunktionsgerät",
    idealFuer:
      "Ideal für alle, die nur ab und zu einen Brief drucken: Toner trocknet nie ein, das Gerät ist auch nach Monaten sofort bereit.",
    beschreibung:
      "Der häufigste Drucker-Frust ist eingetrocknete Tinte nach langer Pause. Ein Laserdrucker kennt das Problem nicht: Er druckt nach Wochen Stillstand genauso zuverlässig wie am ersten Tag. Gedruckt wird in gestochen scharfem Schwarz-Weiß, Scannen und Kopieren gehen auch.",
    merkmale: [
      "Drucken, Scannen und Kopieren (Schwarz-Weiß)",
      "Toner trocknet nie ein, ideal bei seltenem Drucken",
      "Schnell und leise, beidseitiger Druck eingebaut",
      "Druckt auch vom Handy und Tablet",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 49,
      beschreibung:
        "Ich schließe den Drucker ans WLAN an, verbinde Computer, Handy und Tablet und drucke mit Ihnen gemeinsam die erste Seite.",
    },
  },

  // ── Datensicherung ─────────────────────────────────────────────────────
  {
    slug: "externe-festplatte-2tb",
    name: "Externe Festplatte (2 TB)",
    kategorie: "datensicherung",
    preisklasse: "Einsteiger",
    preisEuro: 119,
    amazonSuche: "WD Elements Portable 2TB externe Festplatte",
    bild: "/images/shop/externe-festplatte-2tb.png",
    bildAlt: "Produktfoto: Externe Festplatte (2 TB)",
    idealFuer:
      "Ideal als erste Datensicherung: Einmal angeschlossen, passen sämtliche Fotos und Dokumente eines ganzen Computerlebens darauf.",
    beschreibung:
      "Die einfachste Versicherung gegen Datenverlust. 2 Terabyte klingen abstrakt, dahinter steckt Platz für hunderttausende Fotos. Auf Wunsch richte ich die automatische Sicherung ein, dann müssen Sie nie wieder daran denken.",
    merkmale: [
      "2 TB Speicher, Platz für hunderttausende Fotos",
      "Anschließen genügt, keine Installation nötig",
      "Passt an Windows und Mac",
      "Klein genug für die Schreibtischschublade",
    ],
    einrichtung: {
      titel: "Automatische Sicherung einrichten",
      preisEuro: 69,
      beschreibung:
        "Ich richte die automatische Datensicherung ein und zeige Ihnen, wie Sie im Ernstfall an Ihre Dateien kommen.",
    },
  },
  {
    slug: "speicher-set-usb-sd",
    name: "Speicher-Set: USB-Stick + SD-Karte (je 128 GB)",
    kategorie: "datensicherung",
    preisEuro: 49,
    amazonSuche: "SanDisk Ultra 128GB USB Stick SD Karte",
    bild: "/images/shop/speicher-set-usb-sd.png",
    bildAlt: "Produktfoto: Speicher-Set: USB-Stick + SD-Karte (je 128 GB)",
    idealFuer:
      "Ideal zum Mitnehmen und Weitergeben: Fotos für die Familie auf den Stick, die SD-Karte für Kamera oder Tablet.",
    beschreibung:
      "Markenspeicher von SanDisk, auf den man sich verlassen kann. Der USB-Stick eignet sich für Dokumente und Foto-Weitergaben, die SD-Karte erweitert Kamera, Tablet oder Laptop um zusätzlichen Platz.",
    merkmale: [
      "Je 128 GB, genug für zehntausende Fotos",
      "Markenqualität von SanDisk",
      "USB-Stick passt an jeden Computer",
      "SD-Karte für Kamera, Tablet und Laptop",
    ],
  },
  {
    slug: "synology-nas-backup",
    name: "Synology NAS inkl. 2 Festplatten (je 4 TB)",
    kategorie: "datensicherung",
    preisklasse: "Premium",
    preisEuro: 779,
    amazonSuche: "Synology DS224+ 8TB IronWolf",
    bild: "/images/shop/synology-nas-backup.webp",
    bildAlt: "Produktfoto: Synology NAS inkl. 2 Festplatten (je 4 TB)",
    idealFuer:
      "Ideal für Familien und alle, denen ihre Fotos wirklich wichtig sind: Die Sicherung läuft automatisch und doppelt.",
    beschreibung:
      "Die Premium-Lösung: ein kleiner Speicher-Computer, der zu Hause im Netzwerk steht und alle Geräte der Familie automatisch sichert. Die Daten liegen doppelt auf zwei Festplatten. Fällt eine aus, ist nichts verloren. Ihre Fotos bleiben bei Ihnen zu Hause statt in einer fremden Cloud.",
    merkmale: [
      "Sichert alle Computer der Familie automatisch",
      "Daten liegen doppelt, eine Platte darf ausfallen",
      "Eigene Cloud: Zugriff auch von unterwegs",
      "Zwei Markenfestplatten mit je 4 TB eingebaut",
    ],
    einrichtung: {
      titel: "Komplett-Einrichtung bei Ihnen zu Hause",
      preisEuro: 139,
      beschreibung:
        "Ich baue das NAS auf, richte die automatische Sicherung aller Geräte ein und erkläre Ihnen, wie Sie von überall an Ihre Fotos kommen.",
    },
  },

  // ── Zubehör ────────────────────────────────────────────────────────────
  {
    slug: "logitech-maus-tastatur-set",
    name: "Logitech Maus-und-Tastatur-Set (kabellos)",
    kategorie: "zubehoer",
    preisEuro: 39,
    amazonSuche: "Logitech MK540 Advanced Tastatur Maus Set",
    bild: "/images/shop/logitech-maus-tastatur-set.png",
    bildAlt: "Produktfoto: Logitech Maus-und-Tastatur-Set (kabellos)",
    idealFuer:
      "Ideal für jeden Schreibtisch: angenehme, leise Tasten, gut lesbare Beschriftung und endlich keine Kabel mehr quer über den Tisch.",
    beschreibung:
      "Ein bewährtes Set, das einfach funktioniert: kleiner Empfänger in den Computer, fertig. Die Batterien halten je nach Nutzung ein bis zwei Jahre.",
    merkmale: [
      "Kabellos, ein kleiner Empfänger genügt",
      "Deutliche, gut lesbare Tastenbeschriftung",
      "Leises Tippen, angenehmer Tastendruck",
      "Sehr lange Batterielaufzeit",
    ],
  },
  {
    slug: "logitech-webcam",
    name: "Logitech Webcam (Full HD)",
    kategorie: "zubehoer",
    preisEuro: 59,
    amazonSuche: "Logitech C920 HD Pro Webcam",
    bild: "/images/shop/logitech-webcam.png",
    bildAlt: "Produktfoto: Logitech Webcam (Full HD)",
    idealFuer:
      "Ideal für Videoanrufe mit Kindern und Enkeln, mit deutlich schärferem Bild als jede eingebaute Laptop-Kamera.",
    beschreibung:
      "Die Kamera wird einfach oben auf den Bildschirm gesetzt und am Computer eingesteckt, mehr Installation braucht es nicht. Mit scharfem Bild und gutem Mikrofon macht Videotelefonie gleich doppelt so viel Freude.",
    merkmale: [
      "Scharfes Full-HD-Bild",
      "Mikrofon eingebaut",
      "Einstecken genügt, keine Installation",
      "Passt auf jeden Monitor und Laptop",
    ],
    einrichtung: {
      titel: "Videoanrufe einrichten",
      preisEuro: 49,
      beschreibung:
        "Ich richte WhatsApp-Videoanrufe, Zoom oder Skype ein und übe mit Ihnen einen Anruf, bis es sicher klappt.",
    },
  },
  {
    slug: "headset-videoanrufe",
    name: "Logitech Headset für Videoanrufe",
    kategorie: "zubehoer",
    preisEuro: 19,
    amazonSuche: "Logitech H390 USB Headset",
    bild: "/images/shop/headset-videoanrufe.png",
    bildAlt: "Produktfoto: Logitech Headset für Videoanrufe",
    idealFuer:
      "Ideal, wenn die Gegenseite Sie schlecht versteht oder es hallt: Mit Kopfhörer und Mikrofon direkt am Mund klingt jedes Gespräch klar.",
    beschreibung:
      "Ein leichtes, bequemes Headset mit gepolsterten Hörern und einem Mikrofon, das Nebengeräusche ausblendet. Einstecken, fertig. Es funktioniert mit jedem Computer.",
    merkmale: [
      "Klarer Ton in beide Richtungen",
      "Leicht und bequem, auch für längere Gespräche",
      "Lautstärkeregler am Kabel",
      "Einstecken genügt, keine Installation",
    ],
  },
  {
    slug: "usb-c-hub",
    name: "Anker USB-C-Hub (7-in-1)",
    kategorie: "zubehoer",
    preisEuro: 39,
    amazonSuche: "Anker 341 USB-C Hub 7-in-1",
    bild: "/images/shop/usb-c-hub.png",
    bildAlt: "Produktfoto: Anker USB-C-Hub (7-in-1)",
    idealFuer:
      "Ideal für neue Laptops mit wenigen Anschlüssen: ein Stecker, und Monitor, Drucker und USB-Stick hängen alle dran.",
    beschreibung:
      "Moderne Laptops sparen an Anschlüssen. Dieser Verteiler schafft sie wieder heran: Monitor, mehrere USB-Geräte, Speicherkarten und Netzwerkkabel laufen über einen einzigen Stecker am Laptop.",
    merkmale: [
      "Monitor-Anschluss (HDMI) eingebaut",
      "Mehrere USB-Anschlüsse für Drucker, Stick & Co.",
      "Leser für SD-Speicherkarten",
      "Ein Stecker verbindet alles mit dem Laptop",
    ],
  },
  {
    slug: "steckdosenleiste-ueberspannungsschutz",
    name: "Steckdosenleiste mit Überspannungsschutz",
    kategorie: "zubehoer",
    preisEuro: 19,
    amazonSuche: "Brennenstuhl Eco-Line 13500A Steckdosenleiste 6-fach Ueberspannungsschutz",
    bild: "/images/shop/steckdosenleiste-ueberspannungsschutz.jpg",
    bildAlt: "Produktfoto: Steckdosenleiste mit Überspannungsschutz",
    idealFuer:
      "Ideal unter jedem Schreibtisch: schützt Computer und Router bei Gewitter, deutlich günstiger als ein neues Gerät.",
    beschreibung:
      "Qualitätsleiste von Brennenstuhl: Sie fängt Spannungsspitzen aus dem Stromnetz ab, bevor sie Computer, Monitor oder Router beschädigen. Eine kleine Investition, die im Ernstfall Hunderte Euro spart.",
    merkmale: [
      "Eingebauter Überspannungsschutz",
      "Mehrere Steckplätze mit Schalter",
      "Deutsche Markenqualität (Brennenstuhl)",
      "Kindersicherung eingebaut",
    ],
  },

  // ── Tablets & Smart Home ───────────────────────────────────────────────
  {
    slug: "samsung-galaxy-tab-a9",
    name: "Samsung Galaxy Tab A9+",
    kategorie: "tablets",
    preisklasse: "Einsteiger",
    preisEuro: 199,
    amazonSuche: "Samsung Galaxy Tab A9 Plus WiFi",
    bild: "/images/shop/samsung-galaxy-tab-a9.png",
    bildAlt: "Produktfoto: Samsung Galaxy Tab A9+",
    idealFuer:
      "Ideal zum Einstieg: E-Mails, Zeitung, Fotos und Videoanrufe auf einem handlichen Bildschirm, ohne viel Geld auszugeben.",
    beschreibung:
      "Ein grundsolides Tablet für den Alltag auf dem Sofa. Der 11-Zoll-Bildschirm ist angenehm groß für Zeitungs-Apps und Fotos, und für Videoanrufe mit der Familie reicht die Kamera gut aus.",
    merkmale: [
      "Großer 11-Zoll-Bildschirm",
      "Gut für E-Mails, Zeitung, Fotos, Videoanrufe",
      "Lange Akkulaufzeit",
      "Speicher per SD-Karte erweiterbar",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 69,
      beschreibung:
        "Ich richte das Tablet komplett ein (E-Mail, WhatsApp, Zeitungs-Apps, Fotos) und stelle Schrift und Bedienung so ein, dass Sie gut zurechtkommen.",
    },
  },
  {
    slug: "apple-ipad",
    name: "Apple iPad (11 Zoll)",
    kategorie: "tablets",
    preisklasse: "Mittelklasse",
    preisEuro: 479,
    amazonSuche: "Apple iPad 11 Zoll A16 128GB WiFi",
    bild: "/images/shop/apple-ipad.jpg",
    bildAlt: "Produktfoto: Apple iPad (11 Zoll)",
    idealFuer:
      "Ideal für alle, die ein iPhone haben oder einfach das unkomplizierteste Tablet möchten. Das iPad ist spürbar flüssiger und hält viele Jahre.",
    beschreibung:
      "Das iPad ist das Tablet, bei dem am wenigsten erklärt werden muss: aufgeräumte Bedienung, sehr flüssig, und Apple versorgt es viele Jahre mit Updates. Wer ein iPhone hat, findet sich sofort zurecht.",
    merkmale: [
      "Sehr einfache, aufgeräumte Bedienung",
      "Flüssig und schnell, auch nach Jahren",
      "Viele Jahre Updates von Apple",
      "Arbeitet nahtlos mit dem iPhone zusammen",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 69,
      beschreibung:
        "Ich richte das iPad komplett ein (E-Mail, WhatsApp, Fotos, FaceTime) und zeige Ihnen alles in Ruhe.",
    },
  },
  {
    slug: "smarte-steckdosen",
    name: "Smarte Steckdosen (2er-Set)",
    kategorie: "tablets",
    preisEuro: 29,
    amazonSuche: "TP-Link Tapo P110 2er Pack",
    bild: "/images/shop/smarte-steckdosen.jpg",
    bildAlt: "Produktfoto: Smarte Steckdosen (2er-Set)",
    idealFuer:
      "Ideal für Stehlampe und Kaffeemaschine: per Handy oder Zeitplan schalten. So geht die Lampe abends an, auch wenn Sie verreist sind.",
    beschreibung:
      "Die Steckdose kommt zwischen Gerät und Wandsteckdose, danach lässt sich das Gerät per Handy oder nach Zeitplan schalten. Beliebt als Anwesenheits-Trick im Urlaub und als bequemer Lichtschalter vom Sofa aus.",
    merkmale: [
      "Schalten per Handy-App oder Zeitplan",
      "Misst auf Wunsch den Stromverbrauch",
      "Einfache Einrichtung über WLAN",
      "Kein Abo, keine Folgekosten",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 69,
      beschreibung:
        "Ich verbinde die Steckdosen mit Ihrem WLAN, richte die App und Ihre Zeitpläne ein und zeige Ihnen die Bedienung.",
    },
  },
  {
    slug: "indoor-kamera",
    name: "Kleine Überwachungskamera (innen)",
    kategorie: "tablets",
    preisEuro: 29,
    amazonSuche: "TP-Link Tapo C210 Kamera",
    bild: "/images/shop/indoor-kamera.jpg",
    bildAlt: "Produktfoto: Kleine Überwachungskamera (innen)",
    idealFuer:
      "Ideal für den beruhigenden Blick nach Hause: in den Flur, zur Haustür oder nach der Katze, direkt vom Handy aus.",
    beschreibung:
      "Eine kompakte Kamera für innen: aufstellen, mit dem WLAN verbinden, fertig. Vom Handy aus sehen Sie jederzeit live nach dem Rechten; bei Bewegung kann die Kamera eine Nachricht schicken. Die Aufnahmen bleiben auf Wunsch komplett bei Ihnen (SD-Karte) statt in einer Cloud.",
    merkmale: [
      "Scharfes Bild, auch bei Nacht",
      "Live-Blick und Mitteilungen aufs Handy",
      "Aufnahmen lokal auf SD-Karte, kein Abo nötig",
      "Schwenkbar per App",
    ],
    einrichtung: {
      titel: "Einrichtung bei Ihnen zu Hause",
      preisEuro: 69,
      beschreibung:
        "Ich finde den richtigen Platz, verbinde die Kamera mit WLAN und Handy und stelle die Mitteilungen so ein, dass sie nicht nerven.",
    },
  },

  // ── Software ───────────────────────────────────────────────────────────
  {
    slug: "microsoft-365-single",
    name: "Microsoft 365 Single (1 Jahr)",
    kategorie: "software",
    preisEuro: 79,
    amazonSuche: "Microsoft 365 Single 12 Monate",
    bild: "/images/shop/microsoft-365-single.jpg",
    bildAlt: "Produktfoto: Microsoft 365 Single (1 Jahr)",
    preisZusatz: "für 1 Jahr",
    idealFuer:
      "Ideal für eine Person: das echte Word und Excel, immer aktuell, plus 1 TB Online-Speicher für die automatische Foto-Sicherung.",
    beschreibung:
      "Die Jahreslizenz für Word, Excel, Outlook und PowerPoint auf all Ihren Geräten: Computer, Tablet und Handy. Der enthaltene Online-Speicher sichert nebenbei Ihre Dokumente und Fotos, falls dem Gerät etwas zustößt.",
    merkmale: [
      "Word, Excel, Outlook und PowerPoint, immer aktuell",
      "Für 1 Person auf bis zu 5 Geräten",
      "1 TB Online-Speicher (OneDrive) enthalten",
      "Lizenz für 12 Monate, keine automatische Verlängerung",
    ],
    einrichtung: {
      titel: "Installation und Einrichtung",
      preisEuro: 49,
      beschreibung:
        "Ich installiere Office auf Ihren Geräten, richte die automatische Sicherung ein und zeige Ihnen die Grundlagen.",
    },
  },
  {
    slug: "microsoft-365-family",
    name: "Microsoft 365 Family (1 Jahr)",
    kategorie: "software",
    preisEuro: 99,
    amazonSuche: "Microsoft 365 Family 12 Monate",
    bild: "/images/shop/microsoft-365-family.jpg",
    bildAlt: "Produktfoto: Microsoft 365 Family (1 Jahr)",
    preisZusatz: "für 1 Jahr",
    idealFuer:
      "Ideal für Familien: dieselbe Ausstattung wie Single, aber für bis zu 6 Personen. Geteilt kostet es jeden nur ein paar Euro im Monat.",
    beschreibung:
      "Dieselben Programme und derselbe Speicher wie bei Single, nur für bis zu sechs Personen, jede mit eigenem Konto und eigenem 1-TB-Speicher. Perfekt, um Kinder und Enkel mit unter eine Lizenz zu nehmen.",
    merkmale: [
      "Word, Excel, Outlook und PowerPoint, immer aktuell",
      "Für bis zu 6 Personen, je bis zu 5 Geräte",
      "Je 1 TB Online-Speicher pro Person",
      "Lizenz für 12 Monate, keine automatische Verlängerung",
    ],
    einrichtung: {
      titel: "Installation und Einrichtung",
      preisEuro: 49,
      beschreibung:
        "Ich installiere Office auf Ihren Geräten, richte die Konten für die Familie ein und zeige Ihnen die Grundlagen.",
    },
  },
  {
    slug: "bitdefender-internet-security",
    name: "Bitdefender Internet Security (1 Jahr)",
    kategorie: "software",
    preisEuro: 29,
    amazonSuche: "Bitdefender Internet Security 3 Geraete 1 Jahr",
    bild: "/images/shop/bitdefender-internet-security.jpg",
    bildAlt: "Produktfoto: Bitdefender Internet Security (1 Jahr)",
    preisZusatz: "für 1 Jahr",
    idealFuer:
      "Ideal für alle, die Online-Banking nutzen oder sich vor Betrugs-E-Mails sorgen: einer der besten Virenschutze im Test, ohne nervige Werbung.",
    beschreibung:
      "Ein Virenschutz, der im Hintergrund seine Arbeit macht, statt Sie mit Warnungen zu bombardieren. Er blockt gefährliche Webseiten und Betrugs-E-Mails, bevor Schaden entsteht, und schützt beim Online-Banking besonders.",
    merkmale: [
      "Spitzenwerte in unabhängigen Tests",
      "Schützt vor Viren, Betrugsseiten und Erpressung",
      "Besonderer Schutz beim Online-Banking",
      "Lizenz für 12 Monate, bis zu 3 Geräte",
    ],
    einrichtung: {
      titel: "Installation und Sicherheits-Check",
      preisEuro: 49,
      beschreibung:
        "Ich installiere den Schutz, entferne überflüssige alte Programme und gehe mit Ihnen durch, woran Sie Betrug künftig selbst erkennen.",
    },
  },
];

export function produktFinden(slug: string): Produkt | undefined {
  return produkte.find((eintrag) => eintrag.slug === slug);
}

export function kategorieFinden(schluessel: string): Kategorie | undefined {
  return kategorien.find((eintrag) => eintrag.schluessel === schluessel);
}
