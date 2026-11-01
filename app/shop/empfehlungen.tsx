import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { preisAnzeigen } from "./konfiguration";
import { kategorieFinden, produktFinden } from "./produkte";

/**
 * Ein Block mit Produkt-Empfehlungen aus der Kaufberatung (/shop), zum
 * Einbetten in die Hilfe-Seiten – etwa die FRITZ!-Geräte auf /wlan-hilfe.
 * Verlinkt wird auf die eigenen Produktseiten, nicht direkt zu Amazon:
 * Dort steht die ehrliche Empfehlung samt Einrichtungsangebot.
 */
export function ProduktEmpfehlungen({
  titel,
  einleitung,
  slugs,
  hell = true,
}: {
  titel: string;
  einleitung: string;
  slugs: string[];
  /** false, wenn der Abschnitt auf dem grauen Seitenhintergrund steht. */
  hell?: boolean;
}) {
  const eintraege = slugs
    .map((slug) => produktFinden(slug))
    .filter((produkt) => produkt !== undefined);
  if (eintraege.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="empfehlungen-titel"
      className={`relative overflow-hidden px-5 py-14 sm:py-16 ${hell ? "bg-white" : ""}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <h2
          id="empfehlungen-titel"
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

        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eintraege.map((produkt) => {
            const kategorie = kategorieFinden(produkt.kategorie);
            return (
              <li key={produkt.slug}>
                <Link
                  href={`/shop/${produkt.slug}`}
                  className="flex h-full flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm hover:border-blue-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  {produkt.bild ? (
                    <div className="relative mb-5 h-36 w-full">
                      <Image
                        src={produkt.bild}
                        alt={produkt.bildAlt ?? produkt.name}
                        fill
                        sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 100vw"
                        className="object-contain"
                      />
                    </div>
                  ) : kategorie ? (
                    <div
                      aria-hidden="true"
                      className={`mb-5 flex h-36 w-full items-center justify-center rounded-xl ${kategorie.farbe}`}
                    >
                      <kategorie.icon size={56} />
                    </div>
                  ) : null}
                  <h3 className="text-xl font-bold text-slate-900">
                    {produkt.name}
                  </h3>
                  <p className="mt-3 grow text-lg leading-relaxed text-slate-700">
                    {produkt.idealFuer}
                  </p>
                  <p className="mt-4 text-xl font-bold text-blue-800">
                    ca. {preisAnzeigen(produkt.preisEuro)}
                    {produkt.preisZusatz ? (
                      <span className="ml-2 text-base font-normal text-slate-600">
                        {produkt.preisZusatz}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-blue-800">
                    Empfehlung ansehen
                    <ArrowRight size={20} aria-hidden="true" />
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-lg text-slate-700">
          <Sparkles
            size={22}
            aria-hidden="true"
            className="mr-2 inline text-amber-600"
          />
          Mehr Empfehlungen, auf Wunsch mit Einrichtung bei Ihnen zu Hause, finden
          Sie in meiner{" "}
          <Link
            href="/shop"
            className="font-bold text-blue-800 underline underline-offset-4 hover:text-blue-900"
          >
            Kaufberatung
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
