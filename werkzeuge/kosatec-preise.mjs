// OPTIONAL – für den Handbetrieb nicht nötig. Der Shop funktioniert komplett
// ohne dieses Skript: Till pflegt die Preise von Hand in app/shop/produkte.ts
// (Checkliste: werkzeuge/preis-checkliste.md) und bestellt selbst bei Kosatec.
// Erst wenn später die Kosatec-E-Services freigeschaltet werden (EDI-Key),
// nimmt dieses Skript die Handarbeit ab.
//
// Holt Preisliste und Artikeldaten von Kosatec, schlägt Verkaufspreise vor
// und lädt Produktbilder herunter. Läuft von Hand auf dem Rechner, nicht auf
// dem Server:
//
//   node werkzeuge/kosatec-preise.mjs laden    – Preisliste + Artikeldaten holen
//   node werkzeuge/kosatec-preise.mjs preise   – Verkaufspreise vorschlagen
//   node werkzeuge/kosatec-preise.mjs bilder   – Produktbilder herunterladen
//
// Voraussetzungen:
// - In .env.local stehen KOSATEC_KUNDENNUMMER und KOSATEC_EDI_KEY
//   (Freischaltung unter shop.kosatec.de/e-services, "Mein Konto / E-Services").
// - werkzeuge/kosatec-zuordnung.json ordnet jedem Shop-Produkt (Slug) eine
//   Kosatec-Artikelnummer zu. Einträge mit null werden übersprungen.
//
// Kalkulation (mit Till am 2026-11-01 festgelegt): Als Kleinunternehmer gibt
// es keinen Vorsteuerabzug, die echten Kosten sind also hek × 1,19. Darauf
// kommen ~12 % Aufschlag, aufgerundet auf den nächsten Preis mit 9er-Endung.
// Liegt das Ergebnis über dem Kosatec-Endkundenpreis (vkbrutto), wird das
// markiert – dann lieber von Hand entscheiden.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATEN = join(WURZEL, "werkzeuge", "kosatec-daten");
const ZUORDNUNG = join(WURZEL, "werkzeuge", "kosatec-zuordnung.json");
const BILDER = join(WURZEL, "public", "images", "shop");

const AUFSCHLAG = 1.12;
const UMSATZSTEUER = 1.19;

/** Liest KOSATEC_* aus .env.local – ohne zusätzliche Pakete. */
async function zugangsdaten() {
  const pfad = join(WURZEL, ".env.local");
  let inhalt = "";
  try {
    inhalt = await readFile(pfad, "utf8");
  } catch {
    abbruch(`Keine .env.local gefunden (${pfad}).`);
  }
  const werte = {};
  for (const zeile of inhalt.split("\n")) {
    const treffer = zeile.match(/^\s*([A-Z_0-9]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (treffer) {
      werte[treffer[1]] = treffer[2].trim();
    }
  }
  const kundennummer = werte.KOSATEC_KUNDENNUMMER;
  const ediKey = werte.KOSATEC_EDI_KEY;
  if (!kundennummer || !ediKey) {
    abbruch(
      "Bitte KOSATEC_KUNDENNUMMER und KOSATEC_EDI_KEY in .env.local eintragen " +
        "(Freischaltung unter shop.kosatec.de/e-services).",
    );
  }
  return { kundennummer, ediKey };
}

function abbruch(text) {
  console.error(`Fehler: ${text}`);
  process.exit(1);
}

async function herunterladen(url, ziel) {
  const antwort = await fetch(url);
  if (!antwort.ok) {
    abbruch(`${url} antwortet mit ${antwort.status} ${antwort.statusText}.`);
  }
  const puffer = Buffer.from(await antwort.arrayBuffer());
  await mkdir(dirname(ziel), { recursive: true });
  await writeFile(ziel, puffer);
  console.log(`✓ ${ziel} (${Math.round(puffer.length / 1024)} kB)`);
}

/**
 * Zerlegt eine Kosatec-Liste in Objekte. Das Trennzeichen (Semikolon, Tab
 * oder Pipe) wird aus der Kopfzeile erraten, damit kleine Formatänderungen
 * das Skript nicht gleich brechen.
 */
async function listeLesen(datei) {
  let inhalt;
  try {
    inhalt = await readFile(join(DATEN, datei), "latin1");
  } catch {
    abbruch(`${datei} fehlt – zuerst "laden" ausführen.`);
  }
  const zeilen = inhalt.split(/\r?\n/).filter((zeile) => zeile.trim() !== "");
  const kopf = zeilen[0];
  const trenner = [";", "\t", "|"].reduce((bester, kandidat) =>
    kopf.split(kandidat).length > kopf.split(bester).length ? kandidat : bester,
  );
  const spalten = kopf.split(trenner).map((name) => name.trim().toLowerCase());
  return zeilen.slice(1).map((zeile) => {
    const werte = zeile.split(trenner);
    const eintrag = {};
    spalten.forEach((name, stelle) => {
      eintrag[name] = (werte[stelle] ?? "").trim();
    });
    return eintrag;
  });
}

function zahl(text) {
  const wert = Number(String(text ?? "").replace(",", "."));
  return Number.isFinite(wert) ? wert : null;
}

/** Rundet auf den nächsten Preis mit 9er-Endung auf (24 → 29, 122 → 129). */
function auf9Enden(euro) {
  if (euro <= 9) {
    return 9;
  }
  return Math.ceil((euro + 1) / 10) * 10 - 1;
}

async function zuordnungLesen() {
  try {
    return JSON.parse(await readFile(ZUORDNUNG, "utf8"));
  } catch {
    abbruch(`${ZUORDNUNG} fehlt oder ist kein gültiges JSON.`);
  }
}

async function laden() {
  const { kundennummer, ediKey } = await zugangsdaten();
  const basis = `https://data.kosatec.de/${kundennummer}/${ediKey}`;
  await herunterladen(`${basis}/preisliste.csv`, join(DATEN, "preisliste.csv"));
  await herunterladen(
    `${basis}/artikeldaten.txt`,
    join(DATEN, "artikeldaten.txt"),
  );
  console.log(
    "\nFertig. Jetzt die Artikelnummern in werkzeuge/kosatec-zuordnung.json " +
      "eintragen und danach \"preise\" und \"bilder\" ausführen.",
  );
}

async function preise() {
  const zuordnung = await zuordnungLesen();
  const liste = await listeLesen("preisliste.csv");
  const nachArtnr = new Map(liste.map((eintrag) => [eintrag.artnr, eintrag]));

  console.log(
    ["Slug", "Artikel", "EK netto", "Kosten", "Vorschlag", "Kosatec-VK", "Marge"].join(
      "\t",
    ),
  );
  for (const [slug, artnr] of Object.entries(zuordnung)) {
    if (!artnr) {
      console.log(`${slug}\t– (keine Artikelnummer zugeordnet)`);
      continue;
    }
    const artikel = nachArtnr.get(String(artnr));
    if (!artikel) {
      console.log(`${slug}\t– (Artikelnummer ${artnr} nicht in der Preisliste)`);
      continue;
    }
    const hek = zahl(artikel.hek);
    const uvp = zahl(artikel.vkbrutto);
    if (hek === null) {
      console.log(`${slug}\t${artikel.artname}\t– (kein Einkaufspreis lesbar)`);
      continue;
    }
    const kosten = hek * UMSATZSTEUER;
    const vorschlag = auf9Enden(kosten * AUFSCHLAG);
    const marge = vorschlag - kosten;
    const warnung =
      uvp !== null && vorschlag > uvp
        ? `  ⚠ über Kosatec-VK (${uvp.toFixed(2)} €)`
        : "";
    console.log(
      [
        slug,
        artikel.artname,
        `${hek.toFixed(2)} €`,
        `${kosten.toFixed(2)} €`,
        `${vorschlag} €`,
        uvp === null ? "–" : `${uvp.toFixed(2)} €`,
        `${marge.toFixed(2)} €${warnung}`,
      ].join("\t"),
    );
  }
}

async function bilder() {
  const zuordnung = await zuordnungLesen();
  const liste = await listeLesen("artikeldaten.txt");
  const nachArtnr = new Map(liste.map((eintrag) => [eintrag.artnr, eintrag]));
  await mkdir(BILDER, { recursive: true });

  for (const [slug, artnr] of Object.entries(zuordnung)) {
    if (!artnr) {
      continue;
    }
    const artikel = nachArtnr.get(String(artnr));
    if (!artikel) {
      console.log(`– ${slug}: Artikelnummer ${artnr} nicht in den Artikeldaten`);
      continue;
    }
    // Das größte verfügbare Bild nehmen; mehrere Bilder sind in einem Feld
    // aneinandergereiht, das erste ist das Hauptbild.
    const feld =
      Object.entries(artikel).find(
        ([name, wert]) => /bild|image/.test(name) && /^https?:/.test(wert),
      )?.[1] ?? "";
    const url = feld.split(/[|;,\s]+/).find((teil) => /^https?:/.test(teil));
    if (!url) {
      console.log(`– ${slug}: kein Bild in den Artikeldaten gefunden`);
      continue;
    }
    const endung = url.match(/\.(jpe?g|png|webp)(\?|$)/i)?.[1] ?? "jpg";
    await herunterladen(url, join(BILDER, `${slug}.${endung.toLowerCase()}`));
  }
  console.log(
    "\nFertig. Jetzt in app/shop/produkte.ts je Produkt das Feld bild " +
      '("/images/shop/<slug>.jpg") ergänzen.',
  );
}

const befehl = process.argv[2];
if (befehl === "laden") {
  await laden();
} else if (befehl === "preise") {
  await preise();
} else if (befehl === "bilder") {
  await bilder();
} else {
  console.log(
    "Aufruf: node werkzeuge/kosatec-preise.mjs <laden | preise | bilder>",
  );
}
