import { createHmac } from "node:crypto";

// Kleine Helfer gegen automatisierte Anfragen. Sie ergänzen die eigentliche
// Bot-Erkennung (Vercel BotID, siehe aktionen.ts) um zwei einfache Hürden:
// ein signierter Zeitstempel verrät, ob das Formular verdächtig schnell
// abgeschickt wurde, und ein Fingerabdruck der Absender-Adresse begrenzt die
// Zahl der Anfragen, ohne die Adresse selbst zu speichern.

/**
 * Als Schlüssel dient das ohnehin vorhandene Admin-Passwort. Fehlt es, wird
 * ein fester Ersatz genommen – die Signatur ist dann wertlos, aber die
 * Zeitprüfung funktioniert weiterhin.
 */
function geheimnis(): string {
  return process.env.ADMIN_PASSWORT || "tillwad-ohne-geheimnis";
}

function signieren(text: string): string {
  return createHmac("sha256", geheimnis()).update(text).digest("hex");
}

/** Wird beim Aufbau der Seite erzeugt und wandert unsichtbar ins Formular. */
export function zeitstempelErzeugen(jetzt = Date.now()): string {
  return `${jetzt}.${signieren(String(jetzt))}`;
}

/** Liest den Zeitstempel zurück; null, wenn er fehlt oder gefälscht ist. */
export function zeitstempelLesen(wert: string): number | null {
  const [zahl, signatur] = wert.split(".");
  const zeit = Number(zahl);
  if (!Number.isFinite(zeit) || !signatur) {
    return null;
  }
  return signatur === signieren(zahl) ? zeit : null;
}

/** Fingerabdruck der Absender-Adresse – speicherbar, aber nicht umkehrbar. */
export function absenderKennung(adresse: string): string {
  return signieren(`absender:${adresse}`).slice(0, 32);
}
