import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { beitraegeSortiert, datumLesbar } from "./beitraege";

/**
 * Die neuesten Ratgeber-Beiträge als Block zum Einbetten in andere Seiten,
 * etwa auf der Startseite.
 *
 * Warum das nicht nur Deko ist: Ein Beitrag, der nur unter /ratgeber hängt,
 * wird von Google spät gefunden. Genau das war der Fehler bei den Themenseiten
 * vor dem Umbau, siehe den Hinweis bei VerwandteThemen in app/komponenten.tsx.
 * Von der Startseite aus verlinkt, findet Google einen neuen Beitrag in der
 * Regel innerhalb weniger Tage.
 */
export function NeuesteBeitraege({
  titel = "Neu im Ratgeber",
  einleitung = "Was bei meinen Kunden gerade schiefgeht, verständlich erklärt und zum Selbermachen.",
  anzahl = 2,
  hell = true,
}: {
  titel?: string;
  einleitung?: string;
  anzahl?: number;
  /** false, wenn der Abschnitt auf dem grauen Seitenhintergrund steht. */
  hell?: boolean;
}) {
  const beitraege = beitraegeSortiert().slice(0, anzahl);
  if (beitraege.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="ratgeber-teaser-titel"
      className={`relative overflow-hidden px-5 py-14 sm:py-16 ${hell ? "bg-white" : ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-amber-50"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <h2
          id="ratgeber-teaser-titel"
          className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
        >
          {titel}
        </h2>
        <div
          aria-hidden="true"
          className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
        />
        <p className="mx-auto mt-5 max-w-2xl text-center text-xl leading-relaxed text-slate-700">
          {einleitung}
        </p>

        <ul
          className={`mt-10 grid list-none gap-6 ${
            beitraege.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-2xl"
          }`}
        >
          {beitraege.map((beitrag) => (
            <li key={beitrag.slug}>
              <Link
                href={`/ratgeber/${beitrag.slug}`}
                className="flex h-full flex-col rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm hover:border-blue-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-base font-bold text-amber-800">
                  <BookOpen size={18} aria-hidden="true" />
                  {beitrag.thema}
                </span>
                <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900">
                  {beitrag.titel}
                </h3>
                <p className="mt-3 grow text-lg leading-relaxed text-slate-700">
                  {beitrag.teaser}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-base text-slate-600">
                  <CalendarDays
                    size={18}
                    aria-hidden="true"
                    className="text-blue-700"
                  />
                  <time
                    dateTime={beitrag.aktualisiert ?? beitrag.veroeffentlicht}
                  >
                    {datumLesbar(
                      beitrag.aktualisiert ?? beitrag.veroeffentlicht,
                    )}
                  </time>
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-lg font-bold text-blue-800 underline underline-offset-4">
                  Beitrag lesen
                  <ArrowRight size={20} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-lg text-slate-700">
          <Link
            href="/ratgeber"
            className="font-bold text-blue-800 underline underline-offset-4 hover:text-blue-900"
          >
            Alle Beiträge im Ratgeber ansehen
          </Link>
        </p>
      </div>
    </section>
  );
}
