import type { Frage } from "./daten";

// Strukturierte Daten (JSON-LD) für Suchmaschinen und KI-Assistenten.
//
// Bewusst enthalten diese Daten weder Telefonnummer noch E-Mail-Adresse: Die
// Kontaktdaten sollen nach wie vor nicht im HTML-Quelltext stehen, siehe
// app/schutz-links.tsx.

function JsonLd({ daten }: { daten: object }) {
  return (
    <script
      type="application/ld+json"
      // Der Inhalt stammt ausschließlich aus app/daten.ts, also aus eigenem,
      // statischem Text – es fließen keine Eingaben von außen ein.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }}
    />
  );
}

/**
 * FAQPage-Auszeichnung. Die Fragen und Antworten müssen identisch auch sichtbar
 * auf der Seite stehen – sonst verstößt die Auszeichnung gegen Googles
 * Richtlinien. Deshalb kommt beides aus derselben Liste in app/daten.ts.
 */
export function FragenDaten({
  fragen,
  seitenUrl,
}: {
  fragen: Frage[];
  seitenUrl: string;
}) {
  return (
    <JsonLd
      daten={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${seitenUrl}#fragen`,
        mainEntity: fragen.map((eintrag) => ({
          "@type": "Question",
          name: eintrag.frage,
          acceptedAnswer: {
            "@type": "Answer",
            text: eintrag.antwort,
          },
        })),
      }}
    />
  );
}
