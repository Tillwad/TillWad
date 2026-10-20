import type { Buchung } from "./buchungen";
import { anliegenFinden } from "./konfiguration";

// Meldet eine neue Buchung an Tills CRM-Portal (portal.tillwadehn.de). Dort
// entsteht daraus der Kunde, eine Nachricht im Posteingang und der Termin im
// Google-Kalender.
//
// Zwei Umgebungsvariablen in Vercel:
//   PORTAL_BUCHUNG_URL     z. B. https://portal.tillwadehn.de/api/webhooks/booking
//   PORTAL_BUCHUNG_SECRET  derselbe Wert wie BOOKING_SECRET im Portal
//
// Die Meldung ist bewusst "best effort": Die Buchung ist zu diesem Zeitpunkt
// schon gespeichert und blockiert ihr Zeitfenster. Ist das Portal gerade nicht
// erreichbar, verliert der Kunde nichts — die Anfrage steht weiterhin unter
// /admin, nur der Komfort (Posteingang, Kalender) fehlt dann für diese eine
// Buchung.

export async function buchungAnPortalMelden(buchung: Buchung): Promise<void> {
  const url = process.env.PORTAL_BUCHUNG_URL;
  const secret = process.env.PORTAL_BUCHUNG_SECRET;
  if (!url || !secret) {
    return;
  }

  try {
    const antwort = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buchungId: buchung.id,
        name: buchung.name,
        telefon: buchung.telefon,
        email: buchung.email,
        strasse: buchung.strasse,
        ort: buchung.ort,
        problem: buchung.problem,
        geraete: buchung.geraete,
        // Das Portal kennt die Anliegen-Schlüssel nicht, es bekommt den Titel.
        anliegen: anliegenFinden(buchung.anliegen)?.titel ?? buchung.anliegen,
        beginn: buchung.beginn,
        dauerMinuten: buchung.dauerMinuten,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!antwort.ok) {
      console.error(
        `Buchung ${buchung.id} ans Portal melden fehlgeschlagen: ${antwort.status} ${await antwort.text().catch(() => "")}`,
      );
    }
  } catch (fehler) {
    console.error(`Buchung ${buchung.id} ans Portal melden fehlgeschlagen:`, fehler);
  }
}
