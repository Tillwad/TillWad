import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Anmeldung für den Admin-Bereich. Es gibt nur einen Benutzer (Till), deshalb
// genügt ein Passwort aus der Umgebungsvariable ADMIN_PASSWORT.
//
// Nach dem Anmelden wird ein Cookie gesetzt, das den Ablaufzeitpunkt und eine
// damit gebildete Signatur enthält. Das Passwort selbst steht nie im Cookie,
// und ohne Kenntnis des Passworts lässt sich die Signatur nicht fälschen.

const COOKIE = "admin-sitzung";
const GUELTIG_MS = 12 * 60 * 60 * 1000;

function passwort(): string | null {
  const wert = process.env.ADMIN_PASSWORT;
  return wert && wert.length > 0 ? wert : null;
}

/** Vergleicht zwei Zeichenketten in gleichbleibender Zeit. */
function gleich(a: string, b: string): boolean {
  const pufferA = Buffer.from(a, "utf8");
  const pufferB = Buffer.from(b, "utf8");
  // timingSafeEqual verlangt gleiche Länge und würde sonst die Länge des
  // Passworts verraten. Deshalb wird vorher auf feste Länge gehasht.
  const hashA = createHmac("sha256", "laengenausgleich").update(pufferA).digest();
  const hashB = createHmac("sha256", "laengenausgleich").update(pufferB).digest();
  return timingSafeEqual(hashA, hashB);
}

function signieren(ablauf: number, geheimnis: string): string {
  return createHmac("sha256", geheimnis).update(String(ablauf)).digest("hex");
}

export function passwortIstEingerichtet(): boolean {
  return passwort() !== null;
}

export function passwortStimmt(eingabe: string): boolean {
  const erwartet = passwort();
  if (!erwartet) {
    return false;
  }
  return gleich(eingabe, erwartet);
}

export async function anmeldungSetzen(): Promise<void> {
  const geheimnis = passwort();
  if (!geheimnis) {
    return;
  }
  const ablauf = Date.now() + GUELTIG_MS;
  const speicher = await cookies();
  speicher.set(COOKIE, `${ablauf}.${signieren(ablauf, geheimnis)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: Math.floor(GUELTIG_MS / 1000),
  });
}

export async function abmelden(): Promise<void> {
  const speicher = await cookies();
  speicher.delete({ name: COOKIE, path: "/admin" });
}

export async function istAngemeldet(): Promise<boolean> {
  const geheimnis = passwort();
  if (!geheimnis) {
    return false;
  }
  const wert = (await cookies()).get(COOKIE)?.value;
  if (!wert) {
    return false;
  }
  const [ablaufText, signatur] = wert.split(".");
  const ablauf = Number(ablaufText);
  if (!Number.isFinite(ablauf) || ablauf < Date.now() || !signatur) {
    return false;
  }
  return gleich(signatur, signieren(ablauf, geheimnis));
}
