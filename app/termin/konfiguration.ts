// Alles, was Till an der Online-Terminbuchung einstellen möchte, steht in
// dieser einen Datei: die Anliegen mit ihrer ungefähren Dauer, die Zeiten, zu
// denen Termine angeboten werden, und die Abstände zwischen den Terminen.

export type Anliegen = {
  /** Interner Schlüssel, landet auch in der gespeicherten Buchung. */
  schluessel: string;
  /** Beschriftung im Formular. */
  titel: string;
  /** Ungefähre Dauer des Besuchs in Minuten. Danach richten sich die Zeitfenster. */
  dauerMinuten: number;
};

export const anliegen: Anliegen[] = [
  { schluessel: "computer", titel: "Computer oder Laptop", dauerMinuten: 90 },
  { schluessel: "handy", titel: "Handy oder Tablet", dauerMinuten: 60 },
  { schluessel: "wlan", titel: "Internet oder WLAN", dauerMinuten: 90 },
  { schluessel: "drucker", titel: "Drucker", dauerMinuten: 60 },
  {
    schluessel: "fernseher",
    titel: "Fernseher oder Streaming",
    dauerMinuten: 60,
  },
  {
    schluessel: "sicherheit",
    titel: "Sicherheit oder Verdacht auf Betrug",
    dauerMinuten: 90,
  },
  {
    schluessel: "neues-geraet",
    titel: "Neues Gerät einrichten",
    dauerMinuten: 120,
  },
  { schluessel: "sonstiges", titel: "Etwas anderes", dauerMinuten: 90 },
];

export function anliegenFinden(schluessel: string): Anliegen | undefined {
  return anliegen.find((eintrag) => eintrag.schluessel === schluessel);
}

/** Macht aus Minuten eine lesbare Angabe wie "ca. 1,5 Stunden". */
export function dauerBeschriften(minuten: number): string {
  if (minuten % 60 === 0) {
    const stunden = minuten / 60;
    return `ca. ${stunden} ${stunden === 1 ? "Stunde" : "Stunden"}`;
  }
  return `ca. ${(minuten / 60).toLocaleString("de-DE")} Stunden`;
}

/** Geräte, die im Formular zur Auswahl stehen (Mehrfachauswahl). */
export const geraeteAuswahl = [
  "Computer oder Laptop (Windows)",
  "Mac oder MacBook (Apple)",
  "Handy",
  "Tablet oder iPad",
  "Drucker",
  "Router / WLAN",
  "Fernseher",
  "Etwas anderes",
];

/**
 * Zu diesen Zeiten werden Termine angeboten, angegeben in Berliner Zeit.
 * Wochentage: 0 = Sonntag, 1 = Montag, … 6 = Samstag. Ein Tag ohne Eintrag
 * bleibt frei von Terminen.
 */
export const ARBEITSZEITEN: Record<number, { von: string; bis: string }[]> = {
  1: [{ von: "09:00", bis: "17:00" }],
  2: [{ von: "09:00", bis: "17:00" }],
  3: [{ von: "09:00", bis: "17:00" }],
  4: [{ von: "09:00", bis: "17:00" }],
  5: [{ von: "09:00", bis: "17:00" }],
  6: [{ von: "10:00", bis: "16:00" }],
};

/** Mögliche Beginnzeiten liegen in diesem Raster (Minuten). */
export const SCHRITT_MINUTEN = 30;

/** Wegezeit vor und nach jedem Termin, die ebenfalls frei bleiben muss. */
export const PUFFER_MINUTEN = 30;

/** So viele Stunden Vorlauf braucht ein Termin mindestens ab jetzt. */
export const VORLAUF_STUNDEN = 12;

/** So viele Tage im Voraus lässt sich ein Termin buchen. */
export const HORIZONT_TAGE = 21;

/** Mehr Anfragen pro Tag nimmt das Formular von derselben Adresse nicht an. */
export const MAX_ANFRAGEN_JE_ADRESSE = 3;

/** Notbremse: mehr Anfragen pro Tag nimmt das Formular insgesamt nicht an. */
export const MAX_ANFRAGEN_GESAMT = 25;
