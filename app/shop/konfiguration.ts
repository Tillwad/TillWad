// Alles, was Till am Shop einstellen möchte, steht in dieser einen Datei –
// dasselbe Muster wie app/termin/konfiguration.ts.

/**
 * Wie die Geräte zum Kunden kommen (Entscheidung mit Till am 2026-11-01):
 *
 * - "affiliate": Empfehlungsseiten mit Amazon-Partnerlink, dazu die Option
 *   "Ich bringe es mit" (Besorgung mit persönlicher Übergabe im Einzugsgebiet)
 *   und das buchbare Einrichtungspaket. Kein eigener Verkauf, kein
 *   Warenkreditrisiko, kein Widerruf, keine Shop-Pflichttexte.
 * - "shop": Der frühere Direktverkauf auf Rechnung mit Bestellformular.
 *   Der komplette Code dafür liegt weiter im Repo – Umschalten genügt,
 *   dann aber vorher Task "Shop freischalten" beachten (Rechtstexte,
 *   E-Mail-Bestätigung, EK-Check).
 */
export const VERKAUFSMODUS: "affiliate" | "shop" = "affiliate";

/**
 * Die Partner-Kennung aus dem Amazon-PartnerNet (z. B. "computertill-21").
 * Solange sie leer ist, funktionieren die Amazon-Links trotzdem – es gibt
 * nur keine Provision. Nach der PartnerNet-Anmeldung hier eintragen.
 */
export const AMAZON_PARTNER_TAG = "computerhi047-21";

/** Baut aus einem Suchbegriff den (gekennzeichneten) Amazon-Partnerlink. */
export function amazonLink(suche: string): string {
  const basis = `https://www.amazon.de/s?k=${encodeURIComponent(suche)}`;
  return AMAZON_PARTNER_TAG ? `${basis}&tag=${AMAZON_PARTNER_TAG}` : basis;
}

/** Pflichtkennzeichnung für Partnerlinks, sichtbar bei jedem Amazon-Knopf. */
export const AFFILIATE_HINWEIS =
  "Anzeige: Als Amazon-Partner verdiene ich an qualifizierten Käufen. Für Sie ändert sich der Preis dadurch nicht.";

/** Versandkosten je Bestellung in Euro. Gegen die Kosatec-Konditionen prüfen. */
export const VERSAND_EURO = 6.9;

/** Ab diesem Bestellwert entfallen die Versandkosten. */
export const VERSANDFREI_AB_EURO = 150;

/** Übliche Lieferzeit, wenn das Produkt nichts anderes angibt. */
export const LIEFERZEIT = "3 bis 5 Werktage";

/**
 * Hinweis zur Umsatzsteuer: Till ist Kleinunternehmer, auf den Rechnungen
 * wird deshalb keine Umsatzsteuer ausgewiesen. Der Satz gehört überall dahin,
 * wo ein Preis steht.
 */
export const UST_HINWEIS =
  "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.";

/**
 * In diesen Postleitzahlen biete ich die Einrichtung zu Hause an – das
 * Einzugsgebiet aus app/daten.ts, übersetzt in Postleitzahlen. Außerhalb
 * davon wird nur geliefert; das Bestellformular blendet das
 * Einrichtungspaket dann aus.
 */
export const EINZUGSGEBIET_PLZ = [
  "14109", // Wannsee
  "14129", // Nikolassee und Schlachtensee
  "14163", // Zehlendorf (Mexikoplatz, Schlachtensee)
  "14165", // Zehlendorf Mitte
  "14167", // Zehlendorf Süd
  "14169", // Zehlendorf (Onkel Toms Hütte)
  "14193", // Grunewald
  "14195", // Dahlem
  "14513", // Teltow
  "14532", // Kleinmachnow (und Stahnsdorf)
];

/** true, wenn ich in dieser Postleitzahl die Einrichtung anbieten kann. */
export function istImEinzugsgebiet(plz: string): boolean {
  return EINZUGSGEBIET_PLZ.includes(plz.trim());
}

/** Mehr Bestellungen pro Tag nimmt das Formular von derselben Adresse nicht an. */
export const MAX_BESTELLUNGEN_JE_ADRESSE = 3;

/** Notbremse: mehr Bestellungen pro Tag nimmt das Formular insgesamt nicht an. */
export const MAX_BESTELLUNGEN_GESAMT = 25;

/** Macht aus einer Zahl eine deutsche Preisangabe wie "1.099,00 €". */
export function preisAnzeigen(euro: number): string {
  return euro.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

export function versandBerechnen(warenwertEuro: number): number {
  return warenwertEuro >= VERSANDFREI_AB_EURO ? 0 : VERSAND_EURO;
}
