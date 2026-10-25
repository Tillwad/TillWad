import type { Metadata } from "next";
import { BEWERTUNG_GOOGLE, BEWERTUNG_NEBENAN } from "../daten";
import { KopfZeile, FussZeile } from "../komponenten";

// Diese Adresse steht gedruckt auf der Visitenkarte (werbung/
// visitenkarte.html), als QR-Code und zum Eintippen. Die Seite bleibt deshalb
// bewusst klein: eine Frage, zwei große Knöpfe. Wer hier landet, hat die
// Hilfe schon hinter sich und soll nur noch bewerten können – bei Google
// oder, ohne Google-Konto, bei nebenan.de.
export const metadata: Metadata = {
  title: "Bewertung schreiben | Computerhilfe mit Till",
  description:
    "Hat Ihnen meine Hilfe gefallen? Hier können Sie Computerhilfe mit Till bei Google oder nebenan.de bewerten.",
  alternates: {
    canonical: "/bewerten",
  },
};

export default function Bewerten() {
  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50 px-5 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border-2 border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Hat Ihnen meine Hilfe gefallen?
          </h1>
          <div
            aria-hidden="true"
            className="mx-auto mt-5 text-3xl tracking-widest text-amber-400"
          >
            ★★★★★
          </div>
          <p className="mt-6 text-xl leading-relaxed text-slate-700">
            Dann freue ich mich über eine kurze Bewertung. Sie hilft anderen
            Nachbarn, mich zu finden, und dauert nur ein paar Minuten.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            {/* Neuer Tab, damit tillwadehn.de offen bleibt; nofollow, weil
                Suchmaschinen den Bewertungsportalen hierüber kein Gewicht
                weiterreichen sollen. */}
            <a
              href={BEWERTUNG_GOOGLE}
              target="_blank"
              rel="nofollow noopener"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-8 py-5 text-2xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
            >
              Bei Google bewerten
            </a>
            <a
              href={BEWERTUNG_NEBENAN}
              target="_blank"
              rel="nofollow noopener"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-blue-700 px-8 py-4 text-xl font-bold text-blue-800 hover:bg-blue-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
            >
              Bei nebenan.de bewerten
            </a>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-slate-600">
            Für Google brauchen Sie ein Google-Konto. Haben Sie keines, nehmen
            Sie einfach nebenan.de.
          </p>
        </div>
      </main>

      <FussZeile />
    </>
  );
}
