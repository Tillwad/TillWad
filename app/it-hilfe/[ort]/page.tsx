import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Mail, MapPin, CheckCircle2, Car } from "lucide-react";
import {
  SITE_URL,
  fragen as allgemeineFragen,
  leistungen,
  orte,
  type Ort,
} from "../../daten";
import { KopfZeile, FussZeile, FragenAbschnitt } from "../../komponenten";
import { FragenDaten } from "../../strukturierte-daten";
import {
  TelefonLink,
  TelefonAnzeige,
  MailLink,
} from "../../schutz-links";

type Params = { ort: string };

export function generateStaticParams(): Params[] {
  return orte.map((ort) => ({ ort: ort.slug }));
}

// Die ortsspezifischen Fragen zuerst, danach eine kleine Auswahl der
// allgemeinen. Der Rest steht auf der Startseite, damit sich die Ortsseiten
// nicht zu stark ähneln.
function fragenFuerOrt(ort: Ort) {
  return [...ort.fragen, ...allgemeineFragen.slice(0, 3)];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { ort: slug } = await params;
  const ort = orte.find((eintrag) => eintrag.slug === slug);
  if (!ort) {
    return {};
  }

  return {
    title: `IT-Hilfe in ${ort.name} – Computerhilfe bei Ihnen zu Hause`,
    // Bewusst aus dem ortsspezifischen Text gebildet statt aus einer Schablone:
    // identische Beschreibungen sind ein Signal für doppelte Inhalte.
    description: `${ort.text} Computer, Handy, WLAN, Drucker und Fernseher – verständlich erklärt in ${ort.name}.`,
    alternates: {
      canonical: `/it-hilfe/${ort.slug}`,
    },
  };
}

export default async function OrtSeite({
  params,
}: {
  params: Promise<Params>;
}) {
  const { ort: slug } = await params;
  const ort = orte.find((eintrag) => eintrag.slug === slug);
  if (!ort) {
    notFound();
  }

  const andereOrte = orte.filter((eintrag) => eintrag.slug !== ort.slug);

  return (
    <>
      <FragenDaten
        fragen={fragenFuerOrt(ort)}
        seitenUrl={`${SITE_URL}/it-hilfe/${ort.slug}`}
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

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            <figure className="relative w-full max-w-xs sm:max-w-sm lg:order-2 lg:shrink-0 lg:basis-2/5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-amber-200"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full border-8 border-blue-100"
              />
              <Image
                src="/images/till_wadehn_it_support.jpg"
                alt="Till Wadehn sitzt mit einer Kundin am Tisch und erklärt ihr etwas am Laptop"
                width={1400}
                height={1867}
                priority
                sizes="(max-width: 640px) 20rem, 24rem"
                className="blob-mask relative z-10 h-auto w-full border-4 border-white shadow-xl"
              />
              <figcaption className="relative z-10 mt-4 text-center text-lg text-slate-600">
                Till Wadehn – Ihr IT-Helfer vor Ort
              </figcaption>
            </figure>

            <div className="flex max-w-3xl flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-lg font-semibold text-blue-800">
              <MapPin size={22} aria-hidden="true" />
              {ort.name}
            </p>
            <h1
              id="einstieg-titel"
              className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            >
              IT-Hilfe in {ort.name} – bei Ihnen zu Hause
            </h1>
            <div
              aria-hidden="true"
              className="h-2 w-28 rounded-full bg-amber-400"
            />
            <p className="max-w-2xl text-xl leading-relaxed text-slate-700 sm:text-2xl">
              {ort.text}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TelefonLink className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-8 py-5 text-2xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto">
                <Phone size={28} aria-hidden="true" />
                Jetzt anrufen
              </TelefonLink>
              <MailLink className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-400 bg-white px-8 py-5 text-2xl font-bold text-slate-900 hover:border-blue-700 hover:text-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto">
                <Mail size={28} aria-hidden="true" />
                E-Mail schreiben
              </MailLink>
            </div>
            </div>
          </div>
        </section>

        {/* Ortsbild */}
        <div className="bg-white px-5 pb-14 sm:pb-20">
          <figure className="mx-auto w-full max-w-5xl">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:aspect-[2/1]">
              <Image
                src={ort.bild}
                alt={ort.bildAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 64rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-base text-slate-500">
              {ort.bildAlt} · Foto: {ort.bildAutor}, Lizenz:{" "}
              <a
                href={ort.bildLizenzUrl}
                className="underline underline-offset-4 hover:text-blue-800"
              >
                {ort.bildLizenz}
              </a>
              , via Wikimedia Commons
            </figcaption>
          </figure>
        </div>

        {/* Was hier vor Ort typisch ist */}
        <section
          aria-labelledby="vor-ort-titel"
          className="relative overflow-hidden px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-50"
          />

          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <h2
              id="vor-ort-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Technik in {ort.name} – was mir hier oft begegnet
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-700">
              {ort.lokal}
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">
                  Hier bin ich in {ort.name} unterwegs
                </h3>
                <ul className="mt-5 flex list-none flex-col gap-3">
                  {ort.gebiete.map((gebiet) => (
                    <li key={gebiet} className="flex items-start gap-3">
                      <MapPin
                        size={26}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-blue-700"
                      />
                      <span className="text-lg leading-relaxed text-slate-800">
                        {gebiet}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  Ihre Straße ist nicht dabei? Rufen Sie trotzdem an – die
                  Aufzählung ist nur eine Auswahl.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Car size={34} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  So komme ich zu Ihnen
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-700">
                  {ort.anfahrt}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leistungen im Ort */}
        <section
          aria-labelledby="leistungen-titel"
          className="relative overflow-hidden bg-white px-5 py-14 sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border-[14px] border-blue-100/70"
          />

          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <h2
              id="leistungen-titel"
              className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Damit helfe ich Ihnen in {ort.name}
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-2 w-28 rounded-full bg-amber-400"
            />

            <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2">
              {leistungen.map((leistung) => (
                <li
                  key={leistung.titel}
                  className="flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white px-6 py-5 shadow-sm"
                >
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${leistung.farbe}`}
                  >
                    <leistung.icon size={28} aria-hidden="true" />
                  </span>
                  <span className="text-xl font-semibold text-slate-900">
                    {leistung.titel}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mx-auto mt-10 flex max-w-2xl list-none flex-col gap-4">
              {[
                `Ich komme zu Ihnen nach Hause – überall in ${ort.name}`,
                "Die Anfahrt ist für Sie kostenlos",
                "Beratung am Telefon kostet nichts – rufen Sie einfach an",
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

            <p className="mt-10 text-center text-xl leading-relaxed text-slate-700">
              Alle Einzelheiten zu Ablauf und Preisen finden Sie auf der{" "}
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

        {/* Häufige Fragen aus dem Ort */}
        <FragenAbschnitt
          fragen={fragenFuerOrt(ort)}
          titel={`Häufige Fragen aus ${ort.name}`}
          einleitung={`Ist Ihre Frage nicht dabei? Rufen Sie mich einfach an – ich beantworte sie gern am Telefon.`}
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-8 border-white/15"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
            <h2 id="kontakt-titel" className="text-3xl font-bold sm:text-4xl">
              Rufen Sie mich einfach an
            </h2>
            <p className="text-xl leading-relaxed sm:text-2xl">
              Ich freue mich auf Ihren Anruf aus {ort.name} und nehme mir Zeit
              für Sie.
            </p>
            <TelefonLink className="inline-flex items-center gap-4 rounded-xl bg-white px-8 py-5 text-2xl font-bold text-blue-800 shadow-md hover:bg-blue-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-3xl">
              <Phone size={32} aria-hidden="true" />
              <TelefonAnzeige />
            </TelefonLink>
          </div>
        </section>

        {/* Nachbarorte */}
        <section
          aria-labelledby="nachbarorte-titel"
          className="px-5 py-14 sm:py-16"
        >
          <div className="mx-auto w-full max-w-4xl text-center">
            <h2
              id="nachbarorte-titel"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Ich helfe auch in Ihrer Nachbarschaft
            </h2>
            <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-4">
              {andereOrte.map((eintrag) => (
                <li key={eintrag.slug}>
                  <Link
                    href={`/it-hilfe/${eintrag.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-5 py-3 text-lg font-semibold text-slate-800 hover:border-blue-700 hover:text-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <MapPin
                      size={20}
                      aria-hidden="true"
                      className="text-blue-700"
                    />
                    {eintrag.name}
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
