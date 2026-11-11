import { ARBEITSZEITEN } from "./termin/konfiguration";

// Die Zeiten, zu denen Till erreichbar ist, stehen an genau einer Stelle:
// in app/termin/konfiguration.ts, wo sie ohnehin die buchbaren Termine
// steuern. Von dort kommen sowohl der sichtbare Text in der Fußzeile als
// auch die Auszeichnung für Google.
//
// Das ist kein Schönheitsding: Google verlangt, dass strukturierte Daten
// den sichtbaren Inhalt der Seite abbilden. Zwei getrennte Listen würden
// irgendwann auseinanderlaufen, und dann steht im Unternehmenseintrag eine
// Zeit, zu der niemand abnimmt.

const TAG_NAME = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

// Schreibweise nach schema.org. Dieselbe Reihenfolge wie oben: 0 = Sonntag.
const TAG_SCHEMA = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Montag zuerst, Sonntag zuletzt: So liest es sich im Deutschen. */
const WOCHE = [1, 2, 3, 4, 5, 6, 0];

type Block = { tage: number[]; von: string; bis: string };

/**
 * Fasst aufeinanderfolgende Tage mit gleichen Zeiten zusammen, damit aus
 * fünf einzelnen Zeilen "Montag bis Freitag" wird.
 */
function bloecke(): Block[] {
  const ergebnis: Block[] = [];

  for (const tag of WOCHE) {
    const zeiten = ARBEITSZEITEN[tag];
    // Ein Tag ohne Eintrag ist ein freier Tag und taucht nicht auf.
    if (!zeiten || zeiten.length === 0) continue;

    // Mehrere Zeitfenster an einem Tag kämen hier als eigener Block an;
    // bisher gibt es pro Tag nur eines.
    const { von, bis } = zeiten[0];
    const letzter = ergebnis[ergebnis.length - 1];

    if (letzter && letzter.von === von && letzter.bis === bis) {
      letzter.tage.push(tag);
    } else {
      ergebnis.push({ tage: [tag], von, bis });
    }
  }

  return ergebnis;
}

/** "9" statt "09:00", "16:30" bleibt "16:30". So spricht man darüber. */
function stundeLesbar(zeit: string): string {
  const [stunde, minute] = zeit.split(":");
  return minute === "00"
    ? String(Number(stunde))
    : `${Number(stunde)}:${minute}`;
}

/**
 * Die Zeiten als Liste von Zeilen für die Anzeige, etwa
 * ["Montag bis Freitag: 9 bis 17 Uhr", "Samstag: 10 bis 16 Uhr"].
 */
export function zeitenLesbar(): string[] {
  return bloecke().map((block) => {
    const erster = TAG_NAME[block.tage[0]];
    const letzter = TAG_NAME[block.tage[block.tage.length - 1]];
    const tage = block.tage.length === 1 ? erster : `${erster} bis ${letzter}`;
    return `${tage}: ${stundeLesbar(block.von)} bis ${stundeLesbar(block.bis)} Uhr`;
  });
}

/**
 * Dieselben Zeiten als openingHoursSpecification für schema.org. Damit kann
 * Google im Unternehmenseintrag "Öffnet um 9 Uhr" anzeigen.
 */
export function zeitenSchema() {
  return bloecke().map((block) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: block.tage.map((tag) => TAG_SCHEMA[tag]),
    opens: block.von,
    closes: block.bis,
  }));
}
