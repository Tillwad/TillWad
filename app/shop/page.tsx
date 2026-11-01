import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, PhoneCall, Truck } from "lucide-react";
import { KopfZeile, FussZeile } from "../komponenten";
import {
  TelefonLink,
  TelefonAnzeige,
  WennTelefonSichtbar,
} from "../schutz-links";
import {
  AFFILIATE_HINWEIS,
  LIEFERZEIT,
  UST_HINWEIS,
  VERKAUFSMODUS,
  VERSANDFREI_AB_EURO,
  preisAnzeigen,
} from "./konfiguration";
import { kategorien, produkte, type Produkt } from "./produkte";

export const metadata: Metadata = {
  title: "Shop: Geräte mit ehrlicher Beratung | Computerhilfe mit Till",
  description:
    "Von mir ausgesuchte Laptops, Router, Drucker und mehr, mit persönlicher Empfehlung und auf Wunsch fertig eingerichtet bei Ihnen zu Hause.",
  alternates: {
    canonical: "/shop",
  },
};

const versprechen =
  VERKAUFSMODUS === "affiliate"
    ? [
        "Jedes Gerät habe ich selbst ausgesucht. Hier steht nur, was ich guten Gewissens empfehle",
        "Zu jedem Gerät sage ich ehrlich, für wen es passt und für wen nicht",
        "Sie bestellen selbst, oder ich besorge das Gerät und bringe es zum Termin einfach mit",
        "Auf Wunsch richte ich alles bei Ihnen zu Hause fertig ein und erkläre es in Ruhe",
      ]
    : [
        "Jedes Gerät habe ich selbst ausgesucht. Es gibt nur, was ich guten Gewissens empfehle",
        "Zu jedem Gerät sage ich ehrlich, für wen es passt und für wen nicht",
        "Auf Wunsch liefere ich nicht nur, sondern richte alles bei Ihnen zu Hause fertig ein",
        "Bezahlt wird bequem per Überweisung nach Erhalt der Rechnung",
      ];

function PreisklassenMarke({ produkt }: { produkt: Produkt }) {
  if (!produkt.preisklasse) {
    return null;
  }
  const farben: Record<string, string> = {
    Einsteiger: "bg-green-100 text-green-900",
    Mittelklasse: "bg-blue-100 text-blue-900",
    Premium: "bg-amber-100 text-amber-900",
  };
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${farben[produkt.preisklasse]}`}
    >
      {produkt.preisklasse}
    </span>
  );
}

export default function Shop() {
  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50">
        <section className="relative overflow-hidden bg-white px-5 py-14 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-24 hidden h-80 w-80 rounded-full bg-blue-50 lg:block"
          />
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Technik kaufen mit ehrlicher Beratung
            </h1>
            <div
              aria-hidden="true"
              className="mt-4 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-700">
              Große Versandhäuser haben zehntausend Geräte und keinen
              Ansprechpartner. Ich empfehle gut zwei Dutzend, aber jedes
              davon habe ich selbst ausgesucht, und zu jedem sage ich Ihnen,
              für wen es passt. Wo Sie kaufen, entscheiden Sie. Und wenn Sie
              möchten, richte ich das neue Gerät anschließend bei Ihnen zu
              Hause fertig ein.
            </p>

            <ul className="mt-8 grid max-w-4xl list-none gap-4 sm:grid-cols-2">
              {versprechen.map((punkt) => (
                <li
                  key={punkt}
                  className="flex items-start gap-3 text-lg leading-relaxed text-slate-800"
                >
                  <HeartHandshake
                    size={26}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-green-600"
                  />
                  {punkt}
                </li>
              ))}
            </ul>

            {VERKAUFSMODUS === "affiliate" ? (
              <p className="mt-8 max-w-4xl rounded-xl border-2 border-slate-200 bg-slate-50 p-5 text-base leading-relaxed text-slate-600">
                Die Preise sind ungefähre Marktpreise zur Orientierung. Die
                mit * gekennzeichneten Verweise sind Partnerlinks.{" "}
                {AFFILIATE_HINWEIS}
              </p>
            ) : (
              <p className="mt-8 flex max-w-4xl items-start gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 p-5 text-lg leading-relaxed text-slate-700">
                <Truck
                  size={26}
                  aria-hidden="true"
                  className="mt-1 shrink-0"
                />
                <span>
                  Lieferung in {LIEFERZEIT} nach Hause, ab{" "}
                  {preisAnzeigen(VERSANDFREI_AB_EURO)} Bestellwert
                  versandkostenfrei. Alle Preise sind Endpreise.{" "}
                  {UST_HINWEIS}
                </span>
              </p>
            )}

            <WennTelefonSichtbar>
              <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-700">
                Unsicher, was das Richtige ist? Rufen Sie mich vor dem Kauf
                einfach an:{" "}
                <TelefonLink
                  bereich="shop"
                  className="font-bold text-blue-800 underline underline-offset-4"
                >
                  <TelefonAnzeige />
                </TelefonLink>
                . Die Beratung kostet nichts, und ich rate auch mal von einem
                Kauf ab.
              </p>
            </WennTelefonSichtbar>
          </div>
        </section>

        {kategorien.map((kategorie, nummer) => {
          const eintraege = produkte.filter(
            (produkt) => produkt.kategorie === kategorie.schluessel,
          );
          return (
            <section
              key={kategorie.schluessel}
              aria-labelledby={`kategorie-${kategorie.schluessel}`}
              className={`px-5 py-12 sm:py-16 ${nummer % 2 === 1 ? "bg-white" : ""}`}
            >
              <div className="mx-auto w-full max-w-5xl">
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${kategorie.farbe}`}
                  >
                    <kategorie.icon size={32} aria-hidden="true" />
                  </span>
                  <h2
                    id={`kategorie-${kategorie.schluessel}`}
                    className="text-3xl font-bold text-slate-900"
                  >
                    {kategorie.titel}
                  </h2>
                </div>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
                  {kategorie.beschreibung}
                </p>

                <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {eintraege.map((produkt) => (
                    <li key={produkt.slug}>
                      <Link
                        href={`/shop/${produkt.slug}`}
                        className="flex h-full flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm hover:border-blue-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                      >
                        {/* Produktfoto, solange keins da ist das
                            Kategorie-Symbol als Platzhalter. */}
                        {produkt.bild ? (
                          <div className="relative mb-5 h-40 w-full">
                            <Image
                              src={produkt.bild}
                              alt={produkt.bildAlt ?? produkt.name}
                              fill
                              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 100vw"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div
                            aria-hidden="true"
                            className={`mb-5 flex h-40 w-full items-center justify-center rounded-xl ${kategorie.farbe}`}
                          >
                            <kategorie.icon size={64} />
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xl font-bold text-slate-900">
                            {produkt.name}
                          </h3>
                          <PreisklassenMarke produkt={produkt} />
                        </div>
                        <p className="mt-3 grow text-lg leading-relaxed text-slate-700">
                          {produkt.idealFuer}
                        </p>
                        <p className="mt-4 text-2xl font-bold text-blue-800">
                          {VERKAUFSMODUS === "affiliate" ? "ca. " : ""}
                          {preisAnzeigen(produkt.preisEuro)}
                          {produkt.preisZusatz ? (
                            <span className="ml-2 text-base font-normal text-slate-600">
                              {produkt.preisZusatz}
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-blue-800">
                          {VERKAUFSMODUS === "affiliate"
                            ? "Empfehlung ansehen"
                            : "Ansehen und bestellen"}
                          <ArrowRight size={20} aria-hidden="true" />
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

        <section className="bg-blue-700 px-5 py-14 text-white sm:py-16">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center">
            <PhoneCall size={40} aria-hidden="true" />
            <h2 className="text-3xl font-bold">
              Das Passende nicht gefunden?
            </h2>
            <p className="text-xl leading-relaxed">
              Ich besorge über meinen Großhändler fast jedes Gerät. Rufen Sie
              einfach an und sagen Sie mir, was Sie brauchen. Die Beratung
              kostet Sie nichts.
            </p>
            <WennTelefonSichtbar>
              <TelefonLink
                bereich="shop"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-5 text-2xl font-bold text-blue-800 shadow-md hover:bg-blue-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <TelefonAnzeige />
              </TelefonLink>
            </WennTelefonSichtbar>
          </div>
        </section>
      </main>

      <FussZeile />
    </>
  );
}
