import type { Metadata } from "next";
import Link from "next/link";
import { ADRESSE } from "../daten";
import { KopfZeile, FussZeile } from "../komponenten";
import {
  MailAnzeige,
  MailLink,
  TelefonAnzeige,
  TelefonLink,
} from "../schutz-links";
import {
  LIEFERZEIT,
  VERKAUFSMODUS,
  VERSAND_EURO,
  VERSANDFREI_AB_EURO,
  preisAnzeigen,
} from "../shop/konfiguration";

// ENTWURF: Diese AGB braucht nur der Direktverkauf (VERKAUFSMODUS "shop").
// Im Affiliate-Modus ist die Seite unverlinkt und auf noindex. Vor einer
// Reaktivierung des Verkaufs fachlich prüfen lassen, etwa durch geprüfte
// Mustertexte von Händlerbund oder IT-Recht Kanzlei.

export const metadata: Metadata = {
  title: "AGB | Computerhilfe mit Till",
  description:
    "Allgemeine Geschäftsbedingungen für Bestellungen im Shop von Computerhilfe mit Till.",
  alternates: {
    canonical: "/agb",
  },
  robots:
    VERKAUFSMODUS === "shop" ? undefined : { index: false, follow: false },
};

const UEBERSCHRIFT = "mt-10 text-2xl font-bold text-slate-900";
const ABSATZ = "mt-4 text-xl leading-relaxed text-slate-700";

export default function Agb() {
  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50 px-5 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Allgemeine Geschäftsbedingungen
          </h1>
          <div
            aria-hidden="true"
            className="mt-4 h-2 w-28 rounded-full bg-amber-400"
          />

          <h2 className={UEBERSCHRIFT}>1. Geltungsbereich und Anbieter</h2>
          <p className={ABSATZ}>
            Diese Geschäftsbedingungen gelten für alle Bestellungen über den
            Shop auf dieser Website. Anbieter ist:
            <br />
            Till Wadehn, Computerhilfe mit Till
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
          <p className={ABSATZ}>
            Das Angebot richtet sich an Verbraucherinnen und Verbraucher mit
            Lieferadresse in Deutschland.
          </p>

          <h2 className={UEBERSCHRIFT}>2. Vertragsschluss</h2>
          <p className={ABSATZ}>
            Die Darstellung der Produkte im Shop ist kein rechtlich bindendes
            Angebot, sondern eine Aufforderung zur Bestellung. Mit dem Klick
            auf „Zahlungspflichtig bestellen“ geben Sie eine verbindliche
            Bestellung ab. Der Kaufvertrag kommt zustande, wenn ich Ihre
            Bestellung per E-Mail bestätige, spätestens jedoch mit der
            Lieferung der Ware. Den Eingang Ihrer Bestellung bestätige ich
            Ihnen unverzüglich per E-Mail; diese Eingangsbestätigung ist noch
            keine Annahme.
          </p>

          <h2 className={UEBERSCHRIFT}>3. Preise und Bezahlung</h2>
          <p className={ABSATZ}>
            Alle Preise sind Endpreise. Als Kleinunternehmer im Sinne von § 19
            UStG berechne ich keine Umsatzsteuer und weise sie deshalb auch
            nicht aus. Zusätzlich fallen Versandkosten von{" "}
            {preisAnzeigen(VERSAND_EURO)} je Bestellung an; ab einem
            Bestellwert von {preisAnzeigen(VERSANDFREI_AB_EURO)} liefere ich
            versandkostenfrei.
          </p>
          <p className={ABSATZ}>
            Bezahlt wird per Überweisung nach Erhalt der Rechnung („Kauf auf
            Rechnung“). Die Rechnung erhalten Sie per E-Mail oder mit der
            Lieferung; der Rechnungsbetrag ist innerhalb von 14 Tagen nach
            Erhalt fällig.
          </p>

          <h2 className={UEBERSCHRIFT}>4. Lieferung</h2>
          <p className={ABSATZ}>
            Die Lieferung erfolgt an Ihre Lieferadresse in Deutschland,
            üblicherweise innerhalb von {LIEFERZEIT} nach der
            Bestellbestätigung. Ich beziehe die Ware über einen
            Fachgroßhändler und verschicke sie an Sie beziehungsweise bringe
            sie im Einzugsgebiet auf Wunsch persönlich vorbei; in Einzelfällen
            verschickt der Großhändler in meinem Auftrag direkt an Sie.
            Sollte ein Artikel wider Erwarten nicht
            lieferbar sein, informiere ich Sie umgehend; in diesem Fall kommt
            kein Vertrag zustande beziehungsweise bereits gezahlte Beträge
            werden sofort erstattet.
          </p>

          <h2 className={UEBERSCHRIFT}>5. Eigentumsvorbehalt</h2>
          <p className={ABSATZ}>
            Die Ware bleibt bis zur vollständigen Bezahlung mein Eigentum.
          </p>

          <h2 className={UEBERSCHRIFT}>6. Widerrufsrecht</h2>
          <p className={ABSATZ}>
            Als Verbraucherin oder Verbraucher haben Sie ein vierzehntägiges
            Widerrufsrecht. Einzelheiten stehen in der{" "}
            <Link
              href="/widerruf"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              Widerrufsbelehrung
            </Link>
            .
          </p>

          <h2 className={UEBERSCHRIFT}>7. Gewährleistung</h2>
          <p className={ABSATZ}>
            Es gilt das gesetzliche Mängelhaftungsrecht: Bei neuen Geräten
            haben Sie zwei Jahre Gewährleistung ab Lieferung. Ist ein Gerät
            mangelhaft, wenden Sie sich einfach direkt an mich. Ich kümmere
            mich um Reparatur, Austausch oder Erstattung und Sie müssen sich
            nicht mit Herstellern oder Hotlines herumschlagen. Daneben
            bestehende Herstellergarantien bleiben unberührt.
          </p>

          <h2 className={UEBERSCHRIFT}>8. Altgeräte und Batterien</h2>
          <p className={ABSATZ}>
            Elektrogeräte gehören nicht in den Hausmüll. Darauf weist das
            Symbol der durchgestrichenen Mülltonne hin. Sie können Altgeräte
            kostenlos bei den kommunalen Sammelstellen abgeben, in Berlin zum
            Beispiel auf den BSR-Recyclinghöfen; auch große Elektrohändler
            nehmen Altgeräte kostenlos zurück. Dasselbe gilt für Batterien und
            Akkus: Sie können sie überall dort kostenlos abgeben, wo Batterien
            verkauft werden. Bitte löschen Sie vor der Abgabe eines Geräts
            Ihre persönlichen Daten, auf Wunsch helfe ich Ihnen dabei.
          </p>

          <h2 className={UEBERSCHRIFT}>9. Streitbeilegung</h2>
          <p className={ABSATZ}>
            Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle bin ich nicht verpflichtet und nicht
            bereit. Sprechen Sie mich bei Problemen aber jederzeit direkt an,
            gemeinsam findet sich fast immer eine Lösung.
          </p>

          <h2 className={UEBERSCHRIFT}>10. Schlussbestimmungen</h2>
          <p className={ABSATZ}>
            Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts; die
            gesetzlichen Verbraucherschutzvorschriften Ihres gewöhnlichen
            Aufenthalts bleiben unberührt. Sollten einzelne Bestimmungen
            dieser AGB unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
          </p>
        </div>
      </main>

      <FussZeile />
    </>
  );
}
