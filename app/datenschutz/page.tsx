import type { Metadata } from "next";
import { ADRESSE } from "../daten";
import { KopfZeile, FussZeile } from "../komponenten";
import { EinwilligungSteuerung } from "../einwilligung";
import {
  TelefonLink,
  TelefonAnzeige,
  MailLink,
  MailAnzeige,
} from "../schutz-links";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Computerhilfe mit Till",
  description:
    "Datenschutzerklärung von Computerhilfe mit Till, Till Wadehn aus Berlin.",
  alternates: {
    canonical: "/datenschutz",
  },
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
            <TelefonLink
              bereich="rechtliches"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              <TelefonAnzeige />
            </TelefonLink>
            <br />
            E-Mail:{" "}
            <MailLink
              bereich="rechtliches"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              <MailAnzeige />
            </MailLink>
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            2. Allgemeines zur Datenverarbeitung
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Diese Website informiert über mein Hilfsangebot und bietet eine
            Online-Terminbuchung sowie einen kleinen Shop an. Es gibt keine
            Benutzerkonten und keine Werbedienste. Personenbezogene Daten
            verarbeite ich nur, wenn Sie sie mir selbst mitteilen, etwa bei
            einer Terminanfrage oder Bestellung (siehe Abschnitt 6). Zur
            Besuchsmessung setze ich Google Analytics ein, aber nur, wenn Sie
            vorher zugestimmt haben (siehe Abschnitt 4). Ohne Ihre Zustimmung
            werden keine Cookies gesetzt und keine Daten an Dritte übertragen.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            3. Hosting und Server-Protokolle
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, USA gehostet. Beim Aufruf der Website verarbeitet der
            Hoster technisch notwendige Daten (zum Beispiel IP-Adresse, Datum
            und Uhrzeit des Aufrufs, aufgerufene Seite und Browsertyp), um die
            Website auszuliefern und die Sicherheit des Betriebs zu
            gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einem sicheren und zuverlässigen Betrieb
            der Website). Weitere Informationen finden Sie in der
            Datenschutzerklärung von Vercel:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              vercel.com/legal/privacy-policy
            </a>
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            4. Besuchsmessung mit Google Analytics
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Um zu verstehen, welche Seiten gefragt sind und wo ich mein Angebot
            verbessern kann, nutze ich Google Analytics 4, einen Dienst der
            Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
            Irland. Erfasst werden dabei zum Beispiel die aufgerufenen Seiten,
            die Verweildauer, ungefährer Standort, Gerätetyp und Browser sowie
            Klicks auf die Schaltflächen für Telefon, WhatsApp und E-Mail.
            Google Analytics kürzt Ihre IP-Adresse, bevor sie gespeichert wird.
          </p>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Dabei werden Cookies auf Ihrem Gerät gespeichert, und es können
            Daten an Server von Google übertragen werden, auch in die USA. Für
            diese Übermittlung stützt sich Google auf die
            Standardvertragsklauseln der EU-Kommission. Ein den europäischen
            Standards entsprechendes Datenschutzniveau kann für die USA nicht in
            jedem Fall garantiert werden; insbesondere ist ein Zugriff durch
            US-Behörden nicht vollständig auszuschließen.
          </p>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Rechtsgrundlage ist ausschließlich Ihre Einwilligung nach Art. 6
            Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Ohne Ihre Zustimmung wird
            Google Analytics gar nicht erst geladen. Sie können Ihre
            Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Die
            Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt davon
            unberührt. Weitere Informationen finden Sie in der{" "}
            <a
              href="https://policies.google.com/privacy"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              Datenschutzerklärung von Google
            </a>
            .
          </p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">
            Ihre Entscheidung ändern
          </h3>
          <EinwilligungSteuerung />

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            5. Kontaktaufnahme
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Wenn Sie mich per Telefon oder E-Mail kontaktieren, verwende ich
            Ihre Angaben (zum Beispiel Name, Telefonnummer, E-Mail-Adresse und
            Ihr Anliegen) ausschließlich zur Bearbeitung Ihrer Anfrage und für
            eventuelle Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
            DSGVO (Anbahnung und Durchführung eines Vertrags). Die Daten werden
            gelöscht, sobald sie für diesen Zweck nicht mehr benötigt werden und
            keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            6. Terminbuchung und Bestellungen
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Wenn Sie über die Website einen Termin anfragen oder im Shop
            bestellen, verarbeite ich die dort abgefragten Angaben (Name,
            Telefonnummer, E-Mail-Adresse, Anschrift sowie Ihr Anliegen
            beziehungsweise die bestellten Artikel) zur Abwicklung des Termins
            oder der Bestellung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
            DSGVO (Anbahnung und Durchführung eines Vertrags). Die Daten
            werden verschlüsselt und zugriffsgeschützt bei meinem Hoster
            Vercel gespeichert (siehe Abschnitt 3).
          </p>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Bei Bestellungen gebe ich Ihren Namen und Ihre Lieferanschrift an
            meinen Lieferanten und das von ihm beauftragte Versandunternehmen
            weiter, soweit das für die Zustellung erforderlich ist. Termindaten
            übernehme ich zur Organisation in meine Kundenverwaltung und
            meinen Kalender. Die Daten werden gelöscht, sobald sie für diese
            Zwecke nicht mehr benötigt werden und keine gesetzlichen
            Aufbewahrungspflichten (etwa für Rechnungen) mehr bestehen.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            7. Partnerlinks (Amazon)
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Auf den Empfehlungsseiten unter /shop verweisen mit * markierte
            Verweise auf Amazon (Amazon-Partnerprogramm; Anbieter: Amazon EU
            S.à r.l., Luxemburg). Als Amazon-Partner verdiene ich an
            qualifizierten Käufen; für Sie ändert sich der Preis dadurch
            nicht. Beim Anklicken eines solchen Verweises verlassen Sie meine
            Website. Erst auf der Amazon-Website verarbeitet Amazon Daten
            (etwa über Cookies, um Käufe meinem Partnerkonto zuzuordnen); es
            gilt dann die Datenschutzerklärung von Amazon. Solange Sie nicht
            klicken, werden durch diese Verweise keine Daten an Amazon
            übertragen, denn meine Website bindet keine Amazon-Inhalte ein.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            8. Ihre Rechte
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-slate-700">
            Sie haben das Recht auf Auskunft über die von Ihnen gespeicherten
            Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), auf
            Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art.
            18 DSGVO), auf Datenübertragbarkeit (Art. 20 DSGVO) sowie ein
            Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO). Außerdem
            haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
            beschweren. Für Berlin ist dies die Berliner Beauftragte für
            Datenschutz und Informationsfreiheit.
          </p>
        </div>
      </main>

      <FussZeile />
    </>
  );
}
