import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  Printer,
  Wifi,
  Smartphone,
  ScanLine,
  Droplets,
  PackageOpen,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { SITE_URL, druckerFragen, orte } from "../daten";
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
  // Ohne "| Till Wadehn": Mit Namen wären es 63 Zeichen, und Google zeigt nur
  // rund 60. Diese Seite soll eine konkrete Suchanfrage einfangen, nicht die
  // Marke tragen – die steht auf der Startseite.
  title: "Drucker anschließen & einrichten lassen in Berlin",
  description:
    "Drucker anschließen, einrichten und wieder zum Laufen bringen – bei Ihnen zu Hause im Berliner Südwesten. Auch Drucken vom Handy. Jetzt anrufen.",
  alternates: {
    canonical: "/drucker-hilfe",
  },
};

const anliegen = [
  {
    icon: PackageOpen,
    farbe: "bg-blue-100 text-blue-700",
    titel: "Neuen Drucker anschließen",
    beschreibung:
      "Auspacken, aufstellen, mit Strom und Computer verbinden, Patronen einsetzen und eine Testseite drucken. Die Verpackung nehme ich auf Wunsch gleich mit.",
  },
  {
    icon: Wifi,
    farbe: "bg-sky-100 text-sky-700",
    titel: "Drucker mit dem WLAN verbinden",
    beschreibung:
      "Damit Sie aus jedem Zimmer drucken können, ohne ein Kabel zu ziehen. Auch dann, wenn der Drucker nach einem Router-Wechsel plötzlich nicht mehr gefunden wird.",
  },
  {
    icon: Smartphone,
    farbe: "bg-amber-100 text-amber-700",
    titel: "Vom Handy und Tablet drucken",
    beschreibung:
      "Ein Foto oder ein Brief direkt vom iPhone, iPad oder Android-Gerät aufs Papier – eingerichtet und in Ruhe erklärt, bis es sitzt.",
  },
  {
    icon: ScanLine,
    farbe: "bg-violet-100 text-violet-700",
    titel: "Scannen und kopieren einrichten",
    beschreibung:
      "Dokumente einscannen und als Datei am Computer haben, etwa für Formulare oder Anträge. Ich richte den Weg vom Papier zur Datei ein.",
  },
  {
    icon: Droplets,
    farbe: "bg-rose-100 text-rose-700",
    titel: "Streifen, blasse Farben, leere Seiten",
    beschreibung:
      "Druckköpfe reinigen, Patronen prüfen und Sie so einweisen, dass Sie kleinere Aussetzer künftig selbst beheben können.",
  },
  {
    icon: Printer,
    farbe: "bg-green-100 text-green-700",
    titel: "Drucker wird nicht mehr gefunden",
    beschreibung:
      "Nach einem Windows-Update, einem neuen Computer oder einem neuen Router. Ich verbinde ihn neu, damit er auch nach dem nächsten Neustart erreichbar bleibt.",
  },
];

export default function DruckerHilfe() {
  return (
    <>
      <FragenDaten
        fragen={druckerFragen}
        seitenUrl={`${SITE_URL}/drucker-hilfe`}
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
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <Printer size={48} aria-hidden="true" />
            </span>
            <h1
              id="einstieg-titel"
              className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            >
              Drucker anschließen und einrichten lassen
            </h1>
            <div
              aria-hidden="true"
              className="mx-auto mt-5 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-6 text-xl leading-relaxed text-slate-700 sm:text-2xl">
              Kaum ein Gerät im Haushalt ärgert so zuverlässig wie der Drucker.
              Ich komme zu Ihnen nach Hause, schließe ihn an, verbinde ihn mit
              Computer, Handy und WLAN und bringe ihn wieder zum Laufen – im
              Berliner Südwesten und in der direkten Umgebung.
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

        {/* Wobei ich beim Drucker helfe */}
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
              Damit helfe ich Ihnen beim Drucker
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

        {/* Reparieren oder neu kaufen */}
        <section
          aria-labelledby="reparatur-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-amber-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <h2
              id="reparatur-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Reparieren oder lieber einen neuen kaufen?
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <p className="mt-8 text-xl leading-relaxed text-slate-700">
              Viele Menschen rufen mich an, weil ihr Drucker angeblich kaputt
              ist. In den allermeisten Fällen ist er das gar nicht: Er hat die
              Verbindung verloren, ihm fehlt nach einem Update ein Treiber, oder
              eine Einstellung wurde unbemerkt verstellt. Das lässt sich vor Ort
              beheben, und der Drucker tut es danach wieder.
            </p>
            <p className="mt-4 text-xl leading-relaxed text-slate-700">
              Ich bin allerdings keine Reparaturwerkstatt und öffne keine
              Geräte. Wenn wirklich etwas defekt ist – ein Papiereinzug, der
              nicht mehr greift, oder ein Druckwerk, das den Dienst quittiert –
              dann sage ich Ihnen das ehrlich. Bei einem älteren Tintendrucker
              kostet eine Reparatur oft mehr als ein neues Gerät. Dann ist es
              vernünftiger, den Drucker zu ersetzen, und ich helfe Ihnen bei der
              Auswahl, statt Ihnen Arbeitszeit für etwas zu berechnen, das sich
              nicht lohnt.
            </p>

            <ul className="mt-8 flex list-none flex-col gap-4">
              {[
                "Die Beratung vorab am Telefon kostet Sie nichts",
                "Ich empfehle nur, was Sie wirklich brauchen",
                "Wenn sich eine Reparatur nicht lohnt, sage ich das",
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

        {/* Fragen zum Drucker */}
        <FragenAbschnitt
          fragen={druckerFragen}
          titel="Häufige Fragen zum Drucker"
          einleitung="Ist Ihre Frage nicht dabei? Rufen Sie mich einfach an – kurze Fragen kläre ich gerne gleich am Telefon."
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
                Drucker streikt? Rufen Sie mich an
              </WennTelefonSichtbar>
              <WennTelefonNichtSichtbar>
                Drucker streikt? Schreiben Sie mir
              </WennTelefonNichtSichtbar>
            </h2>
            <WennTelefonSichtbar>
              <p className="text-xl leading-relaxed sm:text-2xl">
                Schildern Sie mir kurz, was der Drucker macht – oft weiß ich
                schon am Telefon, woran es liegt.
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
              Drucker-Hilfe in Ihrer Nähe
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
