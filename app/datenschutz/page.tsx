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
  title: "Datenschutzerklärung – IT-Hilfe von Till",
  description: "Datenschutzerklärung der Website IT-Hilfe von Till Wadehn.",
};

export default function Datenschutz() {
  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50 px-5 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Datenschutzerklärung
          </h1>
          <div
            aria-hidden="true"
            className="mt-4 h-2 w-28 rounded-full bg-amber-400"
          />

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            1. Verantwortlicher
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            Till Wadehn
            <br />
            {ADRESSE[0]}
            <br />
            {ADRESSE[1]}
            <br />
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
            2. Allgemeines zur Datenverarbeitung
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Diese Website dient ausschließlich der Information über mein
            Hilfsangebot. Sie verwendet keine Cookies, keine
            Analyse-Werkzeuge und keine Werbedienste. Es gibt keine
            Kontaktformulare und keine Benutzerkonten.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            3. Hosting und Server-Protokolle
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, USA gehostet. Beim Aufruf der Website
            verarbeitet der Hoster technisch notwendige Daten (zum Beispiel
            IP-Adresse, Datum und Uhrzeit des Aufrufs, aufgerufene Seite und
            Browsertyp), um die Website auszuliefern und die Sicherheit des
            Betriebs zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse an einem sicheren und
            zuverlässigen Betrieb der Website). Weitere Informationen finden
            Sie in der Datenschutzerklärung von Vercel:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              vercel.com/legal/privacy-policy
            </a>
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            4. Kontaktaufnahme
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Wenn Sie mich per Telefon oder E-Mail kontaktieren, verwende ich
            Ihre Angaben (zum Beispiel Name, Telefonnummer, E-Mail-Adresse
            und Ihr Anliegen) ausschließlich zur Bearbeitung Ihrer Anfrage
            und für eventuelle Anschlussfragen. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. b DSGVO (Anbahnung und Durchführung eines
            Vertrags). Die Daten werden gelöscht, sobald sie für diesen
            Zweck nicht mehr benötigt werden und keine gesetzlichen
            Aufbewahrungspflichten bestehen.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            5. Ihre Rechte
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Sie haben das Recht auf Auskunft über die von Ihnen
            gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16
            DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der
            Verarbeitung (Art. 18 DSGVO), auf Datenübertragbarkeit (Art. 20
            DSGVO) sowie ein Widerspruchsrecht gegen die Verarbeitung
            (Art. 21 DSGVO). Außerdem haben Sie das Recht, sich bei einer
            Datenschutz-Aufsichtsbehörde zu beschweren. Für Berlin ist dies
            die Berliner Beauftragte für Datenschutz und
            Informationsfreiheit.
          </p>
        </div>
      </main>

      <FussZeile />
    </>
  );
}
