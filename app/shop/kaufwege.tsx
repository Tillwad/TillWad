import Link from "next/link";
import {
  CalendarCheck,
  Car,
  ExternalLink,
  Phone,
  Wrench,
} from "lucide-react";
import {
  TelefonAnzeige,
  TelefonLink,
  WennTelefonSichtbar,
} from "../schutz-links";
import {
  AFFILIATE_HINWEIS,
  amazonLink,
  preisAnzeigen,
} from "./konfiguration";
import type { Produkt } from "./produkte";

/**
 * Der Affiliate-Teil der Produktseite: Wie der Kunde an das Gerät kommt
 * (Amazon-Partnerlink oder "Ich bringe es mit") und die buchbare Einrichtung.
 * Ersetzt im Affiliate-Modus das Bestellformular, siehe VERKAUFSMODUS in
 * konfiguration.ts.
 */
export function KaufWege({ produkt }: { produkt: Produkt }) {
  return (
    <>
      <h2 className="mt-12 text-3xl font-bold text-slate-900">
        So kommen Sie an das Gerät
      </h2>

      <div className="mt-6 flex flex-col gap-6">
        {produkt.amazonSuche ? (
          <section className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              Selbst bestellen
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Sie können das Gerät bequem selbst bestellen, zum Beispiel bei
              Amazon. Dort sehen Sie auch den tagesaktuellen Preis.
            </p>
            <a
              href={amazonLink(produkt.amazonSuche)}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="mt-5 inline-flex items-center gap-3 rounded-xl bg-blue-700 px-7 py-4 text-xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <ExternalLink size={24} aria-hidden="true" />
              Bei Amazon ansehen*
            </a>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              * {AFFILIATE_HINWEIS}
            </p>
          </section>
        ) : null}

        <section className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
            <Car size={28} aria-hidden="true" className="text-blue-700" />
            Oder: Ich bringe es mit
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">
            Sie möchten nicht online bestellen? Kein Problem. In meinem
            Einzugsgebiet im Berliner Südwesten besorge ich das Gerät für Sie
            und bringe es zum Termin einfach mit. Bezahlt wird erst bei der
            Übergabe, vorher kostet Sie das keinen Cent.
          </p>
          <WennTelefonSichtbar>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Rufen Sie mich einfach an:{" "}
              <TelefonLink
                bereich="shop"
                className="font-bold text-blue-800 underline underline-offset-4"
              >
                <TelefonAnzeige />
              </TelefonLink>
            </p>
          </WennTelefonSichtbar>
        </section>

        {produkt.einrichtung ? (
          <section className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-7">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
              <Wrench size={28} aria-hidden="true" className="text-amber-700" />
              {produkt.einrichtung.titel} für{" "}
              {preisAnzeigen(produkt.einrichtung.preisEuro)}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              {produkt.einrichtung.beschreibung} Das Angebot gilt in meinem
              Einzugsgebiet im Berliner Südwesten, ganz gleich, wo Sie das Gerät
              gekauft haben.
            </p>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/termin"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-amber-600 px-7 py-4 text-xl font-bold text-white shadow-md hover:bg-amber-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <CalendarCheck size={24} aria-hidden="true" />
                Einrichtung online buchen
              </Link>
              <WennTelefonSichtbar>
                <TelefonLink
                  bereich="shop"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-slate-400 bg-white px-7 py-4 text-xl font-bold text-slate-900 hover:border-blue-700 hover:text-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <Phone size={24} aria-hidden="true" />
                  Lieber anrufen
                </TelefonLink>
              </WennTelefonSichtbar>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
