"use client";

import { useState } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import { istImEinzugsgebiet, preisAnzeigen, UST_HINWEIS } from "./konfiguration";
import type { Einrichtung } from "./produkte";
import { bestellungAbsenden, type Rueckmeldung } from "./aktionen";

const FELD =
  "mt-2 w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-lg focus:border-blue-700 focus:outline-4 focus:outline-offset-1 focus:outline-blue-200";

const BESCHRIFTUNG = "block text-lg font-semibold text-slate-900";

function Absenden() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-8 py-5 text-2xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      <ShoppingCart size={28} aria-hidden="true" />
      {pending ? "Einen Moment …" : "Zahlungspflichtig bestellen"}
    </button>
  );
}

export function BestellFormular({
  produktSlug,
  produktName,
  preisEuro,
  preisZusatz,
  einrichtung,
  versandEuro,
  lieferzeit,
  zeitstempel,
}: {
  produktSlug: string;
  produktName: string;
  preisEuro: number;
  preisZusatz?: string;
  einrichtung?: Einrichtung;
  versandEuro: number;
  lieferzeit: string;
  zeitstempel: string;
}) {
  const [meldung, aktion] = useActionState<Rueckmeldung, FormData>(
    bestellungAbsenden,
    null,
  );
  const [mitEinrichtung, setMitEinrichtung] = useState(false);
  const [plz, setPlz] = useState("");

  // Die Einrichtung zu Hause gibt es nur im Einzugsgebiet. Solange keine
  // vollständige Postleitzahl dasteht, bleibt das Angebot sichtbar; eine
  // Postleitzahl außerhalb blendet es aus (und der Server prüft es erneut).
  const plzVollstaendig = /^\d{5}$/.test(plz.trim());
  const einrichtungMoeglich = !plzVollstaendig || istImEinzugsgebiet(plz);
  const einrichtungAktiv =
    Boolean(einrichtung) && mitEinrichtung && einrichtungMoeglich;

  const einrichtungEuro =
    einrichtungAktiv && einrichtung ? einrichtung.preisEuro : 0;
  const gesamtEuro = preisEuro + einrichtungEuro + versandEuro;

  // Nach erfolgreicher Bestellung verschwindet das Formular – nichts lädt
  // mehr zum doppelten Abschicken ein, und die Bestätigung ist unübersehbar.
  if (meldung?.art === "erfolg") {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-green-300 bg-green-50 p-8"
      >
        <p className="flex items-start gap-4 text-xl leading-relaxed text-green-900">
          <CheckCircle2
            size={32}
            aria-hidden="true"
            className="mt-1 shrink-0"
          />
          {meldung.text}
        </p>
      </div>
    );
  }

  return (
    <form action={aktion} className="flex flex-col gap-8">
      {/* Unsichtbare Felder für den Bot-Schutz, siehe Terminformular. */}
      <input type="hidden" name="zeitstempel" value={zeitstempel} />
      <input type="hidden" name="produkt" value={produktSlug} />
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="firma">Firma (bitte leer lassen)</label>
        <input
          id="firma"
          name="firma"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {einrichtung ? (
        einrichtungMoeglich ? (
          <section className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                name="einrichtung"
                value="ja"
                checked={mitEinrichtung}
                onChange={(ereignis) =>
                  setMitEinrichtung(ereignis.target.checked)
                }
                className="mt-1 h-7 w-7 shrink-0 rounded border-2 border-slate-400 accent-blue-700"
              />
              <span className="text-lg leading-relaxed text-slate-900">
                <span className="flex items-center gap-2 text-xl font-bold">
                  <Wrench
                    size={22}
                    aria-hidden="true"
                    className="text-amber-700"
                  />
                  {einrichtung.titel} dazubuchen (+
                  {preisAnzeigen(einrichtung.preisEuro)})
                </span>
                <span className="mt-2 block text-slate-700">
                  {einrichtung.beschreibung} Die Einrichtung biete ich in
                  meinem Einzugsgebiet im Berliner Südwesten an. Den Termin
                  stimmen wir telefonisch ab.
                </span>
              </span>
            </label>
          </section>
        ) : (
          <p
            role="status"
            className="flex items-start gap-4 rounded-2xl border-2 border-slate-300 bg-slate-100 p-6 text-lg leading-relaxed text-slate-700"
          >
            <Info size={26} aria-hidden="true" className="mt-1 shrink-0" />
            <span>
              In der Postleitzahl {plz.trim()} kann ich die Einrichtung zu
              Hause leider nicht anbieten, sie gibt es nur in meinem
              Einzugsgebiet im Berliner Südwesten. Geliefert wird
              selbstverständlich trotzdem, und bei Fragen zur Einrichtung
              helfe ich gerne am Telefon.
            </span>
          </p>
        )
      ) : null}

      <section className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900">Lieferadresse</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
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
          <div className="sm:col-span-2">
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
            <label htmlFor="plz" className={BESCHRIFTUNG}>
              Postleitzahl
            </label>
            <input
              id="plz"
              name="plz"
              type="text"
              required
              inputMode="numeric"
              pattern="\d{5}"
              autoComplete="postal-code"
              value={plz}
              onChange={(ereignis) => setPlz(ereignis.target.value)}
              className={FELD}
            />
          </div>
          <div>
            <label htmlFor="ort" className={BESCHRIFTUNG}>
              Ort
            </label>
            <input
              id="ort"
              name="ort"
              type="text"
              required
              autoComplete="address-level2"
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
              className={FELD}
            />
          </div>
          <div>
            <label htmlFor="email" className={BESCHRIFTUNG}>
              E-Mail-Adresse
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={FELD}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="hinweis" className={BESCHRIFTUNG}>
              Anmerkung{" "}
              <span className="font-normal text-slate-600">(freiwillig)</span>
            </label>
            <textarea
              id="hinweis"
              name="hinweis"
              rows={2}
              maxLength={1000}
              className={FELD}
            />
          </div>
        </div>
        <p className="mt-4 text-base text-slate-600">
          An die E-Mail-Adresse schicke ich die Bestellbestätigung und die
          Rechnung. Telefonisch melde ich mich nur, wenn es Rückfragen gibt.
        </p>
      </section>

      {/* Die Bestellübersicht steht unmittelbar vor dem Bestellknopf – so
          verlangt es die Button-Lösung (§ 312j BGB): wesentliche Merkmale,
          Gesamtpreis und Lieferkosten direkt beim Abschluss. */}
      <section className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-7">
        <h3 className="text-2xl font-bold text-slate-900">
          Ihre Bestellung im Überblick
        </h3>
        <dl className="mt-5 flex flex-col gap-3 text-lg text-slate-800">
          <div className="flex items-baseline justify-between gap-4">
            <dt>
              {produktName}
              {preisZusatz ? ` (${preisZusatz})` : ""}
            </dt>
            <dd className="font-semibold">{preisAnzeigen(preisEuro)}</dd>
          </div>
          {einrichtungAktiv && einrichtung ? (
            <div className="flex items-baseline justify-between gap-4">
              <dt>{einrichtung.titel}</dt>
              <dd className="font-semibold">
                {preisAnzeigen(einrichtung.preisEuro)}
              </dd>
            </div>
          ) : null}
          <div className="flex items-baseline justify-between gap-4">
            <dt>Versand</dt>
            <dd className="font-semibold">
              {versandEuro === 0 ? "kostenlos" : preisAnzeigen(versandEuro)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t-2 border-blue-200 pt-3 text-xl font-bold text-slate-900">
            <dt>Gesamtpreis</dt>
            <dd>{preisAnzeigen(gesamtEuro)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-base text-slate-600">
          {UST_HINWEIS} Lieferzeit: {lieferzeit}. Sie zahlen bequem per
          Überweisung, nachdem Sie die Rechnung erhalten haben.
        </p>

        <label className="mt-6 flex cursor-pointer items-start gap-4">
          <input
            type="checkbox"
            name="rechtstexte"
            value="ja"
            required
            className="mt-1 h-7 w-7 shrink-0 rounded border-2 border-slate-400 accent-blue-700"
          />
          <span className="text-lg leading-relaxed text-slate-800">
            Ich habe die{" "}
            <Link
              href="/agb"
              target="_blank"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              AGB
            </Link>{" "}
            und die{" "}
            <Link
              href="/widerruf"
              target="_blank"
              className="font-bold text-blue-800 underline underline-offset-4"
            >
              Widerrufsbelehrung
            </Link>{" "}
            gelesen.
          </span>
        </label>

        <div className="mt-6">
          <Absenden />
        </div>
        {meldung?.art === "fehler" ? (
          <p
            role="status"
            className="mt-5 flex items-start gap-3 rounded-xl border-2 border-red-300 bg-red-50 p-4 text-lg text-red-900"
          >
            <AlertCircle
              size={24}
              aria-hidden="true"
              className="mt-1 shrink-0"
            />
            {meldung.text}
          </p>
        ) : null}
        <p className="mt-5 text-base leading-relaxed text-slate-600">
          Ihre Angaben verwende ich nur zur Abwicklung der Bestellung. Für den
          Versand gebe ich die Lieferadresse an meinen Lieferanten weiter. Mehr
          dazu steht in der{" "}
          <Link
            href="/datenschutz"
            className="underline underline-offset-4"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
      </section>
    </form>
  );
}
