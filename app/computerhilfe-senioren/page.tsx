import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  Smartphone,
  Video,
  ShieldCheck,
  Tv,
  Images,
  Laptop,
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Users,
} from "lucide-react";
import { SITE_URL, seniorenFragen, orte } from "../daten";
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
  // Ohne "| Till Wadehn": Mit Namen wären es über 60 Zeichen, und Google zeigt
  // nur rund 60. Die Marke steht auf der Startseite.
  title: "Computerhilfe für Senioren zu Hause in Berlin",
  description:
    "Geduldige Computerhilfe für Senioren bei Ihnen zu Hause im Berliner Südwesten. Handy, Computer, Video-Anrufe und Schutz vor Betrug, in Ruhe erklärt.",
  alternates: {
    canonical: "/computerhilfe-senioren",
  },
};

const anliegen = [
  {
    icon: Smartphone,
    farbe: "bg-amber-100 text-amber-700",
    titel: "Das Handy verstehen",
    beschreibung:
      "Neues Handy einrichten, Schrift und Lautstärke größer stellen, WhatsApp erklären und die Tasten so sortieren, dass Sie finden, was Sie brauchen.",
  },
  {
    icon: Video,
    farbe: "bg-blue-100 text-blue-700",
    titel: "Video-Anrufe mit der Familie",
    beschreibung:
      "Kinder und Enkel sehen, auch wenn sie weit weg wohnen. Ich richte es so ein, dass ein einziger Tipp auf dem Bildschirm genügt, und übe es einmal mit Ihnen.",
  },
  {
    icon: ShieldCheck,
    farbe: "bg-green-100 text-green-700",
    titel: "Schutz vor Betrug",
    beschreibung:
      "Falsche Bank-E-Mails, angebliche Microsoft-Anrufe, Warnmeldungen auf dem Bildschirm: Ich zeige Ihnen ohne erhobenen Zeigefinger, woran Sie die Maschen erkennen.",
  },
  {
    icon: Tv,
    farbe: "bg-rose-100 text-rose-700",
    titel: "Fernseher und Fernbedienung",
    beschreibung:
      "Drei Fernbedienungen auf eine reduzieren, Sender in eine sinnvolle Reihenfolge bringen und die Mediatheken dorthin legen, wo Sie sie wiederfinden.",
  },
  {
    icon: Images,
    farbe: "bg-violet-100 text-violet-700",
    titel: "Fotos sichern und zeigen",
    beschreibung:
      "Bilder vom alten Handy retten, sicher aufbewahren und auf dem großen Bildschirm im Wohnzimmer zeigen. Auf Wunsch drucken wir die schönsten aus.",
  },
  {
    icon: Laptop,
    farbe: "bg-sky-100 text-sky-700",
    titel: "Computer, der wieder tut, was er soll",
    beschreibung:
      "Langsame Geräte wieder flott machen, Aktualisierungen nachholen und das aufräumen, was sich über die Jahre angesammelt hat, meist ohne Neukauf.",
  },
];

// Was ältere Kundinnen und Kunden am häufigsten fragen, bevor sie anrufen:
// "Habe ich genug Zeit?" und "Blamiere ich mich?". Diese Zusagen beantworten
// beides, bevor die Frage überhaupt gestellt werden muss.
const zusagen = [
  "Ich erkläre alles in normalem Deutsch, ohne ein einziges Fachwort",
  "Wiederholen ist ausdrücklich erwünscht, auch zum dritten Mal",
  "Auf Wunsch schreibe ich die Schritte in großer Schrift auf",
  "Ich fasse nichts an, ohne vorher zu sagen, was ich tue",
  "Ich verkaufe nichts und empfehle nur, was Sie wirklich brauchen",
  "Abgerechnet wird nach Zeit: eine halbe Stunde kostet auch nur eine halbe",
];

export default function SeniorenHilfe() {
  return (
    <>
      <FragenDaten
        fragen={seniorenFragen}
        seitenUrl={`${SITE_URL}/computerhilfe-senioren`}
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
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-50"
          />
          <div
            aria-hidden="true"
            className="dot-grid pointer-events-none absolute right-8 top-10 h-28 w-28"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <HeartHandshake size={48} aria-hidden="true" />
            </span>
            <h1
              id="einstieg-titel"
              className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            >
              Computerhilfe für Senioren bei Ihnen zu Hause
            </h1>
            <div
              aria-hidden="true"
              className="mx-auto mt-5 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-6 text-xl leading-relaxed text-slate-700 sm:text-2xl">
              Technik soll Ihnen das Leben leichter machen und nicht schwerer.
              Ich komme zu Ihnen nach Hause, schaue mir Ihr Gerät in Ruhe an und
              erkläre alles so oft, wie Sie möchten, im Berliner Südwesten und
              in der direkten Umgebung. Es gibt bei mir keine dummen Fragen.
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

        {/* Wobei ich älteren Menschen am häufigsten helfe */}
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
              Damit werde ich am häufigsten gerufen
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mx-auto mt-5 max-w-2xl text-center text-xl leading-relaxed text-slate-700">
              Ihr Anliegen ist nicht dabei? Fragen Sie trotzdem. Die Liste ist
              nur eine Auswahl aus meinem Alltag.
            </p>

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

        {/* Meine Zusagen */}
        <section
          aria-labelledby="zusagen-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-amber-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <h2
              id="zusagen-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              So gehe ich mit Ihnen um
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-8 text-xl leading-relaxed text-slate-700">
              Die meisten Menschen, die mich rufen, haben schon einmal die
              Erfahrung gemacht, dass jemand schnell etwas „eben mal“ gerichtet
              hat und danach niemand mehr wusste, was passiert ist. So arbeite
              ich nicht. Ich sitze neben Ihnen, nicht vor Ihrem Gerät, und Sie
              sollen am Ende selbst können, was Sie können möchten.
            </p>

            <ul className="mt-8 flex list-none flex-col gap-4">
              {zusagen.map((punkt) => (
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

        {/* Für Angehörige */}
        <section
          aria-labelledby="angehoerige-titel"
          className="relative overflow-hidden px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 top-10 h-72 w-72 rounded-full bg-blue-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Users size={40} aria-hidden="true" />
            </span>
            <h2
              id="angehoerige-titel"
              className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Sie suchen Hilfe für Ihre Eltern oder Großeltern?
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-6 text-xl leading-relaxed text-slate-700">
              Viele Termine werden von Söhnen, Töchtern und Enkeln angestoßen,
              die selbst weiter weg wohnen und das Gefühl haben, am Telefon
              nicht weiterzukommen. Rufen Sie mich gerne an und schildern Sie
              mir, worum es geht. Ich melde mich danach direkt bei Ihren Eltern,
              stimme den Termin mit ihnen ab und sage Ihnen anschließend
              Bescheid, was gemacht wurde.
            </p>
            <p className="mt-4 text-xl leading-relaxed text-slate-700">
              Sie können den Besuch auch übernehmen, ohne dabei zu sein. Das ist
              oft die unkomplizierteste Lösung, wenn Sie nicht in Berlin wohnen.
            </p>
          </div>
        </section>

        {/* Fragen von älteren Menschen */}
        <FragenAbschnitt
          fragen={seniorenFragen}
          titel="Häufige Fragen älterer Kundinnen und Kunden"
          einleitung="Ist Ihre Frage nicht dabei? Rufen Sie mich einfach an. Kurze Fragen beantworte ich gerne gleich am Telefon, und das kostet Sie nichts."
          hell={true}
        />

        {/* Wellen-Übergang zum Kontaktbereich */}
        <div aria-hidden="true" className="bg-white">
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
                Sie müssen nichts vorbereiten. Wenn ich gerade nicht rangehen
                kann, sprechen Sie mir bitte auf den Anrufbeantworter, ich rufe
                zuverlässig zurück.
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
              Computerhilfe für Senioren in Ihrer Nähe
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-slate-700">
              Ich komme zu Ihnen nach Hause. In diesen Orten ist die Anfahrt für
              Sie kostenlos:
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
            <p className="mt-8 text-xl leading-relaxed text-slate-700">
              Alle Einzelheiten zu Leistungen, Ablauf und Preisen stehen auf der{" "}
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
