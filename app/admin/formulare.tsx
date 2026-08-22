"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Lock, Save } from "lucide-react";
import type { Einstellungen } from "../einstellungen";
import { anmelden, speichern, type Rueckmeldung } from "./aktionen";

function Meldung({ meldung }: { meldung: Rueckmeldung }) {
  if (!meldung) {
    return null;
  }
  const fehler = meldung.art === "fehler";
  const Symbol = fehler ? AlertCircle : CheckCircle2;
  return (
    <p
      role="status"
      className={`mt-5 flex items-start gap-3 rounded-xl border-2 p-4 text-lg ${
        fehler
          ? "border-red-300 bg-red-50 text-red-900"
          : "border-green-300 bg-green-50 text-green-900"
      }`}
    >
      <Symbol size={24} aria-hidden="true" className="mt-1 shrink-0" />
      {meldung.text}
    </p>
  );
}

function Knopf({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-700 px-7 py-4 text-xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? "Einen Moment …" : children}
    </button>
  );
}

export function Anmeldung() {
  const [meldung, aktion] = useActionState<Rueckmeldung, FormData>(
    anmelden,
    null,
  );

  return (
    <form action={aktion} className="mt-8">
      <label
        htmlFor="passwort"
        className="block text-lg font-semibold text-slate-900"
      >
        Passwort
      </label>
      <input
        id="passwort"
        name="passwort"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        className="mt-2 w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-lg focus:border-blue-700 focus:outline-4 focus:outline-offset-1 focus:outline-blue-200"
      />
      <div className="mt-5">
        <Knopf>
          <Lock size={22} aria-hidden="true" />
          Anmelden
        </Knopf>
      </div>
      <Meldung meldung={meldung} />
    </form>
  );
}

export function EinstellungenFormular({
  einstellungen,
}: {
  einstellungen: Einstellungen;
}) {
  const [meldung, aktion] = useActionState<Rueckmeldung, FormData>(
    speichern,
    null,
  );

  return (
    <form action={aktion} className="flex flex-col gap-8">
      <section className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Hinweisleiste</h2>
        <p className="mt-2 text-lg text-slate-600">
          Erscheint ganz oben auf allen Seiten. Lassen Sie das Feld leer, wenn
          keine Leiste angezeigt werden soll.
        </p>

        <label
          htmlFor="bannerText"
          className="mt-6 block text-lg font-semibold text-slate-900"
        >
          Nachricht
        </label>
        <textarea
          id="bannerText"
          name="bannerText"
          rows={3}
          maxLength={500}
          defaultValue={einstellungen.bannerText}
          placeholder="Ich bin im Urlaub und ab dem 15. September wieder für Sie da."
          className="mt-2 w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-lg focus:border-blue-700 focus:outline-4 focus:outline-offset-1 focus:outline-blue-200"
        />

        <label
          htmlFor="bannerBis"
          className="mt-6 block text-lg font-semibold text-slate-900"
        >
          Anzeigen bis einschließlich
        </label>
        <input
          id="bannerBis"
          name="bannerBis"
          type="date"
          defaultValue={einstellungen.bannerBis}
          aria-describedby="bannerBis-hinweis"
          className="mt-2 rounded-xl border-2 border-slate-300 px-4 py-3 text-lg focus:border-blue-700 focus:outline-4 focus:outline-offset-1 focus:outline-blue-200"
        />
        <p id="bannerBis-hinweis" className="mt-2 text-lg text-slate-600">
          Nach diesem Tag verschwindet die Leiste von selbst. Ohne Datum bleibt
          sie stehen, bis Sie den Text hier löschen.
        </p>
      </section>

      <section className="rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Erreichbarkeit</h2>
        <p className="mt-2 text-lg text-slate-600">
          Hier blenden Sie einzelne Kontaktwege aus. Die E-Mail-Adresse bleibt
          immer sichtbar, damit Sie erreichbar bleiben.
        </p>

        <label className="mt-6 flex items-start gap-4">
          <input
            type="checkbox"
            name="telefonVersteckt"
            value="ja"
            defaultChecked={einstellungen.telefonVersteckt}
            className="mt-1 h-7 w-7 shrink-0 rounded border-2 border-slate-400 accent-blue-700"
          />
          <span className="text-lg leading-relaxed text-slate-800">
            Telefonnummer ausblenden
          </span>
        </label>

        <label className="mt-4 flex items-start gap-4">
          <input
            type="checkbox"
            name="whatsappVersteckt"
            value="ja"
            defaultChecked={einstellungen.whatsappVersteckt}
            className="mt-1 h-7 w-7 shrink-0 rounded border-2 border-slate-400 accent-blue-700"
          />
          <span className="text-lg leading-relaxed text-slate-800">
            WhatsApp ausblenden
          </span>
        </label>
      </section>

      <div>
        <Knopf>
          <Save size={22} aria-hidden="true" />
          Speichern
        </Knopf>
        <Meldung meldung={meldung} />
      </div>
    </form>
  );
}
