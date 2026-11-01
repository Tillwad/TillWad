"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { checkBotId } from "botid/server";
import { absenderKennung, zeitstempelLesen } from "../termin/schutz";
import {
  istImEinzugsgebiet,
  MAX_BESTELLUNGEN_GESAMT,
  MAX_BESTELLUNGEN_JE_ADRESSE,
  preisAnzeigen,
  versandBerechnen,
} from "./konfiguration";
import { produktFinden } from "./produkte";
import {
  bestellungAnlegen,
  bestellungenLesen,
  type Bestellung,
} from "./bestellungen";
import { grosshaendler } from "./grosshaendler";

export type Rueckmeldung =
  | { art: "fehler"; text: string }
  | { art: "erfolg"; text: string; nummer: string }
  | null;

const BITTE_PRUEFEN =
  "Bitte prüfen Sie Ihre Angaben und versuchen Sie es noch einmal.";

/** Schneidet Eingaben auf eine vernünftige Länge zu und entfernt Ränder. */
function feld(formular: FormData, name: string, maxLaenge: number): string {
  return String(formular.get(name) ?? "")
    .trim()
    .slice(0, maxLaenge);
}

/** Kurze, lesbare Bestellnummer wie "B-20261101-483". */
function bestellnummer(): string {
  const heute = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const zufall = Math.floor(Math.random() * 900) + 100;
  return `B-${heute}-${zufall}`;
}

export async function bestellungAbsenden(
  _zustand: Rueckmeldung,
  formular: FormData,
): Promise<Rueckmeldung> {
  // Derselbe dreistufige Bot-Schutz wie bei der Terminbuchung, siehe
  // app/termin/aktionen.ts: BotID, Honeypot-Feld, signierter Zeitstempel.
  try {
    const pruefung = await checkBotId();
    if (pruefung.isBot) {
      return { art: "fehler", text: BITTE_PRUEFEN };
    }
  } catch (fehler) {
    console.error("BotID-Prüfung nicht möglich:", fehler);
  }

  if (String(formular.get("firma") ?? "") !== "") {
    return {
      art: "erfolg",
      text: "Vielen Dank! Ihre Bestellung ist eingegangen.",
      nummer: bestellnummer(),
    };
  }

  const zeitstempel = zeitstempelLesen(feld(formular, "zeitstempel", 200));
  const alter = zeitstempel === null ? null : Date.now() - zeitstempel;
  if (alter === null || alter < 5_000 || alter > 6 * 60 * 60 * 1000) {
    return {
      art: "fehler",
      text: "Die Seite war zu lange geöffnet. Bitte laden Sie sie neu und senden Sie die Bestellung noch einmal ab.",
    };
  }

  // Das Produkt kommt aus dem Formular, aber Preise und Namen kommen immer
  // aus den eigenen Daten – was im Browser steht, ist nicht vertrauenswürdig.
  const produkt = produktFinden(feld(formular, "produkt", 100));
  if (!produkt) {
    return { art: "fehler", text: BITTE_PRUEFEN };
  }
  const name = feld(formular, "name", 100);
  const telefon = feld(formular, "telefon", 40);
  const email = feld(formular, "email", 200);
  const strasse = feld(formular, "strasse", 200);
  const plz = feld(formular, "plz", 10);
  const ort = feld(formular, "ort", 100);
  const hinweis = feld(formular, "hinweis", 1000);

  if (name.length < 2) {
    return { art: "fehler", text: "Bitte geben Sie Ihren Namen an." };
  }
  if (!/^[0-9+()/\s-]{6,}$/.test(telefon)) {
    return {
      art: "fehler",
      text: "Bitte geben Sie eine Telefonnummer an, unter der ich Sie erreichen kann.",
    };
  }
  // Anders als beim Termin ist die E-Mail hier Pflicht: Die Bestellung muss
  // schriftlich bestätigt werden (inklusive Widerrufsbelehrung).
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return {
      art: "fehler",
      text: "Bitte geben Sie Ihre E-Mail-Adresse an, dorthin schicke ich die Bestellbestätigung.",
    };
  }
  if (strasse.length < 5) {
    return {
      art: "fehler",
      text: "Bitte geben Sie Straße und Hausnummer für die Lieferung an.",
    };
  }
  if (!/^\d{5}$/.test(plz)) {
    return { art: "fehler", text: "Bitte geben Sie eine Postleitzahl an." };
  }
  if (ort.length < 2) {
    return { art: "fehler", text: "Bitte geben Sie Ihren Ort an." };
  }
  if (formular.get("rechtstexte") !== "ja") {
    return {
      art: "fehler",
      text: "Bitte bestätigen Sie, dass Sie AGB und Widerrufsbelehrung gelesen haben.",
    };
  }

  // Die Einrichtung zu Hause gibt es nur im Einzugsgebiet. Das Formular
  // blendet sie außerhalb aus; hier wird es trotzdem noch einmal geprüft,
  // damit niemand mit einem anderen Preis bestellt, als er gesehen hat.
  const einrichtungGewuenscht = formular.get("einrichtung") === "ja";
  if (einrichtungGewuenscht && produkt.einrichtung && !istImEinzugsgebiet(plz)) {
    return {
      art: "fehler",
      text: "Die Einrichtung zu Hause biete ich nur in meinem Einzugsgebiet im Berliner Südwesten an. Bitte entfernen Sie das Häkchen bei der Einrichtung, oder rufen Sie mich an, dann finden wir eine Lösung.",
    };
  }
  const einrichtungGebucht = einrichtungGewuenscht && Boolean(produkt.einrichtung);
  const einrichtungPreisEuro = einrichtungGebucht
    ? (produkt.einrichtung?.preisEuro ?? 0)
    : 0;
  const versandEuro = versandBerechnen(produkt.preisEuro);
  const gesamtEuro = produkt.preisEuro + einrichtungPreisEuro + versandEuro;

  // Ratenlimit wie bei der Terminbuchung.
  const kopfzeilen = await headers();
  const adresse =
    kopfzeilen.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unbekannt";
  const absender = absenderKennung(adresse);
  const einTagZurueck = Date.now() - 24 * 60 * 60 * 1000;
  const bisherige = await bestellungenLesen();
  const heutige = bisherige.filter(
    (eintrag) => Date.parse(eintrag.erstellt) > einTagZurueck,
  );
  if (
    heutige.length >= MAX_BESTELLUNGEN_GESAMT ||
    heutige.filter((eintrag) => eintrag.absender === absender).length >=
      MAX_BESTELLUNGEN_JE_ADRESSE
  ) {
    return {
      art: "fehler",
      text: "Es sind heute schon sehr viele Bestellungen eingegangen. Bitte rufen Sie mich stattdessen einfach an.",
    };
  }

  const bestellung: Bestellung = {
    id: randomUUID(),
    nummer: bestellnummer(),
    erstellt: new Date().toISOString(),
    status: "neu",
    produktSlug: produkt.slug,
    produktName: produkt.name,
    produktPreisEuro: produkt.preisEuro,
    einrichtungGebucht,
    einrichtungPreisEuro,
    versandEuro,
    gesamtEuro,
    name,
    telefon,
    email,
    strasse,
    plz,
    ort,
    hinweis,
    absender,
  };

  try {
    await bestellungAnlegen(bestellung);
  } catch (fehler) {
    console.error("Bestellung speichern fehlgeschlagen:", fehler);
    return {
      art: "fehler",
      text: "Das Speichern hat leider nicht geklappt. Bitte rufen Sie mich einfach an, dann nehme ich die Bestellung am Telefon auf.",
    };
  }

  // Weiter zum Großhändler – im Testlauf passiert hier bewusst nichts, die
  // Bestellung wartet unter /admin. Scheitert eine spätere automatische
  // Übermittlung, bleibt die Bestellung trotzdem gespeichert.
  try {
    await grosshaendler.bestellungUebermitteln(bestellung);
  } catch (fehler) {
    console.error("Übermittlung an den Großhändler fehlgeschlagen:", fehler);
  }

  revalidatePath("/admin");

  return {
    art: "erfolg",
    nummer: bestellung.nummer,
    text: `Vielen Dank, ${name}! Ihre Bestellung ${bestellung.nummer} über ${preisAnzeigen(gesamtEuro)} ist eingegangen. Ich melde mich kurz bei Ihnen, bestätige die Bestellung per E-Mail und gebe sie dann in den Versand. Bezahlt wird bequem per Überweisung nach Erhalt der Rechnung.`,
  };
}
