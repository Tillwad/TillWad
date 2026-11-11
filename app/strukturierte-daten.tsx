import {
  ADRESSE,
  BEWERTUNG_GOOGLE,
  BEWERTUNG_NEBENAN,
  GEO,
  PREIS_STUNDE,
  PREIS_ZAHL,
  SITE_URL,
  leistungen,
  orte,
  type Frage,
  type Ort,
} from "./daten";
import { zeitenSchema } from "./oeffnungszeiten";

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
        name: "Computerhilfe mit Till",
        description:
          "Geduldige Hilfe bei Computer, Handy, Tablet, Internet, Drucker und Fernseher, als Hausbesuch im Berliner Südwesten, verständlich erklärt und ohne Fachbegriffe.",
        url: SITE_URL,
        image: `${SITE_URL}/images/till_wadehn_it_support.jpg`,
        logo: `${SITE_URL}/icon.png`,
        founder: { "@type": "Person", name: "Till Wadehn" },
        address: {
          "@type": "PostalAddress",
          streetAddress: strasse,
          postalCode: plz,
          addressLocality: ortsteile.join(" "),
          addressRegion: "Berlin",
          addressCountry: "DE",
        },
        // Die Koordinaten nehmen Google die Deutung der Adresse ab. Bei
        // Suchen wie "computerhilfe in der nähe" entscheidet die Entfernung
        // mit darüber, wer überhaupt angezeigt wird.
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.breite,
          longitude: GEO.laenge,
        },
        // Öffnungszeiten aus derselben Quelle wie die buchbaren Termine,
        // siehe app/oeffnungszeiten.ts. Sie stehen zusätzlich sichtbar in
        // der Fußzeile, wie Google es für strukturierte Daten verlangt.
        openingHoursSpecification: zeitenSchema(),
        // Verweise auf die Profile, die dasselbe Unternehmen beschreiben.
        // Damit kann Google Website, Unternehmensprofil und nebenan.de als
        // einen Anbieter zusammenführen statt als drei.
        //
        // Beim Google-Verweis fällt das "/review" weg: Gemeint ist hier das
        // Profil selbst und nicht das Formular zum Bewerten.
        sameAs: [BEWERTUNG_GOOGLE.replace(/\/review$/, ""), BEWERTUNG_NEBENAN],
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
 * Brotkrumenpfad: zeigt Google, wo eine Seite im Aufbau der Website steht.
 * In den Suchergebnissen erscheint dadurch statt der nackten Adresse ein
 * lesbarer Pfad wie "Computerhilfe mit Till > IT-Hilfe > Zehlendorf", und
 * Google versteht, dass die acht Ortsseiten zusammengehören.
 *
 * Die Startseite wird automatisch vorangestellt; übergeben werden nur die
 * Stufen darunter.
 */
export function BrotkrumenDaten({
  stufen,
}: {
  stufen: { name: string; pfad: string }[];
}) {
  const alle = [{ name: "Startseite", pfad: "/" }, ...stufen];

  return (
    <JsonLd
      daten={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: alle.map((stufe, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: stufe.name,
          item: `${SITE_URL}${stufe.pfad === "/" ? "" : stufe.pfad}`,
        })),
      }}
    />
  );
}

/**
 * Auszeichnung einer Ortsseite als angebotene Leistung mit Einsatzgebiet.
 *
 * Bewusst KEIN zweiter LocalBusiness je Ort: Acht Unternehmenseinträge mit
 * derselben Adresse liest Google als Versuch, mehrere Standorte
 * vorzutäuschen, und das schadet mehr, als es nützt. Richtig ist ein
 * Service, der über provider auf das eine Unternehmen verweist und über
 * areaServed sagt, wo diese Leistung erbracht wird.
 */
export function OrtsDaten({ ort }: { ort: Ort }) {
  const seitenUrl = `${SITE_URL}/it-hilfe/${ort.slug}`;

  return (
    <JsonLd
      daten={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${seitenUrl}#leistung`,
        name: `Computerhilfe und IT-Hilfe in ${ort.name}`,
        description: ort.metaBeschreibung,
        serviceType: "Computerhilfe, IT-Hilfe und Technikhilfe als Hausbesuch",
        url: seitenUrl,
        provider: { "@id": `${SITE_URL}/#unternehmen` },
        areaServed: {
          "@type": "Place",
          name: ort.name,
          // Die genannten Kieze und Straßen stehen auch sichtbar auf der
          // Seite. Sie sind der eigentliche Grund, warum eine Ortsseite
          // mehr ist als die Startseite mit ausgetauschtem Ortsnamen.
          description: ort.gebiete.join(", "),
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceLocation: { "@type": "Place", name: ort.name },
          serviceUrl: `${SITE_URL}/termin`,
        },
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: PREIS_ZAHL,
            priceCurrency: "EUR",
            unitCode: "HUR",
          },
        },
      }}
    />
  );
}

/**
 * Auszeichnung eines Ratgeber-Beitrags als BlogPosting. Damit weiß Google, dass
 * es ein datierter Beitrag ist und wer ihn geschrieben hat, und kann das Datum
 * in der Suche anzeigen. Bei einem Beitrag über eine aktuelle Änderung ist
 * gerade das Datum das, worauf die Leute schauen.
 *
 * Die FAQPage-Auszeichnung desselben Beitrags kommt zusätzlich aus
 * FragenDaten weiter unten; zwei getrennte Blöcke sind erlaubt und üblich.
 */
export function BeitragsDaten({
  titel,
  beschreibung,
  seitenUrl,
  veroeffentlicht,
  aktualisiert,
}: {
  titel: string;
  beschreibung: string;
  seitenUrl: string;
  veroeffentlicht: string;
  aktualisiert?: string;
}) {
  return (
    <JsonLd
      daten={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${seitenUrl}#beitrag`,
        headline: titel,
        description: beschreibung,
        url: seitenUrl,
        mainEntityOfPage: { "@type": "WebPage", "@id": seitenUrl },
        inLanguage: "de",
        datePublished: veroeffentlicht,
        dateModified: aktualisiert ?? veroeffentlicht,
        author: { "@type": "Person", name: "Till Wadehn" },
        publisher: {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#unternehmen`,
          name: "Computerhilfe mit Till",
        },
        isPartOf: {
          "@type": "Blog",
          "@id": `${SITE_URL}/ratgeber#blog`,
          name: "Ratgeber von Computerhilfe mit Till",
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
