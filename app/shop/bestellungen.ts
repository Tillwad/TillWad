import { get, put } from "@vercel/blob";

// Die Bestellungen aus dem Shop liegen als eine JSON-Datei im Vercel Blob
// Store – dasselbe Muster wie die Terminanfragen in app/termin/buchungen.ts.
// Für den Testlauf mit einer Handvoll Bestellungen pro Woche reicht das aus.

const DATEI = "bestellungen.json";
const ZUGRIFF = "private" as const;

export type BestellStatus =
  | "neu"
  | "bestaetigt"
  | "versendet"
  | "storniert";

export type Bestellung = {
  id: string;
  /** Kurze, lesbare Bestellnummer für die Kommunikation mit dem Kunden. */
  nummer: string;
  /** Eingangszeitpunkt (ISO, UTC). */
  erstellt: string;
  status: BestellStatus;
  produktSlug: string;
  /** Name und Preise zum Bestellzeitpunkt – falls sich das Sortiment ändert. */
  produktName: string;
  produktPreisEuro: number;
  einrichtungGebucht: boolean;
  einrichtungPreisEuro: number;
  versandEuro: number;
  gesamtEuro: number;
  name: string;
  telefon: string;
  email: string;
  strasse: string;
  plz: string;
  ort: string;
  hinweis: string;
  /** Verschlüsselter Fingerabdruck der Absender-Adresse, nur fürs Ratenlimit. */
  absender: string;
};

function bereinigen(daten: unknown): Bestellung[] {
  if (!Array.isArray(daten)) {
    return [];
  }
  return daten.filter(
    (eintrag): eintrag is Bestellung =>
      typeof eintrag === "object" &&
      eintrag !== null &&
      typeof (eintrag as Bestellung).id === "string" &&
      typeof (eintrag as Bestellung).produktSlug === "string",
  );
}

export async function bestellungenLesen(): Promise<Bestellung[]> {
  try {
    const ergebnis = await get(DATEI, { access: ZUGRIFF, useCache: false });
    if (!ergebnis || ergebnis.statusCode !== 200) {
      return [];
    }
    return bereinigen(JSON.parse(await new Response(ergebnis.stream).text()));
  } catch {
    // Noch keine Datei oder kein Blob Store: dann gibt es eben noch keine
    // Bestellungen. Die Seite läuft normal weiter.
    return [];
  }
}

async function bestellungenSchreiben(
  bestellungen: Bestellung[],
): Promise<void> {
  await put(DATEI, JSON.stringify(bestellungen, null, 2), {
    access: ZUGRIFF,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function bestellungAnlegen(bestellung: Bestellung): Promise<void> {
  const bestellungen = await bestellungenLesen();
  bestellungen.push(bestellung);
  await bestellungenSchreiben(bestellungen);
}

/** Setzt den Status einer Bestellung um; false, wenn es sie nicht gibt. */
export async function bestellStatusSetzen(
  id: string,
  status: BestellStatus,
): Promise<boolean> {
  const bestellungen = await bestellungenLesen();
  const bestellung = bestellungen.find((eintrag) => eintrag.id === id);
  if (!bestellung) {
    return false;
  }
  bestellung.status = status;
  await bestellungenSchreiben(bestellungen);
  return true;
}

export async function bestellungLoeschen(id: string): Promise<void> {
  const bestellungen = await bestellungenLesen();
  await bestellungenSchreiben(
    bestellungen.filter((eintrag) => eintrag.id !== id),
  );
}
