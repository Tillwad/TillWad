// Berechnet die freien Zeitfenster für die Online-Terminbuchung.
//
// Belegt ist alles, was in Tills Kalender steht (eingelesen über die geheime
// iCal-Adresse aus der Umgebungsvariable KALENDER_ICS_URL – die gibt es bei
// Google, Apple und Outlook) sowie alle Buchungen, die schon über die Website
// hereingekommen und nicht abgesagt sind.
//
// Alle Zeiten werden in Berliner Ortszeit gedacht und als UTC-Zeitpunkte
// gerechnet. Der Server läuft nämlich in UTC, die Kundinnen und Kunden leben
// in Berlin.

import {
  ARBEITSZEITEN,
  HORIZONT_TAGE,
  PUFFER_MINUTEN,
  SCHRITT_MINUTEN,
  VORLAUF_STUNDEN,
  anliegen,
} from "./konfiguration";
import { buchungenLesen } from "./buchungen";

const MINUTE = 60 * 1000;
const TAG = 24 * 60 * MINUTE;

/** Ein belegter oder angebotener Zeitraum, als Millisekunden seit 1970. */
export type Zeitraum = { von: number; bis: number };

type Datum = { jahr: number; monat: number; tag: number };

// ---------------------------------------------------------------------------
// Zeitzonen-Handwerk: Berliner Ortszeit <-> UTC-Zeitpunkt
// ---------------------------------------------------------------------------

const BERLIN_FORMAT = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Zerlegt einen Zeitpunkt in das, was eine Berliner Wanduhr anzeigen würde. */
function berlinTeile(zeitpunkt: Date): Datum & { stunde: number; minute: number } {
  const teile: Record<string, number> = {};
  for (const teil of BERLIN_FORMAT.formatToParts(zeitpunkt)) {
    if (teil.type !== "literal") {
      teile[teil.type] = Number(teil.value);
    }
  }
  return {
    jahr: teile.year,
    monat: teile.month,
    tag: teile.day,
    // Intl liefert für Mitternacht je nach Umgebung "24" – hier soll es 0 sein.
    stunde: teile.hour === 24 ? 0 : teile.hour,
    minute: teile.minute,
  };
}

/**
 * Macht aus einer Berliner Wanduhr-Zeit den tatsächlichen Zeitpunkt. Die
 * Verschiebung zwischen Sommer- und Winterzeit wird dabei berücksichtigt,
 * indem erst geschätzt und dann nachjustiert wird.
 */
function berlinZeit(
  jahr: number,
  monat: number,
  tag: number,
  stunde: number,
  minute: number,
): number {
  const gewuenscht = Date.UTC(jahr, monat - 1, tag, stunde, minute);
  let zeitpunkt = gewuenscht;
  for (let runde = 0; runde < 2; runde += 1) {
    const angezeigt = berlinTeile(new Date(zeitpunkt));
    const alsUtc = Date.UTC(
      angezeigt.jahr,
      angezeigt.monat - 1,
      angezeigt.tag,
      angezeigt.stunde,
      angezeigt.minute,
    );
    if (alsUtc === gewuenscht) {
      break;
    }
    zeitpunkt -= alsUtc - gewuenscht;
  }
  return zeitpunkt;
}

/** Verschiebt ein Kalenderdatum um ganze Tage (oder Monate/Jahre). */
function datumPlus(
  datum: Datum,
  tage: number,
  monate = 0,
  jahre = 0,
): Datum {
  const d = new Date(
    Date.UTC(datum.jahr + jahre, datum.monat - 1 + monate, datum.tag + tage, 12),
  );
  return {
    jahr: d.getUTCFullYear(),
    monat: d.getUTCMonth() + 1,
    tag: d.getUTCDate(),
  };
}

/** Wochentag eines Kalenderdatums: 0 = Sonntag … 6 = Samstag. */
function wochentag(datum: Datum): number {
  return new Date(Date.UTC(datum.jahr, datum.monat - 1, datum.tag)).getUTCDay();
}

// ---------------------------------------------------------------------------
// iCal-Datei (ICS) einlesen
// ---------------------------------------------------------------------------

type IcsZeit = {
  zeit: number;
  ganztaegig: boolean;
  teile: Datum & { stunde: number; minute: number };
};

/**
 * Liest einen Zeitwert aus der ICS-Datei. Drei Formen kommen vor:
 * "20261020T090000Z" (UTC), "20261020T090000" (Ortszeit, hier: Berlin) und
 * "20261020" (ganztägig). Fremde Zeitzonen behandelt die Buchung wie Berlin –
 * für einen privaten Kalender aus Berlin ist das die richtige Annahme.
 */
function icsZeitLesen(wert: string): IcsZeit | null {
  const nurDatum = /^(\d{4})(\d{2})(\d{2})$/.exec(wert);
  if (nurDatum) {
    const teile = {
      jahr: Number(nurDatum[1]),
      monat: Number(nurDatum[2]),
      tag: Number(nurDatum[3]),
      stunde: 0,
      minute: 0,
    };
    return {
      zeit: berlinZeit(teile.jahr, teile.monat, teile.tag, 0, 0),
      ganztaegig: true,
      teile,
    };
  }
  const mitZeit = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/.exec(wert);
  if (!mitZeit) {
    return null;
  }
  const teile = {
    jahr: Number(mitZeit[1]),
    monat: Number(mitZeit[2]),
    tag: Number(mitZeit[3]),
    stunde: Number(mitZeit[4]),
    minute: Number(mitZeit[5]),
  };
  const zeit = mitZeit[7]
    ? Date.UTC(teile.jahr, teile.monat - 1, teile.tag, teile.stunde, teile.minute)
    : berlinZeit(teile.jahr, teile.monat, teile.tag, teile.stunde, teile.minute);
  if (mitZeit[7]) {
    // Für Wiederholungen zählt die Berliner Wanduhr-Zeit, nicht die UTC-Zahl.
    const berlin = berlinTeile(new Date(zeit));
    return { zeit, ganztaegig: false, teile: berlin };
  }
  return { zeit, ganztaegig: false, teile };
}

type IcsEreignis = {
  beginn: IcsZeit;
  dauerMs: number;
  wiederholung: string | null;
  ausnahmen: Set<number>;
};

/**
 * Zerlegt den Text einer ICS-Datei in Ereignisse mit Beginn und Dauer.
 * Abgesagte Termine (STATUS:CANCELLED) und als "frei" markierte Einträge
 * (TRANSP:TRANSPARENT, bei Google z. B. Geburtstage) blockieren nichts.
 */
export function icsEreignisseLesen(text: string): IcsEreignis[] {
  // Lange Zeilen sind in ICS umgebrochen und beginnen dann mit einem
  // Leerzeichen – erst wieder zusammenkleben.
  const zeilen: string[] = [];
  for (const zeile of text.split(/\r?\n/)) {
    if ((zeile.startsWith(" ") || zeile.startsWith("\t")) && zeilen.length > 0) {
      zeilen[zeilen.length - 1] += zeile.slice(1);
    } else {
      zeilen.push(zeile);
    }
  }

  const ereignisse: IcsEreignis[] = [];
  let aktuell: {
    beginn?: IcsZeit;
    ende?: IcsZeit;
    wiederholung?: string;
    ausnahmen: Set<number>;
    abgesagt: boolean;
    frei: boolean;
  } | null = null;

  for (const zeile of zeilen) {
    if (zeile === "BEGIN:VEVENT") {
      aktuell = { ausnahmen: new Set(), abgesagt: false, frei: false };
      continue;
    }
    if (zeile === "END:VEVENT") {
      if (aktuell?.beginn && !aktuell.abgesagt && !aktuell.frei) {
        const beginn = aktuell.beginn;
        const ende =
          aktuell.ende?.zeit ??
          (beginn.ganztaegig ? beginn.zeit + TAG : beginn.zeit);
        ereignisse.push({
          beginn,
          dauerMs: Math.max(0, ende - beginn.zeit),
          wiederholung: aktuell.wiederholung ?? null,
          ausnahmen: aktuell.ausnahmen,
        });
      }
      aktuell = null;
      continue;
    }
    if (!aktuell) {
      continue;
    }

    const doppelpunkt = zeile.indexOf(":");
    if (doppelpunkt < 0) {
      continue;
    }
    const kopf = zeile.slice(0, doppelpunkt);
    const wert = zeile.slice(doppelpunkt + 1).trim();
    const name = kopf.split(";")[0];

    if (name === "DTSTART") {
      aktuell.beginn = icsZeitLesen(wert) ?? aktuell.beginn;
    } else if (name === "DTEND") {
      aktuell.ende = icsZeitLesen(wert) ?? aktuell.ende;
    } else if (name === "RRULE") {
      aktuell.wiederholung = wert;
    } else if (name === "EXDATE") {
      for (const einzeln of wert.split(",")) {
        const zeit = icsZeitLesen(einzeln.trim());
        if (zeit) {
          aktuell.ausnahmen.add(zeit.zeit);
        }
      }
    } else if (name === "STATUS" && wert.toUpperCase() === "CANCELLED") {
      aktuell.abgesagt = true;
    } else if (name === "TRANSP" && wert.toUpperCase() === "TRANSPARENT") {
      aktuell.frei = true;
    }
  }

  return ereignisse;
}

// ---------------------------------------------------------------------------
// Wiederholungen (RRULE) ausrollen
// ---------------------------------------------------------------------------

const ICS_WOCHENTAGE: Record<string, number> = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6,
};

/**
 * Rollt eine Wiederholungsregel innerhalb des Buchungszeitraums aus. Gedeckt
 * sind die Formen, die in privaten Kalendern vorkommen: täglich, wöchentlich
 * (auch mit Wochentagen), monatlich und jährlich, jeweils mit INTERVAL,
 * UNTIL und COUNT. Exotischere Regeln werden wie ein einmaliger Termin
 * behandelt – schlimmstenfalls bestätigt Till einen Termin dann von Hand um.
 */
function wiederholungAusrollen(
  ereignis: IcsEreignis,
  fensterVon: number,
  fensterBis: number,
): Zeitraum[] {
  const regel: Record<string, string> = {};
  for (const teil of (ereignis.wiederholung ?? "").split(";")) {
    const [schluessel, wert] = teil.split("=");
    if (schluessel && wert) {
      regel[schluessel.toUpperCase()] = wert;
    }
  }

  const frequenz = regel.FREQ;
  const intervall = Math.max(1, Number(regel.INTERVAL ?? 1) || 1);
  const bisRegel = regel.UNTIL ? icsZeitLesen(regel.UNTIL)?.zeit : undefined;
  let verbleibend = regel.COUNT ? Number(regel.COUNT) || Infinity : Infinity;

  const start = ereignis.beginn.teile;
  const startDatum: Datum = { jahr: start.jahr, monat: start.monat, tag: start.tag };
  const ergebnis: Zeitraum[] = [];

  const aufnehmen = (datum: Datum): "weiter" | "stopp" => {
    const von = berlinZeit(datum.jahr, datum.monat, datum.tag, start.stunde, start.minute);
    if (bisRegel !== undefined && von > bisRegel) {
      return "stopp";
    }
    if (verbleibend <= 0) {
      return "stopp";
    }
    verbleibend -= 1;
    if (
      !ereignis.ausnahmen.has(von) &&
      von < fensterBis &&
      von + ereignis.dauerMs > fensterVon
    ) {
      ergebnis.push({ von, bis: von + ereignis.dauerMs });
    }
    return von >= fensterBis ? "stopp" : "weiter";
  };

  // Sicherheitsgrenze gegen Endlosschleifen bei kaputten Regeln.
  const MAX_SCHRITTE = 10000;

  if (frequenz === "DAILY") {
    for (let k = 0; k < MAX_SCHRITTE; k += 1) {
      if (aufnehmen(datumPlus(startDatum, k * intervall)) === "stopp") break;
    }
  } else if (frequenz === "WEEKLY") {
    const tage = (regel.BYDAY ?? "")
      .split(",")
      .map((kuerzel) => ICS_WOCHENTAGE[kuerzel.trim()])
      .filter((tag): tag is number => tag !== undefined);
    if (tage.length === 0) {
      tage.push(wochentag(startDatum));
    }
    // Wochenbeginn Montag (so will es der Standard). Von dort aus wird Woche
    // für Woche geschaut, welche der genannten Wochentage dran sind.
    const versatzZumMontag = (wochentag(startDatum) + 6) % 7;
    const montag = datumPlus(startDatum, -versatzZumMontag);
    schleife: for (let woche = 0; woche < MAX_SCHRITTE / 7; woche += 1) {
      for (let tagImWoche = 0; tagImWoche < 7; tagImWoche += 1) {
        const datum = datumPlus(montag, woche * intervall * 7 + tagImWoche);
        const istVorStart =
          Date.UTC(datum.jahr, datum.monat - 1, datum.tag) <
          Date.UTC(startDatum.jahr, startDatum.monat - 1, startDatum.tag);
        if (istVorStart || !tage.includes(wochentag(datum))) {
          continue;
        }
        if (aufnehmen(datum) === "stopp") {
          break schleife;
        }
      }
    }
  } else if (frequenz === "MONTHLY" || frequenz === "YEARLY") {
    for (let k = 0; k < MAX_SCHRITTE; k += 1) {
      const datum =
        frequenz === "MONTHLY"
          ? datumPlus(startDatum, 0, k * intervall)
          : datumPlus(startDatum, 0, 0, k * intervall);
      // Ein 31. rutscht in kurzen Monaten in den Folgemonat – solche
      // Verschiebungen lässt der Kalender einfach aus.
      if (datum.tag !== startDatum.tag) {
        continue;
      }
      if (aufnehmen(datum) === "stopp") break;
    }
  } else {
    // Unbekannte Regel: wenigstens der erste Termin zählt.
    const von = ereignis.beginn.zeit;
    if (von < fensterBis && von + ereignis.dauerMs > fensterVon) {
      ergebnis.push({ von, bis: von + ereignis.dauerMs });
    }
  }

  return ergebnis;
}

/** Macht aus den ICS-Ereignissen konkrete belegte Zeiträume im Fenster. */
export function belegteZeitraeume(
  ereignisse: IcsEreignis[],
  fensterVon: number,
  fensterBis: number,
): Zeitraum[] {
  const belegt: Zeitraum[] = [];
  for (const ereignis of ereignisse) {
    if (ereignis.wiederholung) {
      belegt.push(...wiederholungAusrollen(ereignis, fensterVon, fensterBis));
    } else {
      const von = ereignis.beginn.zeit;
      const bis = von + ereignis.dauerMs;
      if (von < fensterBis && bis > fensterVon) {
        belegt.push({ von, bis });
      }
    }
  }
  return belegt;
}

// ---------------------------------------------------------------------------
// Belegte Zeiten zusammentragen und freie Fenster berechnen
// ---------------------------------------------------------------------------

/**
 * Holt die belegten Zeiten aus Tills Kalendern. KALENDER_ICS_URL darf mehrere
 * iCal-Adressen enthalten, durch Komma oder Zeilenumbruch getrennt – alle
 * zusammen beanspruchen seine Zeit. Ohne eingerichtete Adressen (oder wenn
 * ein Abruf scheitert) blockiert der betroffene Kalender nichts – dann zählt
 * der Rest. Lieber ein Doppelbucher, den Till beim Bestätigen bemerkt, als
 * gar keine Buchung.
 */
async function kalenderZeitraeume(
  fensterVon: number,
  fensterBis: number,
): Promise<Zeitraum[]> {
  const urls = (process.env.KALENDER_ICS_URL ?? "")
    .split(/[,\s]+/)
    .map((url) => url.trim())
    .filter(Boolean);
  if (urls.length === 0) {
    return [];
  }

  const ergebnisse = await Promise.all(
    urls.map(async (url): Promise<Zeitraum[]> => {
      try {
        // 5 Minuten zwischengespeichert: schnell genug für die Seite, frisch
        // genug, damit neue Kalendereinträge zeitnah blocken.
        const antwort = await fetch(url, { next: { revalidate: 300 } });
        if (!antwort.ok) {
          console.error(
            `Kalender (ICS) antwortete mit ${antwort.status}: ${url.slice(0, 60)}…`,
          );
          return [];
        }
        return belegteZeitraeume(
          icsEreignisseLesen(await antwort.text()),
          fensterVon,
          fensterBis,
        );
      } catch (fehler) {
        console.error("Kalender (ICS) konnte nicht gelesen werden:", fehler);
        return [];
      }
    }),
  );
  return ergebnisse.flat();
}

/** Ein buchbarer Beginn-Zeitpunkt, fertig beschriftet fürs Formular. */
export type TerminVorschlag = { iso: string; anzeige: string };

export type TagMitZeiten = {
  /** Kalendertag in Berlin, z. B. "2026-10-22". */
  datum: string;
  /** Beschriftung, z. B. "Donnerstag, 22. Oktober". */
  anzeige: string;
  zeiten: TerminVorschlag[];
};

/** Freie Beginnzeiten je Dauer: ein Eintrag pro im Angebot vorkommender Dauer. */
export type FreieTermine = Record<number, TagMitZeiten[]>;

const TAG_FORMAT = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  weekday: "long",
  day: "numeric",
  month: "long",
});

const ZEIT_FORMAT = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  hour: "2-digit",
  minute: "2-digit",
});

function uhrzeitLesen(wert: string): { stunde: number; minute: number } {
  const [stunde, minute] = wert.split(":").map(Number);
  return { stunde: stunde || 0, minute: minute || 0 };
}

/** Überschneiden sich Terminwunsch und belegte Zeit, Wegezeit eingerechnet? */
function kollidiert(von: number, bis: number, belegt: Zeitraum[]): boolean {
  const puffer = PUFFER_MINUTEN * MINUTE;
  return belegt.some((zeitraum) => von < zeitraum.bis + puffer && bis > zeitraum.von - puffer);
}

/** Alle belegten Zeiträume: Kalender plus nicht abgesagte Website-Buchungen. */
export async function alleBelegtenZeitraeume(
  fensterVon: number,
  fensterBis: number,
): Promise<Zeitraum[]> {
  const [kalender, buchungen] = await Promise.all([
    kalenderZeitraeume(fensterVon, fensterBis),
    buchungenLesen(),
  ]);
  const belegt = [...kalender];
  for (const buchung of buchungen) {
    if (buchung.status === "abgesagt") {
      continue;
    }
    const von = Date.parse(buchung.beginn);
    belegt.push({ von, bis: von + buchung.dauerMinuten * MINUTE });
  }
  return belegt;
}

function fensterGrenzen(jetzt: number): { von: number; bis: number } {
  return {
    von: jetzt + VORLAUF_STUNDEN * 60 * MINUTE,
    bis: jetzt + HORIZONT_TAGE * TAG,
  };
}

/**
 * Prüft beim Absenden noch einmal, ob der gewünschte Beginn wirklich frei und
 * überhaupt im Angebot ist – zwischen Anzeigen und Abschicken kann jemand
 * anderes schneller gewesen sein.
 */
export async function beginnIstFrei(
  beginn: number,
  dauerMinuten: number,
  jetzt = Date.now(),
): Promise<boolean> {
  const { von, bis } = fensterGrenzen(jetzt);
  if (beginn < von || beginn > bis) {
    return false;
  }

  const teile = berlinTeile(new Date(beginn));
  const fenster = ARBEITSZEITEN[wochentag(teile)] ?? [];
  const beginnMinuten = teile.stunde * 60 + teile.minute;
  const passtInArbeitszeit = fenster.some((zeitfenster) => {
    const von = uhrzeitLesen(zeitfenster.von);
    const bis = uhrzeitLesen(zeitfenster.bis);
    return (
      beginnMinuten >= von.stunde * 60 + von.minute &&
      beginnMinuten + dauerMinuten <= bis.stunde * 60 + bis.minute &&
      beginnMinuten % SCHRITT_MINUTEN === 0
    );
  });
  if (!passtInArbeitszeit) {
    return false;
  }

  const belegt = await alleBelegtenZeitraeume(beginn - TAG, beginn + 2 * TAG);
  return !kollidiert(beginn, beginn + dauerMinuten * MINUTE, belegt);
}

/**
 * Berechnet die freien Beginnzeiten für jede Dauer, die im Angebot vorkommt.
 * Ein kurzer Drucker-Termin passt schließlich noch in Lücken, in denen ein
 * zweistündiger Einrichtungstermin keinen Platz mehr hätte.
 */
export async function freieTermineBerechnen(
  jetzt = Date.now(),
): Promise<FreieTermine> {
  const { von: fruehestens, bis: spaetestens } = fensterGrenzen(jetzt);
  const belegt = await alleBelegtenZeitraeume(jetzt, spaetestens + TAG);
  const dauern = [...new Set(anliegen.map((eintrag) => eintrag.dauerMinuten))];

  const ergebnis: FreieTermine = {};
  for (const dauer of dauern) {
    const tage: TagMitZeiten[] = [];
    let datum: Datum = berlinTeile(new Date(jetzt));
    for (let tagNr = 0; tagNr <= HORIZONT_TAGE; tagNr += 1) {
      const fenster = ARBEITSZEITEN[wochentag(datum)] ?? [];
      const zeiten: TerminVorschlag[] = [];
      for (const zeitfenster of fenster) {
        const start = uhrzeitLesen(zeitfenster.von);
        const ende = uhrzeitLesen(zeitfenster.bis);
        for (
          let minuten = start.stunde * 60 + start.minute;
          minuten + dauer <= ende.stunde * 60 + ende.minute;
          minuten += SCHRITT_MINUTEN
        ) {
          const beginn = berlinZeit(
            datum.jahr,
            datum.monat,
            datum.tag,
            Math.floor(minuten / 60),
            minuten % 60,
          );
          if (
            beginn < fruehestens ||
            beginn > spaetestens ||
            kollidiert(beginn, beginn + dauer * MINUTE, belegt)
          ) {
            continue;
          }
          zeiten.push({
            iso: new Date(beginn).toISOString(),
            anzeige: `${ZEIT_FORMAT.format(beginn)} Uhr`,
          });
        }
      }
      if (zeiten.length > 0) {
        const tagAlsZahl = `${datum.jahr}-${String(datum.monat).padStart(2, "0")}-${String(datum.tag).padStart(2, "0")}`;
        tage.push({
          datum: tagAlsZahl,
          anzeige: TAG_FORMAT.format(
            new Date(berlinZeit(datum.jahr, datum.monat, datum.tag, 12, 0)),
          ),
          zeiten,
        });
      }
      datum = datumPlus(datum, 1);
    }
    ergebnis[dauer] = tage;
  }
  return ergebnis;
}

/** Beschriftet einen Beginn-Zeitpunkt für Bestätigungstexte und Admin-Liste. */
export function terminBeschriften(beginn: number): string {
  return `${TAG_FORMAT.format(beginn)} um ${ZEIT_FORMAT.format(beginn)} Uhr`;
}
