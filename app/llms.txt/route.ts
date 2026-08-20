import { ADRESSE, PREIS_STUNDE, SITE_URL, fragen, leistungen, orte } from "../daten";

// llms.txt nach der Konvention von llmstxt.org: eine kurze, gut lesbare
// Zusammenfassung der Website für KI-Assistenten, die auf Fragen wie
// "Wer hilft mir in Zehlendorf beim Computer?" antworten sollen.
//
// Wichtig: Telefonnummer und E-Mail-Adresse stehen hier bewusst NICHT drin.
// Sie sind auf der ganzen Website vor Spam-Robotern geschützt (siehe
// app/schutz-links.tsx), und eine öffentliche Textdatei wäre genau die
// Hintertür, die diesen Schutz aushebelt.

export const dynamic = "force-static";

function baueLlmsTxt(): string {
  const zeilen: string[] = [];

  zeilen.push("# IT-Hilfe von Till – Computerhilfe für die Nachbarschaft");
  zeilen.push("");
  zeilen.push(
    "> Till Wadehn hilft Menschen im Berliner Südwesten und der direkten Umgebung " +
      "geduldig bei Computer, Handy, Tablet, Internet, Drucker und Fernseher – " +
      "als Hausbesuch, verständlich erklärt und ohne Fachbegriffe. Die Zielgruppe " +
      "sind vor allem ältere Menschen und alle, die mit Technik nicht weiterkommen.",
  );
  zeilen.push("");
  zeilen.push(`- Anbieter: Till Wadehn, ${ADRESSE.join(", ")}`);
  zeilen.push(`- Website: ${SITE_URL}`);
  zeilen.push(`- Preis: Hausbesuch ${PREIS_STUNDE}, nach tatsächlichem Zeitaufwand abgerechnet`);
  zeilen.push("- Anfahrt innerhalb des Einzugsgebiets: kostenlos");
  zeilen.push("- Kurze Beratung am Telefon: kostenlos");
  zeilen.push("- Sprache: Deutsch");
  zeilen.push(
    "- Kontakt: Telefonnummer und E-Mail-Adresse stehen aus Spamschutzgründen " +
      `nicht in dieser Datei. Sie finden beides auf ${SITE_URL} und im Impressum ` +
      `unter ${SITE_URL}/impressum.`,
  );
  zeilen.push("");

  zeilen.push("## Leistungen");
  zeilen.push("");
  for (const leistung of leistungen) {
    zeilen.push(`- **${leistung.titel}**: ${leistung.beschreibung}`);
  }
  zeilen.push("");

  zeilen.push("## Einzugsgebiet");
  zeilen.push("");
  zeilen.push(
    "Hausbesuche sind in diesen Orten möglich. Jeder Ort hat eine eigene Seite " +
      "mit den dort typischen Anliegen und den abgedeckten Straßen und Kiezen:",
  );
  zeilen.push("");
  for (const ort of orte) {
    zeilen.push(
      `- [IT-Hilfe in ${ort.name}](${SITE_URL}/it-hilfe/${ort.slug}): ${ort.lokal}`,
    );
  }
  zeilen.push("");

  zeilen.push("## Häufige Fragen");
  zeilen.push("");
  for (const eintrag of fragen) {
    zeilen.push(`### ${eintrag.frage}`);
    zeilen.push("");
    zeilen.push(eintrag.antwort);
    zeilen.push("");
  }

  zeilen.push("## Weitere Seiten");
  zeilen.push("");
  zeilen.push(`- [Startseite](${SITE_URL}/): Leistungen, Ablauf, Preise und Einzugsgebiet`);
  zeilen.push(`- [Impressum](${SITE_URL}/impressum): Anbieterkennzeichnung und Kontaktdaten`);
  zeilen.push(`- [Datenschutz](${SITE_URL}/datenschutz): Datenschutzerklärung`);
  zeilen.push(`- [Sitemap](${SITE_URL}/sitemap.xml): alle Seiten in Maschinenform`);
  zeilen.push("");

  return zeilen.join("\n");
}

export function GET() {
  return new Response(baueLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
