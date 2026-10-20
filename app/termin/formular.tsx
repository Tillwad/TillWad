"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CalendarCheck, CheckCircle2, Phone } from "lucide-react";
import {
  anliegen,
  dauerBeschriften,
  geraeteAuswahl,
} from "./konfiguration";
import type { FreieTermine } from "./kalender";
import { terminAnfragen, type Rueckmeldung } from "./aktionen";
import { TelefonLink, TelefonAnzeige, WennTelefonSichtbar } from "../schutz-links";

const FELD =
  "mt-2 w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-lg focus:border-blue-700 focus:outline-4 focus:outline-offset-1 focus:outline-blue-200";

const BESCHRIFTUNG = "block text-lg font-semibold text-slate-900";

function Abschnitt({
  nummer,
  titel,
  children,
}: {
  nummer: string;
  titel: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="flex items-center gap-4 text-2xl font-bold text-slate-900">
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-700"
        >
          {nummer}
        </span>
        {titel}
      </h2>
      {children}
    </section>
  );
}

function Absenden() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-8 py-5 text-2xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
    >
      <CalendarCheck size={28} aria-hidden="true" />
      {pending ? "Einen Moment …" : "Termin unverbindlich anfragen"}
    </button>
  );
}

export function TerminFormular({
  termine,
  ortsNamen,
  zeitstempel,
}: {
  termine: FreieTermine;
  ortsNamen: string[];
  zeitstempel: string;
}) {
  const [meldung, aktion] = useActionState<Rueckmeldung, FormData>(
    terminAnfragen,
    null,
  );
  const [anliegenWahl, setAnliegenWahl] = useState(anliegen[0].schluessel);
  const [tagWahl, setTagWahl] = useState("");

  const dauer =
    anliegen.find((eintrag) => eintrag.schluessel === anliegenWahl)
      ?.dauerMinuten ?? 90;
  const tage = termine[dauer] ?? [];
  const tag = tage.find((eintrag) => eintrag.datum === tagWahl) ?? tage[0];

  // Nach erfolgreicher Anfrage verschwindet das Formular: Nichts lädt mehr
  // zum doppelten Abschicken ein, und die Bestätigung ist nicht zu übersehen.
  if (meldung?.art === "erfolg") {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-green-300 bg-green-50 p-8"
      >
        <p className="flex items-start gap-4 text-xl leading-relaxed text-green-900">
          <CheckCircle2 size={32} aria-hidden="true" className="mt-1 shrink-0" />
          {meldung.text}
        </p>
      </div>
    );
  }

  return (
    <form action={aktion} className="flex flex-col gap-8">
      {/* Unsichtbare Felder für den Bot-Schutz. Das Feld "firma" füllen nur
          Programme aus, Menschen sehen es nicht – auch Screenreader nicht. */}
      <input type="hidden" name="zeitstempel" value={zeitstempel} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="firma">Firma (bitte leer lassen)</label>
        <input id="firma" name="firma" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Abschnitt nummer="1" titel="Worum geht es?">
        <fieldset className="mt-5">
          <legend className="sr-only">Anliegen auswählen</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {anliegen.map((eintrag) => (
              <label
                key={eintrag.schluessel}
                className="flex cursor-pointer items-start gap-4 rounded-xl border-2 border-slate-300 p-4 has-checked:border-blue-700 has-checked:bg-blue-50"
              >
                <input
                  type="radio"
                  name="anliegen"
                  value={eintrag.schluessel}
                  checked={anliegenWahl === eintrag.schluessel}
                  onChange={() => setAnliegenWahl(eintrag.schluessel)}
                  className="mt-1 h-6 w-6 shrink-0 accent-blue-700"
                />
                <span className="text-lg leading-snug text-slate-900">
                  <span className="font-semibold">{eintrag.titel}</span>
                  <span className="mt-1 block text-base text-slate-600">
                    Dauer: {dauerBeschriften(eintrag.dauerMinuten)}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </Abschnitt>

      <Abschnitt nummer="2" titel="Um welche Geräte geht es?">
        <fieldset className="mt-5">
          <legend className="text-lg text-slate-600">
            Kreuzen Sie alles an, was dazugehört.
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {geraeteAuswahl.map((geraet) => (
              <label
                key={geraet}
                className="flex cursor-pointer items-start gap-4 rounded-xl border-2 border-slate-300 p-4 has-checked:border-blue-700 has-checked:bg-blue-50"
              >
                <input
                  type="checkbox"
                  name="geraete"
                  value={geraet}
                  className="mt-1 h-6 w-6 shrink-0 rounded border-2 border-slate-400 accent-blue-700"
                />
                <span className="text-lg leading-snug text-slate-900">
                  {geraet}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label htmlFor="problem" className={`mt-7 ${BESCHRIFTUNG}`}>
          Beschreiben Sie kurz das Problem
        </label>
        <textarea
          id="problem"
          name="problem"
          rows={4}
          required
          minLength={10}
          maxLength={2000}
          placeholder="Zum Beispiel: Mein Drucker wird vom Computer nicht mehr gefunden."
          className={FELD}
        />
        <p className="mt-2 text-base text-slate-600">
          Ein, zwei Sätze genügen. Dann kann ich das Passende mitbringen.
        </p>
      </Abschnitt>

      <Abschnitt nummer="3" titel="Wo darf ich vorbeikommen?">
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={BESCHRIFTUNG}>
              Ihr Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={FELD}
            />
          </div>
          <div>
            <label htmlFor="telefon" className={BESCHRIFTUNG}>
              Telefonnummer
            </label>
            <input
              id="telefon"
              name="telefon"
              type="tel"
              required
              autoComplete="tel"
              aria-describedby="telefon-hinweis"
              className={FELD}
            />
          </div>
          <div>
            <label htmlFor="strasse" className={BESCHRIFTUNG}>
              Straße und Hausnummer
            </label>
            <input
              id="strasse"
              name="strasse"
              type="text"
              required
              autoComplete="street-address"
              className={FELD}
            />
          </div>
          <div>
            <label htmlFor="ort" className={BESCHRIFTUNG}>
              Ort
            </label>
            <select
              id="ort"
              name="ort"
              required
              defaultValue=""
              className={FELD}
            >
              <option value="" disabled>
                Bitte auswählen
              </option>
              {ortsNamen.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className={BESCHRIFTUNG}>
              E-Mail-Adresse{" "}
              <span className="font-normal text-slate-600">
                (freiwillig)
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={FELD}
            />
          </div>
        </div>
        <p id="telefon-hinweis" className="mt-4 text-base text-slate-600">
          Ich rufe Sie vor dem Termin kurz an, um alles zu bestätigen.
        </p>
      </Abschnitt>

      <Abschnitt nummer="4" titel="Wann passt es Ihnen?">
        {tage.length === 0 ? (
          <p className="mt-5 flex items-start gap-3 rounded-xl border-2 border-amber-300 bg-amber-50 p-5 text-lg leading-relaxed text-amber-900">
            <Phone size={26} aria-hidden="true" className="mt-1 shrink-0" />
            <span>
              Im Moment sind leider alle Termine vergeben.{" "}
              <WennTelefonSichtbar>
                <>
                  Rufen Sie mich gerne an unter{" "}
                  <TelefonLink
                    bereich="termin"
                    className="font-bold underline underline-offset-4"
                  >
                    <TelefonAnzeige />
                  </TelefonLink>
                  , dann finden wir gemeinsam etwas.
                </>
              </WennTelefonSichtbar>
            </span>
          </p>
        ) : (
          <>
            <label htmlFor="tag" className={`mt-5 ${BESCHRIFTUNG}`}>
              An welchem Tag?
            </label>
            <select
              id="tag"
              value={tag?.datum ?? ""}
              onChange={(ereignis) => setTagWahl(ereignis.target.value)}
              className={FELD}
            >
              {tage.map((eintrag) => (
                <option key={eintrag.datum} value={eintrag.datum}>
                  {eintrag.anzeige}
                </option>
              ))}
            </select>

            <fieldset className="mt-6">
              <legend className={BESCHRIFTUNG}>Um wie viel Uhr?</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {tag?.zeiten.map((zeit) => (
                  <label
                    key={zeit.iso}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-slate-300 px-3 py-3 text-lg font-semibold text-slate-900 has-checked:border-blue-700 has-checked:bg-blue-700 has-checked:text-white has-focus-visible:outline-4 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue-700"
                  >
                    <input
                      type="radio"
                      name="beginn"
                      value={zeit.iso}
                      required
                      className="sr-only"
                    />
                    {zeit.anzeige}
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="mt-4 text-base text-slate-600">
              Angezeigt werden nur Zeiten, die wirklich frei sind. Die Dauer
              richtet sich nach Ihrem Anliegen ({dauerBeschriften(dauer)}).
            </p>
          </>
        )}
      </Abschnitt>

      <div>
        <Absenden />
        {meldung?.art === "fehler" ? (
          <p
            role="status"
            className="mt-5 flex items-start gap-3 rounded-xl border-2 border-red-300 bg-red-50 p-4 text-lg text-red-900"
          >
            <AlertCircle size={24} aria-hidden="true" className="mt-1 shrink-0" />
            {meldung.text}
          </p>
        ) : null}
        <p className="mt-5 text-base leading-relaxed text-slate-600">
          Die Anfrage ist unverbindlich und kostet nichts. Ihre Angaben
          verwende ich nur, um den Termin mit Ihnen abzustimmen – mehr dazu in
          der Datenschutzerklärung.
        </p>
      </div>
    </form>
  );
}
