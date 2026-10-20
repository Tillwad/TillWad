import { get, put } from "@vercel/blob";

// Die Terminanfragen von der Website liegen als eine JSON-Datei im Vercel
// Blob Store – dasselbe Muster wie bei den Einstellungen in
// app/einstellungen.ts. Bei einer Handvoll Anfragen pro Woche reicht das
// vollkommen; eine Datenbank wäre hier nur Ballast.
//
// Anders als die Einstellungen werden die Buchungen nicht zwischengespeichert:
// Sie entscheiden darüber, welche Termine als frei angeboten werden, und da
// wäre ein veralteter Stand eine Doppelbuchung.

const DATEI = "buchungen.json";
const ZUGRIFF = "private" as const;

export type BuchungsStatus = "offen" | "bestaetigt" | "abgesagt";

export type Buchung = {
  id: string;
  /** Eingangszeitpunkt der Anfrage (ISO, UTC). */
  erstellt: string;
  status: BuchungsStatus;
  /** Gewünschter Beginn (ISO, UTC). */
  beginn: string;
  /** Ungefähre Dauer laut Anliegen, blockiert diese Zeit im Angebot. */
  dauerMinuten: number;
  /** Schlüssel des Anliegens, siehe app/termin/konfiguration.ts. */
  anliegen: string;
  name: string;
  telefon: string;
  email: string;
  ort: string;
  strasse: string;
  problem: string;
  geraete: string[];
  /** Verschlüsselter Fingerabdruck der Absender-Adresse, nur fürs Ratenlimit. */
  absender: string;
};

function bereinigen(daten: unknown): Buchung[] {
  if (!Array.isArray(daten)) {
    return [];
  }
  return daten.filter(
    (eintrag): eintrag is Buchung =>
      typeof eintrag === "object" &&
      eintrag !== null &&
      typeof (eintrag as Buchung).id === "string" &&
      typeof (eintrag as Buchung).beginn === "string",
  );
}

export async function buchungenLesen(): Promise<Buchung[]> {
  try {
    const ergebnis = await get(DATEI, { access: ZUGRIFF, useCache: false });
    if (!ergebnis || ergebnis.statusCode !== 200) {
      return [];
    }
    return bereinigen(JSON.parse(await new Response(ergebnis.stream).text()));
  } catch {
    // Noch keine Datei oder kein Blob Store: dann gibt es eben noch keine
    // Buchungen. Die Seite läuft normal weiter.
    return [];
  }
}

async function buchungenSchreiben(buchungen: Buchung[]): Promise<void> {
  await put(DATEI, JSON.stringify(buchungen, null, 2), {
    access: ZUGRIFF,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function buchungAnlegen(buchung: Buchung): Promise<void> {
  const buchungen = await buchungenLesen();
  buchungen.push(buchung);
  await buchungenSchreiben(buchungen);
}

/** Setzt den Status einer Buchung um; liefert false, wenn es sie nicht gibt. */
export async function buchungsStatusSetzen(
  id: string,
  status: BuchungsStatus,
): Promise<boolean> {
  const buchungen = await buchungenLesen();
  const buchung = buchungen.find((eintrag) => eintrag.id === id);
  if (!buchung) {
    return false;
  }
  buchung.status = status;
  await buchungenSchreiben(buchungen);
  return true;
}

export async function buchungLoeschen(id: string): Promise<void> {
  const buchungen = await buchungenLesen();
  await buchungenSchreiben(buchungen.filter((eintrag) => eintrag.id !== id));
}
