import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Sparkles, Truck } from "lucide-react";
import { KopfZeile, FussZeile } from "../../komponenten";
import { zeitstempelErzeugen } from "../../termin/schutz";
import {
  LIEFERZEIT,
  UST_HINWEIS,
  VERKAUFSMODUS,
  preisAnzeigen,
  versandBerechnen,
} from "../konfiguration";
import { kategorieFinden, produkte, produktFinden } from "../produkte";
import { BestellFormular } from "../bestellformular";
import { KaufWege } from "../kaufwege";

// Der Zeitstempel für den Bot-Schutz (nur im "shop"-Modus gebraucht) muss
// frisch sein; eine beim Bauen eingefrorene Seite wäre nach sechs Stunden
// nicht mehr abschickbar.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return produkte.map((produkt) => ({ slug: produkt.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produkt = produktFinden(slug);
  if (!produkt) {
    return {};
  }
  return {
    title: `${produkt.name} | Computerhilfe mit Till`,
    description: produkt.idealFuer,
    alternates: {
      canonical: `/shop/${produkt.slug}`,
    },
  };
}

export default async function Produktseite({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produkt = produktFinden(slug);
  if (!produkt) {
    notFound();
  }
  const kategorie = kategorieFinden(produkt.kategorie);
  const versandEuro = versandBerechnen(produkt.preisEuro);
  const lieferzeit = produkt.lieferzeit ?? LIEFERZEIT;

  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50 px-5 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-lg font-semibold text-blue-800 underline underline-offset-4 hover:text-blue-900"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            Zurück zum Shop
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {kategorie ? (
              <span
                className={`rounded-full px-4 py-1 text-base font-semibold ${kategorie.farbe}`}
              >
                {kategorie.titel}
              </span>
            ) : null}
            {produkt.preisklasse ? (
              <span className="rounded-full bg-slate-200 px-4 py-1 text-base font-semibold text-slate-700">
                {produkt.preisklasse}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            {produkt.name}
          </h1>
          <div
            aria-hidden="true"
            className="mt-4 h-2 w-28 rounded-full bg-amber-400"
          />

          {produkt.bild ? (
            <div className="relative mt-8 h-72 w-full rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm sm:h-96">
              <Image
                src={produkt.bild}
                alt={produkt.bildAlt ?? produkt.name}
                fill
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-contain p-4"
                priority
              />
            </div>
          ) : null}

          <p className="mt-6 text-3xl font-bold text-blue-800">
            {VERKAUFSMODUS === "affiliate" ? "ca. " : ""}
            {preisAnzeigen(produkt.preisEuro)}
            {produkt.preisZusatz ? (
              <span className="ml-2 text-xl font-normal text-slate-600">
                {produkt.preisZusatz}
              </span>
            ) : null}
          </p>
          {VERKAUFSMODUS === "affiliate" ? (
            <p className="mt-2 text-base text-slate-600">
              Ungefährer Marktpreis zur Orientierung. Den tagesaktuellen
              Preis sehen Sie beim Händler.
            </p>
          ) : (
            <p className="mt-2 text-base text-slate-600">
              {UST_HINWEIS} Zuzüglich Versand
              {versandEuro === 0 ? " (bei diesem Gerät kostenlos)" : ""}.
            </p>
          )}

          {/* Die persönliche Empfehlung – das Herzstück jeder Produktseite. */}
          <p className="mt-6 flex items-start gap-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-xl leading-relaxed text-slate-900">
            <Sparkles
              size={28}
              aria-hidden="true"
              className="mt-1 shrink-0 text-amber-700"
            />
            <span>
              <strong className="font-bold">Meine Empfehlung:</strong>{" "}
              {produkt.idealFuer}
            </span>
          </p>

          <p className="mt-6 text-xl leading-relaxed text-slate-700">
            {produkt.beschreibung}
          </p>

          <ul className="mt-6 flex list-none flex-col gap-3 rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
            {produkt.merkmale.map((merkmal) => (
              <li key={merkmal} className="flex items-start gap-3">
                <CheckCircle2
                  size={26}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-green-600"
                />
                <span className="text-lg leading-relaxed text-slate-800">
                  {merkmal}
                </span>
              </li>
            ))}
          </ul>

          {VERKAUFSMODUS === "affiliate" ? (
            <KaufWege produkt={produkt} />
          ) : (
            <>
              <p className="mt-6 flex items-start gap-3 text-lg leading-relaxed text-slate-700">
                <Truck
                  size={24}
                  aria-hidden="true"
                  className="mt-1 shrink-0"
                />
                <span>
                  Lieferzeit: {lieferzeit}. Geliefert wird bequem zu Ihnen
                  nach Hause.
                </span>
              </p>

              <h2 className="mt-12 text-3xl font-bold text-slate-900">
                Jetzt bestellen
              </h2>
              <div className="mt-6">
                <BestellFormular
                  produktSlug={produkt.slug}
                  produktName={produkt.name}
                  preisEuro={produkt.preisEuro}
                  preisZusatz={produkt.preisZusatz}
                  einrichtung={produkt.einrichtung}
                  versandEuro={versandEuro}
                  lieferzeit={lieferzeit}
                  zeitstempel={zeitstempelErzeugen()}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <FussZeile />
    </>
  );
}
