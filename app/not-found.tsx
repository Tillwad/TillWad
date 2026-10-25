import Link from "next/link";
import { KopfZeile, FussZeile } from "./komponenten";
import { TelefonLink, TelefonAnzeige } from "./schutz-links";

// Fängt alle Adressen ab, die es nicht gibt – zum Beispiel Tippfehler beim
// Abtippen der Visitenkarte oder des Flyers. Deshalb führt die Seite nicht
// nur zur Startseite, sondern auch direkt zur Bewertungsseite.
export default function NichtGefunden() {
  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50 px-5 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border-2 border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Diese Seite gibt es leider nicht
          </h1>
          <div
            aria-hidden="true"
            className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
          />
          <p className="mt-6 text-xl leading-relaxed text-slate-700">
            Vielleicht hat sich beim Eintippen ein kleiner Fehler
            eingeschlichen. Das ist nicht schlimm, von hier aus kommen Sie
            überall hin:
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-8 py-5 text-2xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
            >
              Zur Startseite
            </Link>
            <Link
              href="/bewerten"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-blue-700 px-8 py-4 text-xl font-bold text-blue-800 hover:bg-blue-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
            >
              Eine Bewertung schreiben
            </Link>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-slate-600">
            Oder rufen Sie mich einfach an:{" "}
            <TelefonLink
              bereich="kontakt"
              className="font-bold whitespace-nowrap text-blue-800 underline underline-offset-4"
            >
              <TelefonAnzeige />
            </TelefonLink>
          </p>
        </div>
      </main>

      <FussZeile />
    </>
  );
}
