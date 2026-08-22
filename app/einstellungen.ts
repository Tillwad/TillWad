import { get, put } from "@vercel/blob";
import { unstable_cache, updateTag } from "next/cache";

// Einstellungen, die Till über /admin ändern kann, ohne dass die Seite neu
// gebaut werden muss. Sie liegen als kleine JSON-Datei im Vercel Blob Store.
//
// Gelesen wird über einen Cache mit Tag: Auf der Website kostet das keine
// Ladezeit, und beim Speichern im Admin-Bereich wird der Cache sofort
// verworfen, sodass Änderungen ohne Verzögerung sichtbar sind.

const DATEI = "einstellungen.json";
export const EINSTELLUNGEN_TAG = "einstellungen";

// Die Datei wird nur auf dem Server gelesen, niemand soll sie direkt über
// eine URL abrufen können. Lesen und Schreiben müssen dieselbe Zugriffsart
// angeben, deshalb steht sie hier an einer Stelle.
const ZUGRIFF = "private" as const;

export type Einstellungen = {
  /** Text der Hinweisleiste. Leer bedeutet: keine Leiste anzeigen. */
  bannerText: string;
  /**
   * Letzter Tag, an dem die Leiste angezeigt wird (YYYY-MM-DD).
   * Leer bedeutet: läuft nicht automatisch ab.
   */
  bannerBis: string;
  /** Blendet die Telefon-Schaltflächen auf der ganzen Seite aus. */
  telefonVersteckt: boolean;
  /** Blendet die WhatsApp-Schaltflächen auf der ganzen Seite aus. */
  whatsappVersteckt: boolean;
};

export const STANDARD: Einstellungen = {
  bannerText: "",
  bannerBis: "",
  telefonVersteckt: false,
  whatsappVersteckt: false,
};

/**
 * Nimmt beliebige Daten entgegen und macht daraus garantiert gültige
 * Einstellungen. So kann eine kaputte oder alte Datei im Blob Store die
 * Website nicht beschädigen.
 */
function bereinigen(daten: unknown): Einstellungen {
  if (typeof daten !== "object" || daten === null) {
    return STANDARD;
  }
  const roh = daten as Record<string, unknown>;
  // Früher schaltete ein einziges Feld Telefon und WhatsApp gemeinsam ab. In
  // einer schon gespeicherten Datei fehlt whatsappVersteckt deshalb noch –
  // dann gilt weiterhin, was für das Telefon eingestellt war.
  const whatsappVersteckt =
    typeof roh.whatsappVersteckt === "boolean"
      ? roh.whatsappVersteckt
      : roh.telefonVersteckt === true;
  return {
    bannerText:
      typeof roh.bannerText === "string" ? roh.bannerText.slice(0, 500) : "",
    bannerBis:
      typeof roh.bannerBis === "string" && /^\d{4}-\d{2}-\d{2}$/.test(roh.bannerBis)
        ? roh.bannerBis
        : "",
    telefonVersteckt: roh.telefonVersteckt === true,
    whatsappVersteckt,
  };
}

const gespeicherteEinstellungen = unstable_cache(
  async (): Promise<Einstellungen> => {
    try {
      // useCache: false liest direkt aus dem Speicher statt über das CDN.
      // Sonst könnte direkt nach dem Speichern noch der alte Stand kommen.
      const ergebnis = await get(DATEI, { access: ZUGRIFF, useCache: false });
      if (!ergebnis || ergebnis.statusCode !== 200) {
        return STANDARD;
      }
      return bereinigen(
        JSON.parse(await new Response(ergebnis.stream).text()),
      );
    } catch {
      // Noch keine Datei vorhanden, kein Blob Store eingerichtet oder das
      // Netzwerk streikt: Die Website läuft dann einfach ohne Hinweisleiste
      // und mit sichtbarer Telefonnummer weiter.
      return STANDARD;
    }
  },
  ["einstellungen"],
  { tags: [EINSTELLUNGEN_TAG] },
);

/**
 * Ist die Hinweisleiste heute noch gültig? Ein gesetztes Enddatum lässt sie
 * automatisch auslaufen, ohne dass jemand etwas abschalten muss.
 */
export function bannerLaeuftNoch(
  einstellungen: Einstellungen,
  heute = new Date(),
): boolean {
  if (!einstellungen.bannerText.trim()) {
    return false;
  }
  if (!einstellungen.bannerBis) {
    return true;
  }
  // Vergleich als Zeichenkette: YYYY-MM-DD ist dafür sortierbar. Als "heute"
  // gilt der Tag in Berlin, damit die Leiste dort um Mitternacht verschwindet
  // und nicht nach der Uhrzeit des Servers.
  const heuteInBerlin = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(heute);
  return einstellungen.bannerBis >= heuteInBerlin;
}

export async function einstellungenLesen(): Promise<Einstellungen> {
  return gespeicherteEinstellungen();
}

export async function einstellungenSpeichern(
  einstellungen: Einstellungen,
): Promise<void> {
  await put(DATEI, JSON.stringify(bereinigen(einstellungen), null, 2), {
    access: ZUGRIFF,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  // updateTag statt revalidateTag: Es sorgt dafür, dass die Verwaltungsseite
  // direkt nach dem Speichern schon den neuen Stand sieht.
  updateTag(EINSTELLUNGEN_TAG);
}
