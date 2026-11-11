import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  CalendarDays,
  Clock,
  ArrowRight,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { SITE_URL } from "../daten";
import { KopfZeile, FussZeile, VerwandteThemen } from "../komponenten";
import { TelefonLink, TelefonAnzeige } from "../schutz-links";
import { beitraegeSortiert, datumLesbar } from "./beitraege";

export const metadata: Metadata = {
  title: "Ratgeber: verständliche Technik-Tipps aus der Praxis",
  description:
    "Was gerade schiefgeht und wie Sie es beheben: verständlich erklärte Anleitungen zu Handy, Computer, Drucker und Internet, aufgeschrieben von Till Wadehn aus Berlin.",
  alternates: { canonical: "/ratgeber" },
};

export default function Ratgeber() {
  const beitraege = beitraegeSortiert();

  return (
    <>
      {/* Der Ratgeber als Blog auszeichnen. Die einzelnen Beiträge zeichnen
          sich zusätzlich selbst als BlogPosting aus und verweisen über
          isPartOf auf diese Kennung hier. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE_URL}/ratgeber#blog`,
            name: "Ratgeber von Computerhilfe mit Till",
            description:
              "Verständlich erklärte Technik-Tipps aus der Praxis eines IT-Helfers im Berliner Südwesten.",
            url: `${SITE_URL}/ratgeber`,
            inLanguage: "de",
            author: { "@type": "Person", name: "Till Wadehn" },
            blogPost: beitraege.map((beitrag) => ({
              "@type": "BlogPosting",
              "@id": `${SITE_URL}/ratgeber/${beitrag.slug}#beitrag`,
              headline: beitrag.titel,
              url: `${SITE_URL}/ratgeber/${beitrag.slug}`,
              datePublished: beitrag.veroeffentlicht,
            })),
          }),
        }}
      />

      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50">
        {/* Einstieg */}
        <section
          aria-labelledby="einstieg-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-50"
          />
          <div
            aria-hidden="true"
            className="dot-grid pointer-events-none absolute right-8 top-10 h-28 w-28"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <BookOpen size={48} aria-hidden="true" />
            </span>
            <h1
              id="einstieg-titel"
              className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            >
              Ratgeber
            </h1>
            <div
              aria-hidden="true"
              className="mx-auto mt-5 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-6 text-xl leading-relaxed text-slate-700 sm:text-2xl">
              Hier schreibe ich auf, was bei meinen Kunden gerade wirklich
              schiefgeht, und wie Sie es beheben. Verständlich, ohne
              Fachbegriffe und so, dass Sie es selbst nachmachen können. Wenn
              Sie nicht weiterkommen, rufen Sie mich an.
            </p>
          </div>
        </section>

        {/* Die Beiträge */}
        <section aria-labelledby="beitraege-titel" className="px-5 py-14 sm:py-16">
          <div className="mx-auto w-full max-w-3xl">
            <h2 id="beitraege-titel" className="sr-only">
              Alle Beiträge
            </h2>

            <ul className="flex list-none flex-col gap-6">
              {beitraege.map((beitrag) => (
                <li key={beitrag.slug}>
                  <Link
                    href={`/ratgeber/${beitrag.slug}`}
                    className="flex h-full flex-col rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm hover:border-blue-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:p-8"
                  >
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-base font-bold text-amber-800">
                      <BookOpen size={18} aria-hidden="true" />
                      {beitrag.thema}
                    </span>
                    <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                      {beitrag.titel}
                    </h3>
                    <p className="mt-4 grow text-lg leading-relaxed text-slate-700">
                      {beitrag.teaser}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays
                          size={18}
                          aria-hidden="true"
                          className="text-blue-700"
                        />
                        <time
                          dateTime={
                            beitrag.aktualisiert ?? beitrag.veroeffentlicht
                          }
                        >
                          {datumLesbar(
                            beitrag.aktualisiert ?? beitrag.veroeffentlicht,
                          )}
                        </time>
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock
                          size={18}
                          aria-hidden="true"
                          className="text-blue-700"
                        />
                        {beitrag.lesezeit} Minuten
                      </span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-lg font-bold text-blue-800 underline underline-offset-4">
                      Beitrag lesen
                      <ArrowRight size={20} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Einladung, Themen vorzuschlagen. Das ist nicht nur freundlich,
                sondern auch der beste Weg zu neuen Beiträgen: Die Fragen, die
                mehrfach am Telefon kommen, sind genau die, die auch gesucht
                werden. */}
            <div className="mt-10 rounded-2xl border-2 border-slate-200 bg-white p-7">
              <h2 className="flex items-start gap-4 text-2xl font-bold text-slate-900">
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Lightbulb size={26} aria-hidden="true" />
                </span>
                Sie haben ein Thema, das hier fehlt?
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-slate-700 sm:pl-15">
                Dann sagen Sie es mir gerne. Wenn eine Frage mehrfach kommt,
                schreibe ich sie hier auf, damit alle etwas davon haben.
              </p>
              <div className="mt-6 sm:pl-15">
                <TelefonLink
                  bereich="kontakt"
                  className="inline-flex items-center gap-3 rounded-xl bg-blue-700 px-7 py-4 text-xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <Phone size={24} aria-hidden="true" />
                  <TelefonAnzeige />
                </TelefonLink>
              </div>
            </div>
          </div>
        </section>

        <VerwandteThemen aktuelleSeite="/ratgeber" />
      </main>

      <FussZeile />
    </>
  );
}
