import type { Metadata } from "next";
import Link from "next/link";
import { LogOut } from "lucide-react";
import {
  bannerLaeuftNoch,
  einstellungenLesen,
  type Einstellungen,
} from "../einstellungen";
import { abmeldenAktion } from "./aktionen";
import { Anmeldung, EinstellungenFormular } from "./formulare";
import { istAngemeldet, passwortIstEingerichtet } from "./sitzung";

export const metadata: Metadata = {
  title: "Verwaltung – Computerhilfe mit Till",
  robots: { index: false, follow: false },
};

// Der Anmeldestatus steckt in einem Cookie, deshalb darf diese Seite nicht
// vorab erzeugt und zwischengespeichert werden.
export const dynamic = "force-dynamic";

function beschreibeErreichbarkeit({
  telefonVersteckt,
  whatsappVersteckt,
}: Einstellungen): string {
  if (telefonVersteckt && whatsappVersteckt) {
    return "Telefon und WhatsApp sind ausgeblendet, erreichbar sind Sie per E-Mail.";
  }
  if (telefonVersteckt) {
    return "Die Telefonnummer ist ausgeblendet, WhatsApp wird angezeigt.";
  }
  if (whatsappVersteckt) {
    return "WhatsApp ist ausgeblendet, die Telefonnummer wird angezeigt.";
  }
  return "Telefon und WhatsApp werden angezeigt.";
}

function Rahmen({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-14">
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </main>
  );
}

export default async function Admin() {
  if (!passwortIstEingerichtet()) {
    return (
      <Rahmen>
        <h1 className="text-3xl font-bold text-slate-900">Verwaltung</h1>
        <p className="mt-4 rounded-xl border-2 border-amber-300 bg-amber-50 p-5 text-lg leading-relaxed text-amber-900">
          Es ist noch kein Passwort hinterlegt. Legen Sie in den Vercel-
          Projekteinstellungen die Umgebungsvariable{" "}
          <code className="rounded bg-amber-100 px-2 py-1 font-mono">
            ADMIN_PASSWORT
          </code>{" "}
          an und stoßen Sie danach eine neue Veröffentlichung an.
        </p>
      </Rahmen>
    );
  }

  if (!(await istAngemeldet())) {
    return (
      <Rahmen>
        <h1 className="text-3xl font-bold text-slate-900">Verwaltung</h1>
        <p className="mt-3 text-lg text-slate-600">
          Bitte melden Sie sich an, um Hinweisleiste und Telefonnummer zu
          ändern.
        </p>
        <Anmeldung />
      </Rahmen>
    );
  }

  const einstellungen = await einstellungenLesen();
  const leisteSichtbar = bannerLaeuftNoch(einstellungen);

  return (
    <Rahmen>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Verwaltung</h1>
        <form action={abmeldenAktion}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-3 text-lg font-semibold text-slate-800 hover:border-slate-500 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <LogOut size={20} aria-hidden="true" />
            Abmelden
          </button>
        </form>
      </div>

      <p className="mt-4 rounded-xl border-2 border-slate-200 bg-white p-5 text-lg leading-relaxed text-slate-700">
        <strong className="font-bold text-slate-900">Aktuell:</strong>{" "}
        {leisteSichtbar
          ? `Die Hinweisleiste wird angezeigt${
              einstellungen.bannerBis
                ? ` – noch bis zum ${new Date(
                    `${einstellungen.bannerBis}T12:00:00`,
                  ).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}`
                : ""
            }.`
          : "Es wird keine Hinweisleiste angezeigt."}{" "}
        {beschreibeErreichbarkeit(einstellungen)}
      </p>

      <div className="mt-8">
        <EinstellungenFormular einstellungen={einstellungen} />
      </div>

      <p className="mt-10 text-lg">
        <Link
          href="/"
          className="text-blue-800 underline underline-offset-4 hover:text-blue-900"
        >
          Zur Website
        </Link>
      </p>
    </Rahmen>
  );
}
