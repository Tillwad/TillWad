import { Check, Trash2, X } from "lucide-react";
import { buchungenLesen, type Buchung } from "../termin/buchungen";
import { anliegenFinden, dauerBeschriften } from "../termin/konfiguration";
import { terminBeschriften } from "../termin/kalender";
import { anfrageLoeschen, anfrageStatusSetzen } from "./aktionen";

// Die Terminanfragen von der Website, als Liste im Admin-Bereich. Neue
// Anfragen stehen auf "Neu", bis Till sie nach dem Rückruf bestätigt oder
// absagt. Bestätigte und neue Anfragen blockieren ihr Zeitfenster in der
// Buchung, abgesagte geben es wieder frei.

const STATUS_ANZEIGE: Record<
  Buchung["status"],
  { text: string; klasse: string }
> = {
  offen: { text: "Neu", klasse: "bg-amber-100 text-amber-900" },
  bestaetigt: { text: "Bestätigt", klasse: "bg-green-100 text-green-900" },
  abgesagt: { text: "Abgesagt", klasse: "bg-slate-200 text-slate-700" },
};

const KNOPF =
  "inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-base font-semibold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

function Anfrage({ buchung, vorbei }: { buchung: Buchung; vorbei: boolean }) {
  const status = STATUS_ANZEIGE[buchung.status];
  const anliegen = anliegenFinden(buchung.anliegen);

  return (
    <li
      className={`rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm ${
        buchung.status === "abgesagt" ? "opacity-70" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xl font-bold text-slate-900">
          {terminBeschriften(Date.parse(buchung.beginn))}
          {vorbei ? (
            <span className="ml-2 text-base font-normal text-slate-500">
              (vorbei)
            </span>
          ) : null}
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
            {buchung.name} ·{" "}
            <a
              href={`tel:${buchung.telefon.replace(/[^\d+]/g, "")}`}
              className="text-blue-800 underline underline-offset-4"
            >
              {buchung.telefon}
            </a>
          </dt>
          <dd>
            {buchung.strasse}, {buchung.ort}
            {buchung.email ? <> · {buchung.email}</> : null}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">
            {anliegen?.titel ?? buchung.anliegen} (
            {dauerBeschriften(buchung.dauerMinuten)})
          </dt>
          <dd>{buchung.geraete.join(", ")}</dd>
        </div>
      </dl>

      <p className="mt-3 rounded-xl bg-slate-50 p-4 text-lg leading-relaxed text-slate-700">
        {buchung.problem}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {buchung.status !== "bestaetigt" ? (
          <form action={anfrageStatusSetzen}>
            <input type="hidden" name="id" value={buchung.id} />
            <input type="hidden" name="status" value="bestaetigt" />
            <button
              type="submit"
              className={`${KNOPF} border-green-700 bg-green-700 text-white hover:bg-green-800`}
            >
              <Check size={20} aria-hidden="true" />
              Bestätigen
            </button>
          </form>
        ) : null}
        {buchung.status !== "abgesagt" ? (
          <form action={anfrageStatusSetzen}>
            <input type="hidden" name="id" value={buchung.id} />
            <input type="hidden" name="status" value="abgesagt" />
            <button
              type="submit"
              className={`${KNOPF} border-slate-300 bg-white text-slate-800 hover:border-slate-500`}
            >
              <X size={20} aria-hidden="true" />
              Absagen
            </button>
          </form>
        ) : (
          <form action={anfrageLoeschen}>
            <input type="hidden" name="id" value={buchung.id} />
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

/** Lädt die Anfragen sortiert und merkt sich je Eintrag, ob er vorbei ist. */
async function anfragenLaden(): Promise<
  { buchung: Buchung; vorbei: boolean }[]
> {
  const jetzt = Date.now();
  return (await buchungenLesen())
    .sort((a, b) => Date.parse(a.beginn) - Date.parse(b.beginn))
    .map((buchung) => ({
      buchung,
      vorbei: Date.parse(buchung.beginn) < jetzt,
    }));
}

export async function Terminanfragen() {
  const buchungen = await anfragenLaden();

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-slate-900">Terminanfragen</h2>
      <p className="mt-2 text-lg text-slate-600">
        Alles, was über die Seite /termin hereinkommt. Neue und bestätigte
        Anfragen blockieren ihr Zeitfenster, abgesagte geben es wieder frei.
        Bitte übertragen Sie bestätigte Termine in Ihren Kalender.
      </p>
      {!process.env.KALENDER_ICS_URL ? (
        <p className="mt-4 rounded-xl border-2 border-amber-300 bg-amber-50 p-5 text-lg leading-relaxed text-amber-900">
          Es ist keine Kalender-Adresse hinterlegt. Legen Sie in den
          Vercel-Projekteinstellungen die Umgebungsvariable{" "}
          <code className="rounded bg-amber-100 px-2 py-1 font-mono">
            KALENDER_ICS_URL
          </code>{" "}
          mit den geheimen iCal-Adressen Ihrer Kalender an (mehrere durch
          Komma getrennt) – erst dann werden Ihre eigenen Kalendereinträge aus
          den buchbaren Terminen herausgerechnet.
        </p>
      ) : null}
      {buchungen.length === 0 ? (
        <p className="mt-5 rounded-2xl border-2 border-slate-200 bg-white p-6 text-lg text-slate-600">
          Bisher sind keine Anfragen eingegangen.
        </p>
      ) : (
        <ul className="mt-5 flex list-none flex-col gap-5">
          {buchungen.map(({ buchung, vorbei }) => (
            <Anfrage key={buchung.id} buchung={buchung} vorbei={vorbei} />
          ))}
        </ul>
      )}
    </section>
  );
}
