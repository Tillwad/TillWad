import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  Car,
  MapPin,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
  HeartHandshake,
  Home as HomeIcon,
} from "lucide-react";
import { PREIS_STUNDE, SITE_URL, fragen, leistungen, orte } from "./daten";
import {
  KopfZeile,
  FussZeile,
  FragenAbschnitt,
  FotoHintergrundMobil,
  FotoNebenText,
} from "./komponenten";
import { FragenDaten, UnternehmensDaten } from "./strukturierte-daten";
import {
  TelefonLink,
  TelefonAnzeige,
  MailLink,
  MailAnzeige,
  WennTelefonSichtbar,
  WennTelefonNichtSichtbar,
} from "./schutz-links";

// Titel und Beschreibung stehen hier und nicht im Layout: Dort sind sie nur
// die Vorgabe für Seiten ohne eigene Angabe, hier gelten sie gezielt für die
// Startseite.
//
// Ohne eigenes Canonical meldet die Google Search Console "Duplikat – ohne
// vom Nutzer ausgewählten Canonical", weil Google sich dann selbst einen
// aussuchen muss.
export const metadata: Metadata = {
  // Auf die Länge gekürzt, die Google tatsächlich anzeigt: rund 60 Zeichen
  // beim Titel, rund 155 in der Beschreibung. Die wichtigen Begriffe stehen
  // vorne, damit sie auch bei einem Abschnitt sichtbar bleiben.
  title: "Computerhilfe bei Ihnen zu Hause in Berlin | Till Wadehn",
  description:
    "Geduldige Computerhilfe bei Ihnen zu Hause im Berliner Südwesten, für alle Privatleute. Hilfe bei Computer, Handy, Internet, Drucker und Fernseher.",
  alternates: {
    canonical: "/",
  },
};

const schritte = [
  {
    icon: PhoneCall,
    titel: "1. Sie rufen an",
    beschreibung:
      "Rufen Sie mich einfach an oder schreiben Sie mir. Schildern Sie mir in Ruhe, wobei Sie Hilfe brauchen.",
  },
  {
    icon: CalendarCheck,
    titel: "2. Wir machen einen Termin",
    beschreibung:
      "Wir finden gemeinsam einen Termin, der Ihnen passt. Sie müssen nichts vorbereiten.",
  },
  {
    icon: HomeIcon,
    titel: "3. Ich komme zu Ihnen",
    beschreibung:
      "Ich komme zu Ihnen nach Hause, löse das Problem und erkläre Ihnen alles in Ruhe, so oft Sie möchten.",
  },
];

const versprechen = [
  "Geduldig: Ich nehme mir Zeit und erkläre alles so oft Sie möchten",
  "Verständlich: Ich spreche Deutsch, kein Fachchinesisch",
  "Ehrlich: Ich empfehle nur, was Sie wirklich brauchen",
  "Aus der Nachbarschaft: kurze Wege, keine Anfahrtskosten",
];

const preise = [
  {
    icon: PhoneCall,
    farbe: "bg-green-100 text-green-700",
    titel: "Beratung am Telefon",
    preis: "Kostenlos",
    beschreibung:
      "Kurze Fragen beantworte ich gerne direkt am Telefon. Das kostet Sie nichts.",
  },
  {
    icon: HomeIcon,
    farbe: "bg-blue-100 text-blue-700",
    titel: "Hausbesuch",
    preis: PREIS_STUNDE,
    beschreibung:
      "Abgerechnet wird nur die tatsächliche Zeit bei Ihnen vor Ort. Den Preis nenne ich Ihnen vor jedem Besuch.",
  },
  {
    icon: Car,
    farbe: "bg-amber-100 text-amber-700",
    titel: "Anfahrt",
    preis: "Kostenlos",
    beschreibung:
      "Innerhalb meines Einzugsgebiets berechne ich keine Anfahrtskosten.",
  },
];

export default function Home() {
  return (
    <>
      <UnternehmensDaten />
      <FragenDaten fragen={fragen} seitenUrl={`${SITE_URL}/`} />

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
          {/* Auf dem Handy liegt das Foto hinter dem Text, siehe
              FotoHintergrundMobil. */}
          <FotoHintergrundMobil />

          {/* Dekorative Hintergrund-Kreise. Auf dem Handy würden sie über dem
              Foto liegen und es nur unruhig machen. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 hidden h-96 w-96 rounded-full bg-blue-50 lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-1/3 hidden h-64 w-64 rounded-full bg-amber-50 lg:block"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            <FotoNebenText className="lg:order-2 lg:w-full lg:max-w-md lg:shrink-0 lg:basis-2/5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-amber-200"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full border-8 border-blue-100"
              />
              <div
                aria-hidden="true"
                className="dot-grid pointer-events-none absolute -left-14 top-8 h-32 w-32"
              />
            </FotoNebenText>

            {/* Auf dem Handy steht der Text auf dem abgedunkelten Foto und ist
                deshalb hell; ab lg steht er wieder auf weißem Grund. */}
            <div className="flex max-w-3xl flex-col gap-6 text-center lg:order-1 lg:text-left">
              <h1
                id="einstieg-titel"
                className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-slate-900"
              >
                Computerhilfe bei Ihnen zu Hause für Handy, Internet und Drucker
              </h1>
              <div
                aria-hidden="true"
                className="mx-auto h-2 w-28 rounded-full bg-amber-400 lg:mx-0"
              />
              <p className="text-xl leading-relaxed text-slate-100 sm:text-2xl lg:text-slate-700">
                Ich bin Till aus Ihrer Nachbarschaft und helfe Privatleuten bei
                allem, was mit Computer, Handy, Internet, Drucker und Fernseher
                zu tun hat. Ich komme zu Ihnen nach Hause, nehme mir Zeit und
                erkläre alles in normalem Deutsch, ohne Fachchinesisch und ohne
                Eile.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
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
              <WennTelefonSichtbar>
                <p className="text-lg text-slate-200 lg:text-slate-600">
                  Sie erreichen mich unter{" "}
                  <TelefonLink
                    bereich="hero"
                    className="font-bold text-white underline underline-offset-4 lg:text-blue-800"
                  >
                    <TelefonAnzeige />
                  </TelefonLink>
                  . Gerne auch auf den Anrufbeantworter sprechen, ich rufe
                  zurück.
                </p>
              </WennTelefonSichtbar>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section
          aria-labelledby="leistungen-titel"
          className="relative overflow-hidden px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border-[14px] border-blue-100/70"
          />
          <div
            aria-hidden="true"
            className="dot-grid pointer-events-none absolute bottom-10 left-6 h-32 w-32"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <h2
              id="leistungen-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Wobei ich Ihnen helfen kann
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mx-auto mt-5 max-w-2xl text-center text-xl leading-relaxed text-slate-700">
              Egal ob großes oder kleines Problem, fragen Sie einfach. Es gibt
              keine dummen Fragen.
            </p>

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
                  {/* Gibt es zum Thema eine eigene Seite, führt von hier ein
                      Weg dorthin – sonst fände sie niemand. */}
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

        {/* So funktioniert es */}
        <section
          aria-labelledby="ablauf-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-blue-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <h2
              id="ablauf-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              So einfach geht es
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <ol className="relative mt-10 grid list-none gap-6 sm:grid-cols-3">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[18%] right-[18%] top-[4.5rem] hidden border-t-4 border-dashed border-blue-200 sm:block"
              />
              {schritte.map((schritt) => (
                <li
                  key={schritt.titel}
                  className="relative rounded-2xl bg-blue-50 p-7 text-center"
                >
                  <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-100 bg-white shadow-sm">
                    <schritt.icon
                      size={44}
                      aria-hidden="true"
                      className="text-blue-700"
                    />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {schritt.titel}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-slate-700">
                    {schritt.beschreibung}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Über mich */}
        <section
          aria-labelledby="ueber-mich-titel"
          className="relative overflow-hidden px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 bottom-8 h-72 w-72 rounded-full bg-amber-50"
          />
          <div
            aria-hidden="true"
            className="dot-grid pointer-events-none absolute right-10 top-10 h-28 w-28"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex max-w-2xl flex-col gap-6 text-center lg:text-left">
              <h2
                id="ueber-mich-titel"
                className="text-3xl font-bold text-slate-900 sm:text-4xl"
              >
                Über mich
              </h2>
              <div
                aria-hidden="true"
                className="mx-auto h-2 w-28 rounded-full bg-amber-400 lg:mx-0"
              />
              <p className="text-xl leading-relaxed text-slate-700">
                Mein Name ist Till Wadehn. Beruflich entwickle ich Software und
                Websites. Technik ist mein tägliches Handwerk. In meiner
                Freizeit biete ich Computerhilfe für Menschen aus der
                Nachbarschaft: für Familien, für Berufstätige im Homeoffice, für
                Alleinlebende und für ältere Menschen. Wer bei Computer, Handy
                oder Internet nicht weiterkommt, ist bei mir richtig.
              </p>
              <p className="text-xl leading-relaxed text-slate-700">
                Mir ist wichtig, dass Sie sich gut aufgehoben fühlen: Ich nehme
                mir Zeit, erkläre alles in Ruhe und Sie zahlen nur, was vorher
                besprochen wurde.
              </p>
            </div>

            <ul className="flex w-full max-w-xl list-none flex-col gap-4 rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm lg:shrink-0 lg:basis-2/5">
              {versprechen.map((punkt) => (
                <li key={punkt} className="flex items-start gap-4">
                  <CheckCircle2
                    size={32}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-green-600"
                  />
                  <span className="text-lg leading-relaxed text-slate-800">
                    {punkt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Computerhilfe für Senioren */}
        <section
          aria-labelledby="senioren-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-blue-50"
          />
          <div
            aria-hidden="true"
            className="dot-grid pointer-events-none absolute bottom-10 left-8 h-28 w-28"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <HeartHandshake size={40} aria-hidden="true" />
            </span>
            <h2
              id="senioren-titel"
              className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Computerhilfe für Senioren
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mt-6 text-xl leading-relaxed text-slate-700">
              Viele meiner Kundinnen und Kunden sind ältere Menschen, die sich
              bei Technikfragen mehr Zeit und Ruhe wünschen. Genau dafür bin ich
              da: Ich erkläre alles in normalem Deutsch, wiederhole so oft Sie
              möchten und dränge Sie zu nichts. Auf einer eigenen Seite habe ich
              aufgeschrieben, wie ein Besuch abläuft und was Angehörige wissen
              sollten.
            </p>
            <Link
              href="/computerhilfe-senioren"
              className="mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-slate-400 bg-white px-7 py-4 text-xl font-bold text-slate-900 hover:border-blue-700 hover:text-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <HeartHandshake size={26} aria-hidden="true" />
              Mehr zur Computerhilfe für Senioren
            </Link>
          </div>
        </section>

        {/* Preise */}
        <section
          aria-labelledby="preise-titel"
          className="relative overflow-hidden px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full border-[12px] border-amber-100"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <h2
              id="preise-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Faire und klare Preise
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mx-auto mt-5 max-w-2xl text-center text-xl leading-relaxed text-slate-700">
              Keine versteckten Kosten, keine Überraschungen. Sie wissen immer
              vorher, was die Hilfe kostet.
            </p>

            <ul className="mt-10 grid list-none gap-6 sm:grid-cols-3">
              {preise.map((eintrag) => (
                <li
                  key={eintrag.titel}
                  className="rounded-2xl border-2 border-slate-200 bg-white p-7 text-center shadow-sm"
                >
                  <span
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${eintrag.farbe}`}
                  >
                    <eintrag.icon size={40} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {eintrag.titel}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-blue-800">
                    {eintrag.preis}
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-slate-700">
                    {eintrag.beschreibung}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Einzugsgebiet */}
        <section
          aria-labelledby="einzugsgebiet-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <h2
              id="einzugsgebiet-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Hier bin ich für Sie unterwegs
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="mx-auto mt-5 max-w-2xl text-center text-xl leading-relaxed text-slate-700">
              Ich helfe im Berliner Südwesten und in der direkten Umgebung.
              Klicken Sie auf Ihren Ort, um mehr zu erfahren:
            </p>

            <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          </div>
        </section>

        {/* Häufige Fragen */}
        <FragenAbschnitt
          fragen={fragen}
          hell={false}
          einleitung="Hier finden Sie Antworten auf die Fragen, die mir am häufigsten gestellt werden. Ist Ihre Frage nicht dabei? Rufen Sie mich einfach an."
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-8 border-white/15"
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
                Ich freue mich auf Ihren Anruf und nehme mir Zeit für Sie.
              </p>
            </WennTelefonSichtbar>
            <TelefonLink
              bereich="kontakt"
              className="inline-flex items-center gap-4 rounded-xl bg-white px-8 py-5 text-2xl font-bold text-blue-800 shadow-md hover:bg-blue-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-3xl"
            >
              <Phone size={32} aria-hidden="true" />
              <TelefonAnzeige />
            </TelefonLink>
            <p className="text-xl">
              <WennTelefonSichtbar>Oder per E-Mail: </WennTelefonSichtbar>
              <WennTelefonNichtSichtbar>
                Sie erreichen mich per E-Mail:{" "}
              </WennTelefonNichtSichtbar>
              <MailLink
                bereich="kontakt"
                className="font-bold underline underline-offset-4"
              >
                <MailAnzeige />
              </MailLink>
            </p>
          </div>
        </section>
      </main>

      <FussZeile />
    </>
  );
}
