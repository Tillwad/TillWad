"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { checkBotId } from "botid/server";
import { orte } from "../daten";
import {
  MAX_ANFRAGEN_GESAMT,
  MAX_ANFRAGEN_JE_ADRESSE,
  anliegenFinden,
  dauerBeschriften,
  geraeteAuswahl,
} from "./konfiguration";
import { beginnIstFrei, terminBeschriften } from "./kalender";
import { buchungAnlegen, buchungenLesen, type Buchung } from "./buchungen";
import { buchungAnPortalMelden } from "./portal";
import { absenderKennung, zeitstempelLesen } from "./schutz";

export type Rueckmeldung = { art: "fehler" | "erfolg"; text: string } | null;

const BITTE_PRUEFEN =
  "Bitte prüfen Sie Ihre Angaben und versuchen Sie es noch einmal.";

/** Schneidet Eingaben auf eine vernünftige Länge zu und entfernt Ränder. */
function feld(formular: FormData, name: string, maxLaenge: number): string {
  return String(formular.get(name) ?? "")
    .trim()
    .slice(0, maxLaenge);
}

export async function terminAnfragen(
  _zustand: Rueckmeldung,
  formular: FormData,
): Promise<Rueckmeldung> {
  // Erste Hürde: die Bot-Erkennung von Vercel. Sie prüft unsichtbar im
  // Hintergrund, ob die Anfrage aus einem echten Browser kommt. Schlägt der
  // Dienst selbst fehl, greifen immer noch die Prüfungen danach.
  try {
    const pruefung = await checkBotId();
    if (pruefung.isBot) {
      return { art: "fehler", text: BITTE_PRUEFEN };
    }
  } catch (fehler) {
    console.error("BotID-Prüfung nicht möglich:", fehler);
  }

  // Zweite Hürde: ein unsichtbares Feld, das Menschen nie ausfüllen. Steht
  // etwas darin, war ein Programm am Werk. Die Antwort sieht absichtlich wie
  // ein Erfolg aus, damit das Programm nichts lernt – gespeichert wird nichts.
  if (String(formular.get("firma") ?? "") !== "") {
    return {
      art: "erfolg",
      text: "Vielen Dank! Ihre Anfrage ist eingegangen.",
    };
  }

  // Dritte Hürde: Wer das Formular in unter fünf Sekunden ausfüllt, ist kein
  // Mensch. Älter als sechs Stunden darf die Seite auch nicht sein.
  const zeitstempel = zeitstempelLesen(feld(formular, "zeitstempel", 200));
  const alter = zeitstempel === null ? null : Date.now() - zeitstempel;
  if (alter === null || alter < 5_000 || alter > 6 * 60 * 60 * 1000) {
    return {
      art: "fehler",
      text: "Die Seite war zu lange geöffnet. Bitte laden Sie sie neu und senden Sie das Formular noch einmal ab.",
    };
  }

  // Jetzt die eigentlichen Angaben.
  const name = feld(formular, "name", 100);
  const telefon = feld(formular, "telefon", 40);
  const email = feld(formular, "email", 200);
  const ort = feld(formular, "ort", 50);
  const strasse = feld(formular, "strasse", 200);
  const problem = feld(formular, "problem", 2000);
  const anliegenSchluessel = feld(formular, "anliegen", 50);
  const beginnIso = feld(formular, "beginn", 50);
  const geraete = formular
    .getAll("geraete")
    .map(String)
    .filter((eintrag) => geraeteAuswahl.includes(eintrag));

  if (name.length < 2) {
    return { art: "fehler", text: "Bitte geben Sie Ihren Namen an." };
  }
  if (!/^[0-9+()/\s-]{6,}$/.test(telefon)) {
    return {
      art: "fehler",
      text: "Bitte geben Sie eine Telefonnummer an, unter der ich Sie erreichen kann.",
    };
  }
  if (email && !email.includes("@")) {
    return {
      art: "fehler",
      text: "Die E-Mail-Adresse sieht nicht vollständig aus. Sie können das Feld auch leer lassen.",
    };
  }
  if (!orte.some((eintrag) => eintrag.name === ort)) {
    return { art: "fehler", text: "Bitte wählen Sie Ihren Ort aus der Liste." };
  }
  if (strasse.length < 5) {
    return {
      art: "fehler",
      text: "Bitte geben Sie Straße und Hausnummer an, damit ich zu Ihnen finde.",
    };
  }
  if (geraete.length === 0) {
    return {
      art: "fehler",
      text: "Bitte kreuzen Sie an, um welche Geräte es geht.",
    };
  }
  if (problem.length < 10) {
    return {
      art: "fehler",
      text: "Bitte beschreiben Sie mit ein, zwei Sätzen, wobei Sie Hilfe brauchen.",
    };
  }

  const gewaehltesAnliegen = anliegenFinden(anliegenSchluessel);
  if (!gewaehltesAnliegen) {
    return { art: "fehler", text: "Bitte wählen Sie aus, worum es geht." };
  }

  const beginn = Date.parse(beginnIso);
  if (!Number.isFinite(beginn)) {
    return { art: "fehler", text: "Bitte wählen Sie einen Termin aus." };
  }
  if (!(await beginnIstFrei(beginn, gewaehltesAnliegen.dauerMinuten))) {
    return {
      art: "fehler",
      text: "Dieser Termin ist leider gerade vergeben worden. Bitte wählen Sie einen anderen Termin.",
    };
  }

  // Letzte Hürde: das Ratenlimit. Mehr als eine Handvoll Anfragen pro Tag von
  // derselben Adresse (oder insgesamt) sind kein normales Kundenverhalten.
  const kopfzeilen = await headers();
  const adresse =
    kopfzeilen.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unbekannt";
  const absender = absenderKennung(adresse);
  const einTagZurueck = Date.now() - 24 * 60 * 60 * 1000;
  const bisherige = await buchungenLesen();
  const heutige = bisherige.filter(
    (eintrag) => Date.parse(eintrag.erstellt) > einTagZurueck,
  );
  if (
    heutige.length >= MAX_ANFRAGEN_GESAMT ||
    heutige.filter((eintrag) => eintrag.absender === absender).length >=
      MAX_ANFRAGEN_JE_ADRESSE
  ) {
    return {
      art: "fehler",
      text: "Es sind heute schon sehr viele Anfragen eingegangen. Bitte rufen Sie mich stattdessen einfach an.",
    };
  }

  const buchung: Buchung = {
    id: randomUUID(),
    erstellt: new Date().toISOString(),
    status: "offen",
    beginn: new Date(beginn).toISOString(),
    dauerMinuten: gewaehltesAnliegen.dauerMinuten,
    anliegen: gewaehltesAnliegen.schluessel,
    name,
    telefon,
    email,
    ort,
    strasse,
    problem,
    geraete,
    absender,
  };

  try {
    await buchungAnlegen(buchung);
  } catch (fehler) {
    console.error("Buchung speichern fehlgeschlagen:", fehler);
    return {
      art: "fehler",
      text: "Das Speichern hat leider nicht geklappt. Bitte rufen Sie mich einfach an – dann machen wir den Termin am Telefon aus.",
    };
  }

  // Weiter ins Portal: Kunde, Posteingangs-Nachricht und Kalendereintrag.
  // Bewusst nach dem Speichern und ohne die Antwort an den Kunden davon
  // abhängig zu machen — scheitert die Meldung, steht die Anfrage trotzdem
  // unter /admin.
  await buchungAnPortalMelden(buchung);

  revalidatePath("/admin");

  return {
    art: "erfolg",
    text: `Vielen Dank, ${name}! Ihr Terminwunsch ist eingegangen: ${terminBeschriften(beginn)}, Dauer ${dauerBeschriften(gewaehltesAnliegen.dauerMinuten)}. Ich melde mich vorab kurz telefonisch bei Ihnen, um den Termin zu bestätigen.`,
  };
}
