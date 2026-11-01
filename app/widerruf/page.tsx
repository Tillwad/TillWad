import type { Metadata } from "next";
import { ADRESSE } from "../daten";
import { KopfZeile, FussZeile } from "../komponenten";
import {
  MailAnzeige,
  MailLink,
  TelefonAnzeige,
  TelefonLink,
} from "../schutz-links";
import { VERKAUFSMODUS } from "../shop/konfiguration";

// ENTWURF: Die Belehrung folgt dem gesetzlichen Muster (Anlage 1 zu Art. 246a
// EGBGB), sollte aber wie die AGB vor dem Freischalten des Shops fachlich
// geprüft werden.

export const metadata: Metadata = {
  title: "Widerrufsbelehrung | Computerhilfe mit Till",
  description:
    "Widerrufsbelehrung und Muster-Widerrufsformular für Bestellungen im Shop von Computerhilfe mit Till.",
  alternates: {
    canonical: "/widerruf",
  },
  robots:
    VERKAUFSMODUS === "shop" ? undefined : { index: false, follow: false },
};

const UEBERSCHRIFT = "mt-10 text-2xl font-bold text-slate-900";
const ABSATZ = "mt-4 text-xl leading-relaxed text-slate-700";

function Anschrift() {
  return (
    <>
      Till Wadehn, Computerhilfe mit Till, {ADRESSE[0]}, {ADRESSE[1]},
      Telefon:{" "}
      <TelefonLink
        bereich="rechtliches"
        className="font-bold text-blue-800 underline underline-offset-4"
      >
        <TelefonAnzeige />
      </TelefonLink>
      , E-Mail:{" "}
      <MailLink
        bereich="rechtliches"
        className="font-bold text-blue-800 underline underline-offset-4"
      >
        <MailAnzeige />
      </MailLink>
    </>
  );
}

export default function Widerruf() {
  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50 px-5 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Widerrufsbelehrung
          </h1>
          <div
            aria-hidden="true"
            className="mt-4 h-2 w-28 rounded-full bg-amber-400"
          />

          <h2 className={UEBERSCHRIFT}>Widerrufsrecht</h2>
          <p className={ABSATZ}>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
            diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn
            Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter,
            der nicht der Beförderer ist, die Waren in Besitz genommen haben
            beziehungsweise hat.
          </p>
          <p className={ABSATZ}>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie mir (<Anschrift />)
            mittels einer eindeutigen Erklärung (zum Beispiel ein mit der Post
            versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen
            Vertrag zu widerrufen, informieren. Sie können dafür das
            beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht
            vorgeschrieben ist.
          </p>
          <p className={ABSATZ}>
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
            Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
            Widerrufsfrist absenden.
          </p>

          <h2 className={UEBERSCHRIFT}>Folgen des Widerrufs</h2>
          <p className={ABSATZ}>
            Wenn Sie diesen Vertrag widerrufen, habe ich Ihnen alle Zahlungen,
            die ich von Ihnen erhalten habe, einschließlich der Lieferkosten
            (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben,
            dass Sie eine andere Art der Lieferung als die von mir angebotene,
            günstigste Standardlieferung gewählt haben), unverzüglich und
            spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem
            die Mitteilung über Ihren Widerruf dieses Vertrags bei mir
            eingegangen ist. Für diese Rückzahlung verwende ich dasselbe
            Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
            eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas
            anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
            Rückzahlung Entgelte berechnet.
          </p>
          <p className={ABSATZ}>
            Ich kann die Rückzahlung verweigern, bis ich die Waren wieder
            zurückerhalten habe oder bis Sie den Nachweis erbracht haben, dass
            Sie die Waren zurückgesandt haben, je nachdem, welches der frühere
            Zeitpunkt ist.
          </p>
          <p className={ABSATZ}>
            Sie haben die Waren unverzüglich und in jedem Fall spätestens
            binnen vierzehn Tagen ab dem Tag, an dem Sie mich über den
            Widerruf dieses Vertrags unterrichten, an mich zurückzusenden oder
            zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf
            der Frist von vierzehn Tagen absenden. Sie tragen die unmittelbaren
            Kosten der Rücksendung der Waren.
          </p>
          <p className={ABSATZ}>
            Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen,
            wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit,
            Eigenschaften und Funktionsweise der Waren nicht notwendigen
            Umgang mit ihnen zurückzuführen ist.
          </p>

          <h2 className={UEBERSCHRIFT}>
            Hinweis zu Software und Lizenzschlüsseln
          </h2>
          <p className={ABSATZ}>
            Bei versiegelter Software erlischt das Widerrufsrecht, wenn die
            Versiegelung nach der Lieferung entfernt wurde.
          </p>

          <h2 className={UEBERSCHRIFT}>Muster-Widerrufsformular</h2>
          <p className={ABSATZ}>
            Wenn Sie den Vertrag widerrufen wollen, können Sie diesen Text
            kopieren, ausfüllen und an mich zurücksenden, per Brief oder
            E-Mail an die oben genannte Adresse:
          </p>
          <blockquote className="mt-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 text-lg leading-relaxed text-slate-700">
            <p>
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
              abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)
            </p>
            <p className="mt-3">Bestellt am (*) / erhalten am (*):</p>
            <p className="mt-3">Name des/der Verbraucher(s):</p>
            <p className="mt-3">Anschrift des/der Verbraucher(s):</p>
            <p className="mt-3">
              Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf
              Papier):
            </p>
            <p className="mt-3">Datum:</p>
            <p className="mt-3">(*) Unzutreffendes streichen.</p>
          </blockquote>
        </div>
      </main>

      <FussZeile />
    </>
  );
}
