"use server";

import { revalidatePath } from "next/cache";
import { einstellungenSpeichern } from "../einstellungen";
import {
  abmelden,
  anmeldungSetzen,
  istAngemeldet,
  passwortIstEingerichtet,
  passwortStimmt,
} from "./sitzung";

export type Rueckmeldung = { art: "fehler" | "erfolg"; text: string } | null;

/**
 * Bremst falsche Passwörter aus. Das macht das Durchprobieren von Passwörtern
 * deutlich langsamer, ohne dass eine richtige Anmeldung spürbar wartet.
 */
function verzoegern(): Promise<void> {
  return new Promise((fertig) => setTimeout(fertig, 800));
}

export async function anmelden(
  _zustand: Rueckmeldung,
  formular: FormData,
): Promise<Rueckmeldung> {
  if (!passwortIstEingerichtet()) {
    return {
      art: "fehler",
      text: "Es ist kein Passwort hinterlegt. Bitte ADMIN_PASSWORT in den Vercel-Einstellungen setzen.",
    };
  }

  const eingabe = String(formular.get("passwort") ?? "");
  if (!passwortStimmt(eingabe)) {
    await verzoegern();
    return { art: "fehler", text: "Das Passwort stimmt nicht." };
  }

  await anmeldungSetzen();
  return null;
}

export async function abmeldenAktion(): Promise<void> {
  await abmelden();
}

export async function speichern(
  _zustand: Rueckmeldung,
  formular: FormData,
): Promise<Rueckmeldung> {
  if (!(await istAngemeldet())) {
    return { art: "fehler", text: "Bitte melden Sie sich erneut an." };
  }

  const bannerText = String(formular.get("bannerText") ?? "").trim();
  const bannerBis = String(formular.get("bannerBis") ?? "").trim();
  const telefonVersteckt = formular.get("telefonVersteckt") === "ja";

  if (bannerBis && !/^\d{4}-\d{2}-\d{2}$/.test(bannerBis)) {
    return { art: "fehler", text: "Das Datum konnte nicht gelesen werden." };
  }
  if (bannerBis && !bannerText) {
    return {
      art: "fehler",
      text: "Bitte schreiben Sie eine Nachricht, oder löschen Sie das Datum wieder.",
    };
  }

  try {
    await einstellungenSpeichern({ bannerText, bannerBis, telefonVersteckt });
  } catch (fehler) {
    // Die genaue Ursache mit anzeigen: Diese Seite sieht nur Till, und ohne
    // den Originaltext lässt sich ein Speicherproblem kaum eingrenzen.
    console.error("Einstellungen speichern fehlgeschlagen:", fehler);
    const grund = fehler instanceof Error ? fehler.message : String(fehler);
    return {
      art: "fehler",
      text: `Das Speichern hat nicht geklappt: ${grund}`,
    };
  }

  // Die Startseite und alle Ortsseiten zeigen die Leiste, also müssen sie neu
  // erzeugt werden. revalidatePath mit "layout" erfasst den ganzen Baum.
  revalidatePath("/", "layout");

  return { art: "erfolg", text: "Gespeichert. Die Änderung ist sofort sichtbar." };
}
