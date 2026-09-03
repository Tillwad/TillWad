import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  Wifi,
  Router,
  KeyRound,
  Users,
  SignalHigh,
  PlugZap,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { SITE_URL, wlanFragen, orte } from "../daten";
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
  title: "WLAN einrichten & Router anschließen lassen in Berlin",
  description:
    "WLAN einrichten, Router anschließen und Internet-Aussetzer beheben – bei Ihnen zu Hause im Berliner Südwesten. Meist ohne neuen Vertrag. Jetzt anrufen.",
  alternates: {
    canonical: "/wlan-hilfe",
  },
};

const anliegen = [
  {
    icon: Router,
    farbe: "bg-sky-100 text-sky-700",
    titel: "Neuen Router anschließen",
    beschreibung:
      "Anschließen, einrichten und – wenn möglich – den alten WLAN-Namen samt Passwort übernehmen. Dann müssen Sie kein einziges Gerät neu verbinden.",
  },
  {
    icon: SignalHigh,
    farbe: "bg-blue-100 text-blue-700",
    titel: "WLAN bis in den letzten Winkel",
    beschreibung:
      "Ich messe nach, wo das Signal abreißt, und sorge dafür, dass es auch im Schlafzimmer, im Keller oder auf der Terrasse ankommt.",
  },
  {
    icon: PlugZap,
    farbe: "bg-amber-100 text-amber-700",
    titel: "Internet bricht ständig ab",
    beschreibung:
      "Alte Telefondose, gequetschtes Kabel oder ein Router ohne Aktualisierung – ich finde die Ursache, bevor Sie einen teureren Vertrag abschließen.",
  },
  {
    icon: KeyRound,
    farbe: "bg-violet-100 text-violet-700",
    titel: "WLAN-Passwort verlegt",
    beschreibung:
      "Ich hole es hervor, schreibe es Ihnen lesbar auf und lege es an eine Stelle, an der Sie es beim nächsten Mal wiederfinden.",
  },
  {
    icon: Users,
    farbe: "bg-green-100 text-green-700",
    titel: "Gäste-WLAN einrichten",
    beschreibung:
      "Besuch kommt ins Internet, aber nicht an Ihre Geräte – und Sie müssen Ihr eigenes Passwort nicht herausgeben.",
  },
  {
    icon: Wifi,
    farbe: "bg-rose-100 text-rose-700",
    titel: "Geräte wieder verbinden",
    beschreibung:
      "Nach einem Router-Wechsel sind oft Drucker, Fernseher und Tablet offline. Ich bringe alles wieder ins Netz, Gerät für Gerät.",
  },
];

export default function WlanHilfe() {
  return (
    <>
      <FragenDaten fragen={wlanFragen} seitenUrl={`${SITE_URL}/wlan-hilfe`} />

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
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sky-100 text-sky-700">
              <Wifi size={48} aria-hidden="true" />
            </span>
            <h1
              id="einstieg-titel"
              className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            >
              WLAN einrichten und Internet zum Laufen bringen
            </h1>
            <div
              aria-hidden="true"
              className="mx-auto mt-5 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-6 text-xl leading-relaxed text-slate-700 sm:text-2xl">
              Wenn das Internet streikt oder das WLAN nur im halben Haus
              ankommt, muss selten ein neuer Vertrag her. Ich komme zu Ihnen,
              finde die Ursache und richte alles so ein, dass es überall
              funktioniert – im Berliner Südwesten und in der direkten Umgebung.
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
              Damit helfe ich Ihnen bei Internet und WLAN
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

        {/* Warum das WLAN nicht überall ankommt */}
        <section
          aria-labelledby="ursachen-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-amber-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <h2
              id="ursachen-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Warum das WLAN nicht überall ankommt
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <p className="mt-8 text-xl leading-relaxed text-slate-700">
              WLAN ist Funk, und Funk hat es schwer mit Wänden. In den älteren,
              massiv gebauten Häusern hier im Südwesten kommt das Signal oft nur
              ein, zwei Räume weit – besonders, wenn der Router im Flur steht,
              wo der Anschluss nun einmal liegt. Über zwei Etagen wird es noch
              schwieriger. Das ist kein Fehler Ihres Anschlusses, sondern eine
              Frage der Verteilung.
            </p>
            <p className="mt-4 text-xl leading-relaxed text-slate-700">
              Genau deshalb hilft ein schnellerer Tarif in diesen Fällen nicht:
              Wenn das Signal das Schlafzimmer gar nicht erreicht, ändert eine
              höhere Geschwindigkeit am Hausanschluss daran nichts. Was hilft,
              ist ein besserer Standort für den Router oder ein zusätzliches
              Gerät, das das Signal weiterreicht. Ich messe bei Ihnen nach und
              sage Ihnen, was in Ihrer Wohnung nötig ist – und was nicht.
            </p>

            <ul className="mt-8 flex list-none flex-col gap-4">
              {[
                "Erst messen, dann kaufen – oft genügt ein anderer Standort",
                "Ich empfehle nur Geräte, die Sie tatsächlich brauchen",
                "Wenn es am Anschluss liegt, sage ich Ihnen das ehrlich",
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
          fragen={wlanFragen}
          titel="Häufige Fragen zu Internet und WLAN"
          einleitung="Ist Ihre Frage nicht dabei? Rufen Sie mich einfach an – oft weiß ich schon am Telefon, woran es liegt."
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
                Internet streikt? Rufen Sie mich an
              </WennTelefonSichtbar>
              <WennTelefonNichtSichtbar>
                Internet streikt? Schreiben Sie mir
              </WennTelefonNichtSichtbar>
            </h2>
            <WennTelefonSichtbar>
              <p className="text-xl leading-relaxed sm:text-2xl">
                Schildern Sie mir kurz, was passiert – und ab wann es nicht mehr
                ging. Das grenzt die Ursache oft schon ein.
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
              WLAN-Hilfe in Ihrer Nähe
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
