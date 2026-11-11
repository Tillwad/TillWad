import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  Mail,
  CalendarCheck,
  CalendarDays,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { SITE_URL } from "../../daten";
import { KopfZeile, FussZeile, FragenAbschnitt } from "../../komponenten";
import { ProduktEmpfehlungen } from "../../shop/empfehlungen";
import { BeitragsDaten, FragenDaten } from "../../strukturierte-daten";
import {
  TelefonLink,
  TelefonAnzeige,
  MailLink,
  WennTelefonNichtSichtbar,
} from "../../schutz-links";
import { beitraege, beitragFinden, datumLesbar } from "../beitraege";
import { BeitragsInhalt } from "../inhalt";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return beitraege.map((beitrag) => ({ slug: beitrag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const beitrag = beitragFinden(slug);
  if (!beitrag) {
    return {};
  }

  return {
    title: beitrag.metaTitel,
    description: beitrag.beschreibung,
    alternates: { canonical: `/ratgeber/${beitrag.slug}` },
    // Das Datum gehört in die Metadaten, nicht nur in die strukturierten
    // Daten: Bei einem Beitrag über eine aktuelle Änderung entscheidet es
    // mit darüber, ob Google den Text für aktuell hält.
    openGraph: {
      type: "article",
      title: beitrag.metaTitel,
      description: beitrag.beschreibung,
      url: `${SITE_URL}/ratgeber/${beitrag.slug}`,
      publishedTime: beitrag.veroeffentlicht,
      modifiedTime: beitrag.aktualisiert ?? beitrag.veroeffentlicht,
    },
  };
}

export default async function RatgeberBeitrag({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const beitrag = beitragFinden(slug);
  if (!beitrag) {
    notFound();
  }

  const seitenUrl = `${SITE_URL}/ratgeber/${beitrag.slug}`;

  // Die übrigen Beiträge als Vorschlag am Ende. Solange es nur einen Beitrag
  // gibt, bleibt der Abschnitt leer und fällt weg.
  const weitere = beitraege.filter((eintrag) => eintrag.slug !== beitrag.slug);

  return (
    <>
      <BeitragsDaten
        titel={beitrag.titel}
        beschreibung={beitrag.beschreibung}
        seitenUrl={seitenUrl}
        veroeffentlicht={beitrag.veroeffentlicht}
        aktualisiert={beitrag.aktualisiert}
      />
      <FragenDaten fragen={beitrag.fragen} seitenUrl={seitenUrl} />

      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50">
        {/* Kopf des Beitrags */}
        <article>
          <header className="relative overflow-hidden bg-white px-5 py-14 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-50"
            />
            <div
              aria-hidden="true"
              className="dot-grid pointer-events-none absolute right-8 top-10 h-28 w-28"
            />

            <div className="relative z-10 mx-auto w-full max-w-3xl">
              {/* Eine Zeile: links der Weg zurück zur Übersicht, rechts das
                  Thema. Reicht der Platz nicht, rutscht das Schildchen mit
                  flex-wrap in die nächste Zeile, statt zusammenzuquetschen. */}
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <Link
                  href="/ratgeber"
                  className="flex items-center gap-2 text-lg font-bold text-blue-800 underline underline-offset-4 hover:text-blue-900"
                >
                  <ArrowLeft size={20} aria-hidden="true" />
                  Alle Ratgeber-Beiträge
                </Link>

                <span className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-base font-bold text-amber-800">
                  <BookOpen size={18} aria-hidden="true" />
                  {beitrag.thema}
                </span>
              </div>

              <h1 className="mt-7 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                {beitrag.titel}
              </h1>
              <div
                aria-hidden="true"
                className="mt-5 h-2 w-28 rounded-full bg-amber-400"
              />

              <p className="mt-6 text-xl leading-relaxed text-slate-700 sm:text-2xl">
                {beitrag.teaser}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays
                    size={20}
                    aria-hidden="true"
                    className="text-blue-700"
                  />
                  <span>
                    {beitrag.aktualisiert ? "Aktualisiert am " : ""}
                    <time
                      dateTime={beitrag.aktualisiert ?? beitrag.veroeffentlicht}
                    >
                      {datumLesbar(
                        beitrag.aktualisiert ?? beitrag.veroeffentlicht,
                      )}
                    </time>
                  </span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock
                    size={20}
                    aria-hidden="true"
                    className="text-blue-700"
                  />
                  {beitrag.lesezeit} Minuten Lesezeit
                </span>
                <span>von Till Wadehn</span>
              </div>
            </div>
          </header>

          {/* Der Text selbst */}
          <div className="bg-white px-5 pb-14 sm:pb-20">
            <div className="mx-auto w-full max-w-3xl">
              <BeitragsInhalt bloecke={beitrag.inhalt} />
            </div>
          </div>
        </article>

        {/* Hilfe anbieten, direkt im Anschluss an den Text. Wer bis hierhin
            gelesen hat, hat das Problem gerade und nicht irgendwann. */}
        <section
          aria-labelledby="hilfe-titel"
          className="px-5 py-14 sm:py-16"
        >
          <div className="mx-auto w-full max-w-3xl rounded-2xl border-2 border-blue-200 bg-blue-50 p-8 sm:p-10">
            <h2
              id="hilfe-titel"
              className="text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Soll ich das für Sie übernehmen?
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-slate-700">
              Ich komme zu Ihnen nach Hause, wir sehen uns das gemeinsam an
              Ihrem eigenen Gerät an, und ich erkläre Ihnen dabei in Ruhe, was
              ich mache. Die Anfahrt im Berliner Südwesten ist für Sie
              kostenlos.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <TelefonLink
                bereich="kontakt"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-7 py-5 text-xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
              >
                <Phone size={26} aria-hidden="true" />
                <TelefonAnzeige />
              </TelefonLink>
              <Link
                href="/termin"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-7 py-5 text-xl font-bold text-white shadow-md hover:bg-amber-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:w-auto"
              >
                <CalendarCheck size={26} aria-hidden="true" />
                Termin buchen
              </Link>
              <WennTelefonNichtSichtbar>
                <MailLink
                  bereich="kontakt"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-400 bg-white px-7 py-5 text-xl font-bold text-slate-900 hover:border-blue-700 hover:text-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
                >
                  <Mail size={26} aria-hidden="true" />
                  E-Mail schreiben
                </MailLink>
              </WennTelefonNichtSichtbar>
            </div>
          </div>
        </section>

        {/* Passende Geräte aus der Kaufberatung, falls welche angegeben sind */}
        {beitrag.produkte && beitrag.produkte.length > 0 ? (
          <ProduktEmpfehlungen
            titel="Das passt zum Thema"
            einleitung="Ehrliche Empfehlungen aus meiner Kaufberatung, auf Wunsch mit Einrichtung bei Ihnen zu Hause."
            slugs={beitrag.produkte}
          />
        ) : null}

        {/* Fragen zum Beitrag */}
        <FragenAbschnitt
          fragen={beitrag.fragen}
          titel="Häufige Fragen dazu"
          einleitung="Ist Ihre Frage nicht dabei? Rufen Sie mich einfach an. Kurze Fragen kläre ich gerne gleich am Telefon."
        />

        {/* Quellen. Gehört bei einem Beitrag über eine aktuelle Änderung
            dazu: Jeder soll nachlesen können, woher die Angaben kommen. */}
        {beitrag.quellen && beitrag.quellen.length > 0 ? (
          <section
            aria-labelledby="quellen-titel"
            className="px-5 py-14 sm:py-16"
          >
            <div className="mx-auto w-full max-w-3xl">
              <h2
                id="quellen-titel"
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                Woher die Angaben kommen
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">
                Ich schreibe hier nichts auf Zuruf. Das sind die Stellen, auf
                die sich dieser Beitrag stützt, damit Sie alles selbst nachlesen
                können:
              </p>
              <ul className="mt-6 flex list-none flex-col gap-3">
                {beitrag.quellen.map((quelle) => (
                  <li key={quelle.url} className="flex items-start gap-3">
                    <ExternalLink
                      size={22}
                      aria-hidden="true"
                      className="mt-1.5 shrink-0 text-slate-500"
                    />
                    <a
                      href={quelle.url}
                      target="_blank"
                      rel="noopener nofollow"
                      className="text-lg leading-relaxed text-blue-800 underline underline-offset-4 hover:text-blue-900"
                    >
                      {quelle.titel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Weiterlesen auf der Website und weitere Beiträge */}
        {(beitrag.weiterlesen && beitrag.weiterlesen.length > 0) ||
        weitere.length > 0 ? (
          <section
            aria-labelledby="weiter-titel"
            className="bg-white px-5 py-14 sm:py-16"
          >
            <div className="mx-auto w-full max-w-3xl">
              <h2
                id="weiter-titel"
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                Das könnte Ihnen auch weiterhelfen
              </h2>
              <ul className="mt-6 flex list-none flex-col gap-3">
                {weitere.map((eintrag) => (
                  <li key={eintrag.slug}>
                    <Link
                      href={`/ratgeber/${eintrag.slug}`}
                      className="inline-flex items-start gap-3 text-lg font-bold text-blue-800 underline underline-offset-4 hover:text-blue-900"
                    >
                      <ArrowRight
                        size={22}
                        aria-hidden="true"
                        className="mt-1.5 shrink-0"
                      />
                      {eintrag.titel}
                    </Link>
                  </li>
                ))}
                {beitrag.weiterlesen?.map((verweis) => (
                  <li key={verweis.pfad}>
                    <Link
                      href={verweis.pfad}
                      className="inline-flex items-start gap-3 text-lg font-bold text-blue-800 underline underline-offset-4 hover:text-blue-900"
                    >
                      <ArrowRight
                        size={22}
                        aria-hidden="true"
                        className="mt-1.5 shrink-0"
                      />
                      {verweis.titel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>

      <FussZeile />
    </>
  );
}
