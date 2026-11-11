import { AlertTriangle, CheckCircle2, ChevronRight, Info } from "lucide-react";
import type { Block } from "./beitraege";

// Darstellung der Textbausteine eines Ratgeber-Beitrags. Die Schrift ist
// durchgehend groß gehalten, wie auf der ganzen Website: Ein guter Teil der
// Leserinnen und Leser ist über siebzig.

const KASTEN_TON = {
  wichtig: {
    rahmen: "border-rose-300 bg-rose-50",
    kreis: "bg-rose-100 text-rose-700",
    icon: AlertTriangle,
  },
  hinweis: {
    rahmen: "border-blue-300 bg-blue-50",
    kreis: "bg-blue-100 text-blue-700",
    icon: Info,
  },
  gut: {
    rahmen: "border-green-300 bg-green-50",
    kreis: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
} as const;

function Kasten({
  ton,
  titel,
  text,
}: {
  ton: keyof typeof KASTEN_TON;
  titel: string;
  text: string;
}) {
  const stil = KASTEN_TON[ton];
  return (
    <aside className={`mt-10 rounded-2xl border-2 p-7 ${stil.rahmen}`}>
      <h3 className="flex items-start gap-4 text-2xl font-bold text-slate-900">
        <span
          className={`mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${stil.kreis}`}
        >
          <stil.icon size={26} aria-hidden="true" />
        </span>
        {titel}
      </h3>
      <p className="mt-3 text-lg leading-relaxed text-slate-800 sm:pl-15">
        {text}
      </p>
    </aside>
  );
}

/**
 * Ein Tipp-Weg durch eine App als Kette von Schritten. Auf dem Handy stehen
 * die Schritte untereinander, erst ab der Tablet-Breite nebeneinander: In
 * einer Zeile wären fünf Schritte sonst unleserlich klein.
 */
function Pfad({ titel, schritte }: { titel: string; schritte: string[] }) {
  return (
    <div className="mt-10 rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900">{titel}</h3>
      <ol className="mt-5 flex list-none flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        {schritte.map((schritt, i) => (
          <li key={schritt} className="flex items-center gap-2">
            {i > 0 ? (
              <ChevronRight
                size={22}
                aria-hidden="true"
                className="hidden shrink-0 text-slate-400 sm:block"
              />
            ) : null}
            <span className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-lg font-semibold text-slate-800">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white sm:hidden">
                {i + 1}
              </span>
              {schritt}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BeitragsInhalt({ bloecke }: { bloecke: Block[] }) {
  return (
    <>
      {bloecke.map((block, i) => {
        switch (block.art) {
          case "absatz":
            return (
              <p
                key={i}
                className="mt-6 text-xl leading-relaxed text-slate-700"
              >
                {block.text}
              </p>
            );

          case "zwischentitel":
            return (
              <h2
                key={i}
                className="mt-14 text-3xl font-bold leading-tight text-slate-900"
              >
                {block.text}
                <span
                  aria-hidden="true"
                  className="mt-4 block h-2 w-24 rounded-full bg-amber-400"
                />
              </h2>
            );

          case "liste":
            return (
              <ul key={i} className="mt-8 flex list-none flex-col gap-4">
                {block.punkte.map((punkt) => (
                  <li key={punkt} className="flex items-start gap-4">
                    <CheckCircle2
                      size={30}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-green-600"
                    />
                    <span className="text-lg leading-relaxed text-slate-800">
                      {punkt}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "schritte":
            return (
              <ol key={i} className="mt-8 flex list-none flex-col gap-6">
                {block.schritte.map((schritt, nummer) => (
                  <li key={schritt.titel} className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white">
                      {nummer + 1}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {schritt.titel}
                      </h3>
                      <p className="mt-2 text-lg leading-relaxed text-slate-700">
                        {schritt.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            );

          case "kasten":
            return (
              <Kasten
                key={i}
                ton={block.ton}
                titel={block.titel}
                text={block.text}
              />
            );

          case "pfad":
            return <Pfad key={i} titel={block.titel} schritte={block.schritte} />;
        }
      })}
    </>
  );
}
