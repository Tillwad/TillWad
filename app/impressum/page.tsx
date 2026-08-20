import type { Metadata } from "next";
import { ADRESSE } from "../daten";
import { KopfZeile, FussZeile } from "../komponenten";
import {
  TelefonLink,
  TelefonAnzeige,
  MailLink,
  MailAnzeige,
} from "../schutz-links";

export const metadata: Metadata = {
  title: "Impressum – IT-Hilfe von Till",
  description: "Impressum und Anbieterkennzeichnung der IT-Hilfe von Till Wadehn.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function Impressum() {
  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50 px-5 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">Impressum</h1>
          <div
            aria-hidden="true"
            className="mt-4 h-2 w-28 rounded-full bg-amber-400"
          />

          <h2 className="mt-10 text-2xl font-bold text-slate-900">Anbieter</h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Till Wadehn
            <br />
            {ADRESSE[0]}
            <br />
            {ADRESSE[1]}
            <br />
            Deutschland
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">Kontakt</h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Telefon:{" "}
            <TelefonLink className="font-bold text-blue-800 underline underline-offset-4">
              <TelefonAnzeige />
            </TelefonLink>
            <br />
            E-Mail:{" "}
            <MailLink className="font-bold text-blue-800 underline underline-offset-4">
              <MailAnzeige />
            </MailLink>
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Umsatzsteuer-ID
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            USt-IdNr. gemäß § 19 Umsatzsteuergesetz: Umsatzsteuerbefreit
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Verantwortlich für den Inhalt
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Till Wadehn
            <br />
            {ADRESSE[0]}
            <br />
            {ADRESSE[1]}
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            Hinweis auf EU-Streitschlichtung
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              ec.europa.eu/consumers/odr
            </a>
            <br />
            Meine E-Mail-Adresse finden Sie oben im Impressum. Ich bin nicht
            verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </main>

      <FussZeile />
    </>
  );
}
