import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  Tv,
  Cable,
  ListOrdered,
  PlayCircle,
  Images,
  Settings2,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { SITE_URL, fernseherFragen, orte } from "../daten";
import { KopfZeile, FussZeile, FragenAbschnitt } from "../komponenten";
import { FragenDaten } from "../strukturierte-daten";
import {
  TelefonLink,
  TelefonAnzeige,
  MailLink,
  WennTelefonSichtbar,
  WennTelefonNichtSichtbar,
} from "../schutz-links";

export const metadata: Metadata = {
  title: "Fernseher & Smart-TV einrichten lassen in Berlin",
  description:
    "Fernseher anschließen, Sender sortieren, Mediatheken und Streaming einrichten – bei Ihnen zu Hause im Berliner Südwesten. In Ruhe erklärt. Jetzt anrufen.",
  alternates: {
    canonical: "/fernseher-hilfe",
  },
};

const anliegen = [
  {
    icon: Cable,
    farbe: "bg-rose-100 text-rose-700",
    titel: "Neuen Fernseher anschließen",
    beschreibung:
      "Aufstellen, anschließen, mit dem WLAN verbinden und die Ersteinrichtung übernehmen – bis das erste Bild da ist und Sie zufrieden sind.",
  },
  {
    icon: ListOrdered,
    farbe: "bg-blue-100 text-blue-700",
    titel: "Sender sortieren",
    beschreibung:
      "Ihre Lieblingssender kommen nach vorne, in eine Reihenfolge, die für Sie Sinn ergibt. Nicht die, die der Fernseher sich ausgedacht hat.",
  },
  {
    icon: Settings2,
    farbe: "bg-amber-100 text-amber-700",
    titel: "Nur noch eine Fernbedienung",
    beschreibung:
      "Meistens lassen sich Fernseher, Receiver und Lautstärke über ein einziges Gerät steuern. Auf Wunsch beschrifte ich die Tasten, die Sie wirklich brauchen.",
  },
  {
    icon: PlayCircle,
    farbe: "bg-green-100 text-green-700",
    titel: "Mediatheken einrichten",
    beschreibung:
      "ARD, ZDF und die Dritten sind kostenlos und schon mit Ihrem Rundfunkbeitrag bezahlt. Ich lege sie an eine Stelle, an der Sie sie wiederfinden.",
  },
  {
    icon: Tv,
    farbe: "bg-violet-100 text-violet-700",
    titel: "Streaming verständlich erklärt",
    beschreibung:
      "Was ein Abo kostet, was es bringt und wie Sie es wieder kündigen. Wenn Sie eines möchten, richte ich es ein – wenn nicht, ist das auch gut.",
  },
  {
    icon: Images,
    farbe: "bg-sky-100 text-sky-700",
    titel: "Fotos vom Handy auf den Fernseher",
    beschreibung:
      "Die Urlaubsbilder groß im Wohnzimmer, ohne Kabel. Wir üben es einmal gemeinsam, damit Sie es beim nächsten Besuch selbst vorführen können.",
  },
];

export default function FernseherHilfe() {
  return (
    <>
      <FragenDaten
        fragen={fernseherFragen}
        seitenUrl={`${SITE_URL}/fernseher-hilfe`}
      />

      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50">
        {/* Einstieg */}
        <section
          aria-labelledby="einstieg-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-50"
          />
          <div
            aria-hidden="true"
            className="dot-grid pointer-events-none absolute right-8 top-10 h-28 w-28"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose-100 text-rose-700">
              <Tv size={48} aria-hidden="true" />
            </span>
            <h1
              id="einstieg-titel"
              className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            >
              Fernseher und Smart-TV einrichten lassen
            </h1>
            <div
              aria-hidden="true"
              className="mx-auto mt-5 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-6 text-xl leading-relaxed text-slate-700 sm:text-2xl">
              Ein neuer Fernseher kann viel – nur erklärt einem das niemand. Ich
              schließe ihn an, sortiere die Sender, richte die Mediatheken ein
              und zeige Ihnen die Bedienung so lange, bis sie sitzt. Bei Ihnen
              zu Hause im Berliner Südwesten.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TelefonLink
                bereich="hero"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-8 py-5 text-2xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
              >
                <Phone size={28} aria-hidden="true" />
                Jetzt anrufen
              </TelefonLink>
              <MailLink
                bereich="hero"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-400 bg-white px-8 py-5 text-2xl font-bold text-slate-900 hover:border-blue-700 hover:text-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
              >
                <Mail size={28} aria-hidden="true" />
                E-Mail schreiben
              </MailLink>
            </div>
          </div>
        </section>

        {/* Wobei ich helfe */}
        <section
          aria-labelledby="anliegen-titel"
          className="relative overflow-hidden px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border-[14px] border-blue-100/70"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <h2
              id="anliegen-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Damit helfe ich Ihnen beim Fernseher
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {anliegen.map((eintrag) => (
                <li
                  key={eintrag.titel}
                  className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm"
                >
                  <span
                    className={`inline-flex h-20 w-20 items-center justify-center rounded-full ${eintrag.farbe}`}
                  >
                    <eintrag.icon size={40} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {eintrag.titel}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-slate-700">
                    {eintrag.beschreibung}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Was Streaming wirklich kostet */}
        <section
          aria-labelledby="streaming-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-amber-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <h2
              id="streaming-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Streaming – erst verstehen, dann entscheiden
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <p className="mt-8 text-xl leading-relaxed text-slate-700">
              Auf neuen Fernsehern prangen überall bunte Knöpfe für Netflix und
              ähnliche Dienste. Was dabei gerne untergeht: Das sind Abonnements,
              die jeden Monat Geld kosten – und ein einmal abgeschlossenes Abo
              läuft weiter, auch wenn man es kaum nutzt.
            </p>
            <p className="mt-4 text-xl leading-relaxed text-slate-700">
              Deshalb fange ich immer bei den Mediatheken an. ARD, ZDF und die
              dritten Programme bieten sehr viel, kosten nichts extra und sind
              mit Ihrem Rundfunkbeitrag längst bezahlt. Für viele reicht das
              vollkommen. Wenn Sie darüber hinaus ein Abo möchten, richte ich es
              gerne ein – aber erst, nachdem Sie wissen, was es kostet und wie
              Sie es wieder loswerden. Ich verdiene an keinem dieser Dienste
              etwas und habe deshalb keinen Grund, Ihnen eines aufzuschwatzen.
            </p>

            <ul className="mt-8 flex list-none flex-col gap-4">
              {[
                "Zuerst das Kostenlose: Mediatheken der öffentlich-rechtlichen Sender",
                "Ich sage Ihnen, was ein Abo im Monat kostet – und wie man kündigt",
                "Ich bekomme von keinem Anbieter Geld für eine Empfehlung",
              ].map((punkt) => (
                <li key={punkt} className="flex items-start gap-4">
                  <CheckCircle2
                    size={32}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-green-600"
                  />
                  <span className="text-xl leading-relaxed text-slate-800">
                    {punkt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Fragen */}
        <FragenAbschnitt
          fragen={fernseherFragen}
          titel="Häufige Fragen zum Fernseher"
          einleitung="Ist Ihre Frage nicht dabei? Rufen Sie mich einfach an – vieles lässt sich schon am Telefon klären."
          hell={false}
        />

        {/* Wellen-Übergang zum Kontaktbereich */}
        <div aria-hidden="true" className="bg-slate-50">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="block h-14 w-full text-blue-700 sm:h-20"
          >
            <path
              fill="currentColor"
              d="M0,64 C240,96 480,16 720,32 C960,48 1200,80 1440,48 L1440,90 L0,90 Z"
            />
          </svg>
        </div>

        {/* Kontakt */}
        <section
          aria-labelledby="kontakt-titel"
          className="relative overflow-hidden bg-blue-700 px-5 pb-14 pt-6 text-white sm:pb-20 sm:pt-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
            <h2 id="kontakt-titel" className="text-3xl font-bold sm:text-4xl">
              <WennTelefonSichtbar>
                Fernseher macht Ärger? Rufen Sie an
              </WennTelefonSichtbar>
              <WennTelefonNichtSichtbar>
                Fernseher macht Ärger? Schreiben Sie mir
              </WennTelefonNichtSichtbar>
            </h2>
            <WennTelefonSichtbar>
              <p className="text-xl leading-relaxed sm:text-2xl">
                Sagen Sie mir kurz, was auf dem Bildschirm steht – das ist oft
                schon der halbe Weg zur Lösung.
              </p>
            </WennTelefonSichtbar>
            <TelefonLink
              bereich="kontakt"
              className="inline-flex items-center gap-4 rounded-xl bg-white px-8 py-5 text-2xl font-bold text-blue-800 shadow-md hover:bg-blue-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-3xl"
            >
              <Phone size={32} aria-hidden="true" />
              <TelefonAnzeige />
            </TelefonLink>
            <WennTelefonNichtSichtbar>
              <MailLink
                bereich="kontakt"
                className="inline-flex items-center gap-4 rounded-xl bg-white px-8 py-5 text-2xl font-bold text-blue-800 shadow-md hover:bg-blue-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail size={30} aria-hidden="true" />
                E-Mail schreiben
              </MailLink>
            </WennTelefonNichtSichtbar>
          </div>
        </section>

        {/* Einzugsgebiet */}
        <section aria-labelledby="gebiet-titel" className="px-5 py-14 sm:py-16">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h2
              id="gebiet-titel"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Fernseher-Hilfe in Ihrer Nähe
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-slate-700">
              Ich komme zu Ihnen nach Hause – in diesen Orten ist die Anfahrt
              für Sie kostenlos:
            </p>
            <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-4">
              {orte.map((ort) => (
                <li key={ort.slug}>
                  <Link
                    href={`/it-hilfe/${ort.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-5 py-3 text-lg font-semibold text-slate-800 hover:border-blue-700 hover:text-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <MapPin
                      size={20}
                      aria-hidden="true"
                      className="text-blue-700"
                    />
                    {ort.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <FussZeile />
    </>
  );
}
