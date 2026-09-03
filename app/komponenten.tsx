import Link from "next/link";
import { Phone, HelpCircle, Mail } from "lucide-react";
import { orte, leistungen, type Frage } from "./daten";
import {
  TelefonLink,
  TelefonAnzeige,
  WhatsAppLink,
  MailLink,
  WennKeinSofortkontakt,
} from "./schutz-links";

function WhatsAppIcon({ groesse }: { groesse: number }) {
  return (
    <svg
      width={groesse}
      height={groesse}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function KopfZeile() {
  return (
    <header className="border-b-2 border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-5 py-5 sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="relative text-2xl font-bold text-slate-900 hover:text-blue-800"
        >
          <span
            aria-hidden="true"
            className="absolute -left-5 -top-2 -z-10 h-10 w-10 rounded-full bg-amber-100"
          />
          Computerhilfe mit Till
        </Link>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <WhatsAppLink
            bereich="kopfzeile"
            className="inline-flex items-center gap-3 rounded-xl bg-green-700 px-6 py-4 text-xl font-bold text-white shadow-md hover:bg-green-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            <WhatsAppIcon groesse={26} />
            WhatsApp
          </WhatsAppLink>
          <TelefonLink
            bereich="kopfzeile"
            className="inline-flex items-center gap-3 rounded-xl bg-blue-700 px-6 py-4 text-xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Phone size={26} aria-hidden="true" />
            <TelefonAnzeige />
          </TelefonLink>
          {/* Sind beide Wege aus, bliebe die Kopfzeile sonst ganz ohne
              Kontaktmöglichkeit. */}
          <WennKeinSofortkontakt>
            <MailLink
              bereich="kopfzeile"
              className="inline-flex items-center gap-3 rounded-xl bg-blue-700 px-6 py-4 text-xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <Mail size={26} aria-hidden="true" />
              E-Mail schreiben
            </MailLink>
          </WennKeinSofortkontakt>
        </div>
      </div>
    </header>
  );
}

/**
 * Sichtbarer Fragen-und-Antworten-Bereich. Die Antworten stehen bewusst
 * offen da und nicht hinter einem Aufklapper: Das ist für ältere Leserinnen
 * und Leser einfacher, und die Auszeichnung als FAQPage verlangt ohnehin,
 * dass derselbe Text auch sichtbar auf der Seite steht.
 */
export function FragenAbschnitt({
  fragen,
  titel = "Häufige Fragen",
  einleitung,
  hell = true,
}: {
  fragen: Frage[];
  titel?: string;
  einleitung?: string;
  /** false, wenn der Abschnitt auf dem grauen Seitenhintergrund stehen soll. */
  hell?: boolean;
}) {
  return (
    <section
      id="fragen"
      aria-labelledby="fragen-titel"
      className={`relative overflow-hidden px-5 py-14 sm:py-20 ${
        hell ? "bg-white" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-50"
      />
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute bottom-12 right-8 h-28 w-28"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <h2
          id="fragen-titel"
          className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
        >
          {titel}
        </h2>
        <div
          aria-hidden="true"
          className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
        />
        {einleitung ? (
          <p className="mx-auto mt-5 max-w-2xl text-center text-xl leading-relaxed text-slate-700">
            {einleitung}
          </p>
        ) : null}

        <dl className="mt-10 flex flex-col gap-5">
          {fragen.map((eintrag) => (
            <div
              key={eintrag.frage}
              className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm"
            >
              <dt className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <HelpCircle size={26} aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  {eintrag.frage}
                </h3>
              </dt>
              <dd className="mt-3 text-lg leading-relaxed text-slate-700 sm:pl-15">
                {eintrag.antwort}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function FussZeile() {
  return (
    <footer className="bg-white px-5 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-center text-lg text-slate-600">
        <p>
          © {new Date().getFullYear()} Till Wadehn – IT-Hilfe für die
          Nachbarschaft
        </p>
        <nav aria-label="Einzugsgebiet">
          <ul className="flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {orte.map((ort) => (
              <li key={ort.slug}>
                <Link
                  href={`/it-hilfe/${ort.slug}`}
                  className="underline underline-offset-4 hover:text-blue-800"
                >
                  {ort.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Angebot">
          <ul className="flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {leistungen
              .filter((leistung) => leistung.seite)
              .map((leistung) => (
                <li key={leistung.seite}>
                  <Link
                    href={leistung.seite!}
                    className="underline underline-offset-4 hover:text-blue-800"
                  >
                    {leistung.titel}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <nav aria-label="Rechtliches">
          <ul className="flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/impressum"
                className="underline underline-offset-4 hover:text-blue-800"
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                href="/datenschutz"
                className="underline underline-offset-4 hover:text-blue-800"
              >
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
