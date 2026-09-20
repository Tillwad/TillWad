import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Wrench,
  Clock,
  FileX,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { SITE_URL, itFragen, leistungen, orte } from "../daten";
import { KopfZeile, FussZeile, FragenAbschnitt } from "../komponenten";
import { FragenDaten } from "../strukturierte-daten";
import {
  TelefonLink,
  TelefonAnzeige,
  MailLink,
  WennTelefonSichtbar,
  WennTelefonNichtSichtbar,
} from "../schutz-links";

// Diese Seite schließt zwei Lücken auf einmal:
//
// 1. /it-hilfe war bisher eine 404-Seite, obwohl darunter acht Ortsseiten
//    liegen (/it-hilfe/zehlendorf und so weiter). Der Elternpfad einer
//    bestehenden Struktur sollte nie ins Leere laufen.
// 2. Laut Search Console kommen rund drei Dutzend Impressionen im Quartal
//    über Begriffe wie "it-hilfe", "it hilfe in der nähe", "it support",
//    "it notfallhilfe" und "pc hilfe". Für keinen davon gab es bisher eine
//    Seite, weil die ganze Website nur von "Computerhilfe" spricht.
export const metadata: Metadata = {
  title: "IT-Hilfe für Privatpersonen in Berlin | Till Wadehn",
  description:
    "IT-Hilfe bei Ihnen zu Hause im Berliner Südwesten. Hilfe bei Computer, PC, Handy, Internet und Drucker, ohne Vertrag und verständlich erklärt.",
  alternates: {
    canonical: "/it-hilfe",
  },
};

const anders = [
  {
    icon: FileX,
    farbe: "bg-blue-100 text-blue-700",
    titel: "Kein Vertrag, keine Hotline",
    beschreibung:
      "Keine Grundgebühr, keine Warteschleife, keine Ticketnummer. Sie rufen an und sprechen sofort mit der Person, die anschließend auch bei Ihnen vor der Tür steht.",
  },
  {
    icon: Clock,
    farbe: "bg-amber-100 text-amber-700",
    titel: "Abgerechnet wird nach Zeit",
    beschreibung:
      "Eine halbe Stunde kostet auch nur eine halbe Stunde. Keine Pauschalen, keine Mindestabnahme und keine Anfahrtskosten innerhalb meines Gebiets.",
  },
  {
    icon: Wrench,
    farbe: "bg-green-100 text-green-700",
    titel: "Einrichten und beheben",
    beschreibung:
      "Neue Geräte einrichten gehört dazu, genauso wie Fehler suchen, wenn etwas nicht mehr läuft. Liegt es an Programm oder Einstellung, bringe ich es in Ordnung.",
  },
  {
    icon: Wallet,
    farbe: "bg-violet-100 text-violet-700",
    titel: "Ich verkaufe nichts",
    beschreibung:
      "Ich handle nicht mit Geräten und bekomme von keinem Hersteller Geld für eine Empfehlung. Deshalb kann ich Ihnen auch sagen, wenn ein Kauf sich nicht lohnt.",
  },
];

export default function ItHilfe() {
  return (
    <>
      <FragenDaten fragen={itFragen} seitenUrl={`${SITE_URL}/it-hilfe`} />

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
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Wrench size={48} aria-hidden="true" />
            </span>
            <h1
              id="einstieg-titel"
              className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            >
              IT-Hilfe für Privatpersonen, bei Ihnen zu Hause
            </h1>
            <div
              aria-hidden="true"
              className="mx-auto mt-5 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-6 text-xl leading-relaxed text-slate-700 sm:text-2xl">
              IT-Hilfe klingt nach Firma, Serverraum und Technikerteam im
              Kleinbus. Bei mir ist es einfacher: Ich komme zu Ihnen nach Hause,
              schaue mir Ihr Gerät an und bringe es wieder zum Laufen. Ob Sie
              das IT-Hilfe, PC-Hilfe oder Computerhilfe nennen, ist mir gleich.
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

        {/* Womit ich helfe */}
        <section
          aria-labelledby="leistungen-titel"
          className="relative overflow-hidden px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border-[14px] border-blue-100/70"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <h2
              id="leistungen-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Womit ich Ihnen helfe
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leistungen.map((leistung) => (
                <li
                  key={leistung.titel}
                  className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm"
                >
                  <span
                    className={`inline-flex h-20 w-20 items-center justify-center rounded-full ${leistung.farbe}`}
                  >
                    <leistung.icon size={40} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {leistung.titel}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-slate-700">
                    {leistung.beschreibung}
                  </p>
                  {leistung.seite ? (
                    <Link
                      href={leistung.seite}
                      className="mt-4 inline-block text-lg font-bold text-blue-800 underline underline-offset-4 hover:text-blue-900"
                    >
                      {leistung.seiteText}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Was hier anders ist */}
        <section
          aria-labelledby="anders-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-amber-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <h2
              id="anders-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Was bei mir anders läuft als beim IT-Dienstleister
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2">
              {anders.map((eintrag) => (
                <li
                  key={eintrag.titel}
                  className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm"
                >
                  <span
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${eintrag.farbe}`}
                  >
                    <eintrag.icon size={32} aria-hidden="true" />
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

            <ul className="mx-auto mt-10 flex max-w-2xl list-none flex-col gap-4">
              {[
                "Eine kurze Frage am Telefon kostet Sie nichts",
                "Ich erkläre jeden Schritt, bevor ich ihn mache",
                "Sie erfahren den ungefähren Preis vor dem Termin",
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

        {/* Fragen zur IT-Hilfe */}
        <FragenAbschnitt
          fragen={itFragen}
          titel="Häufige Fragen zur IT-Hilfe"
          einleitung="Ist Ihre Frage nicht dabei? Rufen Sie mich einfach an, kurze Fragen beantworte ich gerne gleich am Telefon."
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
                Rufen Sie mich einfach an
              </WennTelefonSichtbar>
              <WennTelefonNichtSichtbar>
                Schreiben Sie mir einfach
              </WennTelefonNichtSichtbar>
            </h2>
            <WennTelefonSichtbar>
              <p className="text-xl leading-relaxed sm:text-2xl">
                Schildern Sie mir kurz, worum es geht. Oft weiß ich schon am
                Telefon, was zu tun ist.
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

        {/* Einzugsgebiet. Diese Seite ist der Elternpfad der Ortsseiten und
            sollte deshalb auf jede einzelne verweisen. */}
        <section aria-labelledby="gebiet-titel" className="px-5 py-14 sm:py-16">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h2
              id="gebiet-titel"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              IT-Hilfe in Ihrer Nähe
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-slate-700">
              Klicken Sie auf Ihren Ort. Dort steht, was mir vor Ort am
              häufigsten begegnet und in welchen Straßen ich unterwegs bin. Die
              Anfahrt ist überall kostenlos.
            </p>
            <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {orte.map((ort) => (
                <li key={ort.slug}>
                  <Link
                    href={`/it-hilfe/${ort.slug}`}
                    className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-xl font-semibold text-slate-900 shadow-sm hover:border-blue-700 hover:text-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <MapPin
                      size={26}
                      aria-hidden="true"
                      className="shrink-0 text-blue-700"
                    />
                    {ort.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xl leading-relaxed text-slate-700">
              Alle Einzelheiten zu Ablauf und Preisen stehen auf der{" "}
              <Link
                href="/"
                className="font-bold text-blue-800 underline underline-offset-4"
              >
                Startseite
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <FussZeile />
    </>
  );
}
