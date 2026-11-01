import { Check, PackageCheck, Trash2, X } from "lucide-react";
import { bestellungenLesen, type Bestellung } from "../shop/bestellungen";
import { preisAnzeigen } from "../shop/konfiguration";

import { bestellungStatusAktion, bestellungLoeschenAktion } from "./aktionen";

// Die Bestellungen aus dem Shop, als Liste im Admin-Bereich. Der Ablauf im
// Handbetrieb: Neue Bestellung → Till bestellt die Ware bei Kosatec und
// schickt dem Kunden die Bestellbestätigung per E-Mail → "Bestätigt" →
// Ware ist raus → "Versendet". Storniert wird bei Widerruf oder Absprache.

const STATUS_ANZEIGE: Record<
  Bestellung["status"],
  { text: string; klasse: string }
> = {
  neu: { text: "Neu", klasse: "bg-amber-100 text-amber-900" },
  bestaetigt: { text: "Bestätigt", klasse: "bg-blue-100 text-blue-900" },
  versendet: { text: "Versendet", klasse: "bg-green-100 text-green-900" },
  storniert: { text: "Storniert", klasse: "bg-slate-200 text-slate-700" },
};

const KNOPF =
  "inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-base font-semibold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

function StatusKnopf({
  id,
  status,
  children,
  klasse,
}: {
  id: string;
  status: Bestellung["status"];
  children: React.ReactNode;
  klasse: string;
}) {
  return (
    <form action={bestellungStatusAktion}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className={`${KNOPF} ${klasse}`}>
        {children}
      </button>
    </form>
  );
}

function BestellKarte({ bestellung }: { bestellung: Bestellung }) {
  const status = STATUS_ANZEIGE[bestellung.status];

  return (
    <li
      className={`rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm ${
        bestellung.status === "storniert" ? "opacity-70" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xl font-bold text-slate-900">
          {bestellung.nummer} ·{" "}
          {new Date(bestellung.erstellt).toLocaleDateString("de-DE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <span
          className={`rounded-full px-4 py-1 text-base font-semibold ${status.klasse}`}
        >
          {status.text}
        </span>
      </div>

      <dl className="mt-4 grid gap-x-8 gap-y-2 text-lg text-slate-700 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-900">
            {bestellung.produktName}
            {bestellung.einrichtungGebucht ? " + Einrichtung" : ""}
          </dt>
          <dd>
            Gesamt {preisAnzeigen(bestellung.gesamtEuro)} (Ware{" "}
            {preisAnzeigen(bestellung.produktPreisEuro)}
            {bestellung.einrichtungGebucht
              ? `, Einrichtung ${preisAnzeigen(bestellung.einrichtungPreisEuro)}`
              : ""}
            , Versand{" "}
            {bestellung.versandEuro === 0
              ? "frei"
              : preisAnzeigen(bestellung.versandEuro)}
            )
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">
            {bestellung.name} ·{" "}
            <a
              href={`tel:${bestellung.telefon.replace(/[^\d+]/g, "")}`}
              className="text-blue-800 underline underline-offset-4"
            >
              {bestellung.telefon}
            </a>
          </dt>
          <dd>
            {bestellung.strasse}, {bestellung.plz} {bestellung.ort}
            <br />
            <a
              href={`mailto:${bestellung.email}`}
              className="text-blue-800 underline underline-offset-4"
            >
              {bestellung.email}
            </a>
          </dd>
        </div>
      </dl>

      {bestellung.hinweis ? (
        <p className="mt-3 rounded-xl bg-slate-50 p-4 text-lg leading-relaxed text-slate-700">
          {bestellung.hinweis}
        </p>
      ) : null}

      {bestellung.status === "neu" ? (
        <p className="mt-3 rounded-xl border-2 border-amber-300 bg-amber-50 p-4 text-lg leading-relaxed text-amber-900">
          Zu erledigen: Ware bei Kosatec bestellen und dem Kunden die
          Bestellbestätigung mit Widerrufsbelehrung per E-Mail schicken, dann
          hier auf „Bestätigt“ setzen.
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3">
        {bestellung.status === "neu" ? (
          <StatusKnopf
            id={bestellung.id}
            status="bestaetigt"
            klasse="border-blue-700 bg-blue-700 text-white hover:bg-blue-800"
          >
            <Check size={20} aria-hidden="true" />
            Bestätigt
          </StatusKnopf>
        ) : null}
        {bestellung.status === "bestaetigt" ? (
          <StatusKnopf
            id={bestellung.id}
            status="versendet"
            klasse="border-green-700 bg-green-700 text-white hover:bg-green-800"
          >
            <PackageCheck size={20} aria-hidden="true" />
            Versendet
          </StatusKnopf>
        ) : null}
        {bestellung.status !== "storniert" ? (
          <StatusKnopf
            id={bestellung.id}
            status="storniert"
            klasse="border-slate-300 bg-white text-slate-800 hover:border-slate-500"
          >
            <X size={20} aria-hidden="true" />
            Stornieren
          </StatusKnopf>
        ) : (
          <form action={bestellungLoeschenAktion}>
            <input type="hidden" name="id" value={bestellung.id} />
            <button
              type="submit"
              className={`${KNOPF} border-red-300 bg-white text-red-800 hover:border-red-600`}
            >
              <Trash2 size={20} aria-hidden="true" />
              Endgültig löschen
            </button>
          </form>
        )}
      </div>
    </li>
  );
}

export async function Bestellungen() {
  const bestellungen = (await bestellungenLesen()).sort(
    (a, b) => Date.parse(b.erstellt) - Date.parse(a.erstellt),
  );

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-slate-900">Bestellungen</h2>
      <p className="mt-2 text-lg text-slate-600">
        Alles, was über den Shop hereinkommt. Neue Bestellungen müssen von
        Hand bei Kosatec aufgegeben und dem Kunden per E-Mail bestätigt
        werden.
      </p>
      {bestellungen.length === 0 ? (
        <p className="mt-5 rounded-2xl border-2 border-slate-200 bg-white p-6 text-lg text-slate-600">
          Bisher sind keine Bestellungen eingegangen.
        </p>
      ) : (
        <ul className="mt-5 flex list-none flex-col gap-5">
          {bestellungen.map((bestellung) => (
            <BestellKarte key={bestellung.id} bestellung={bestellung} />
          ))}
        </ul>
      )}
    </section>
  );
}
