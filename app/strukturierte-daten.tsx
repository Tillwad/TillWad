import {
  ADRESSE,
  PREIS_STUNDE,
  PREIS_ZAHL,
  SITE_URL,
  leistungen,
  orte,
  type Frage,
} from "./daten";

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
 * LocalBusiness-Auszeichnung: Wer bietet was, wo und zu welchem Preis an.
 * Steht nur auf der Startseite, damit es genau eine Stelle gibt, die das
 * Unternehmen beschreibt.
 *
 * Bewusst ohne "telephone" und "email" – siehe Hinweis oben. Google zeigt
 * Kontaktdaten in der Suche ohnehin aus dem Unternehmensprofil, nicht aus
 * dieser Auszeichnung.
 */
export function UnternehmensDaten() {
  const [strasse, ortMitPlz] = ADRESSE;
  const [plz, ...ortsteile] = ortMitPlz.split(" ");

  return (
    <JsonLd
      daten={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#unternehmen`,
        name: "IT-Hilfe von Till",
        description:
          "Geduldige Hilfe bei Computer, Handy, Tablet, Internet, Drucker und Fernseher – als Hausbesuch im Berliner Südwesten, verständlich erklärt und ohne Fachbegriffe.",
        url: SITE_URL,
        image: `${SITE_URL}/images/till_wadehn_it_support.jpg`,
        founder: { "@type": "Person", name: "Till Wadehn" },
        address: {
          "@type": "PostalAddress",
          streetAddress: strasse,
          postalCode: plz,
          addressLocality: ortsteile.join(" "),
          addressRegion: "Berlin",
          addressCountry: "DE",
        },
        // Der Preis wird zusätzlich als Zahl ausgezeichnet, damit er
        // maschinell lesbar ist und nicht nur als Text dasteht.
        priceRange: PREIS_STUNDE,
        currenciesAccepted: "EUR",
        makesOffer: {
          "@type": "Offer",
          name: "Hausbesuch",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: PREIS_ZAHL,
            priceCurrency: "EUR",
            unitCode: "HUR",
          },
        },
        areaServed: orte.map((ort) => ({
          "@type": "Place",
          name: ort.name,
        })),
        knowsLanguage: "de",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Leistungen",
          itemListElement: leistungen.map((leistung) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: leistung.titel,
              description: leistung.beschreibung,
            },
          })),
        },
      }}
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
