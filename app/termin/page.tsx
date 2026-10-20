import type { Metadata } from "next";
import { PhoneCall, CalendarCheck, Home as HomeIcon } from "lucide-react";
import { orte } from "../daten";
import { KopfZeile, FussZeile } from "../komponenten";
import { freieTermineBerechnen } from "./kalender";
import { zeitstempelErzeugen } from "./schutz";
import { TerminFormular } from "./formular";

export const metadata: Metadata = {
  title: "Termin online buchen | Computerhilfe mit Till",
  description:
    "Buchen Sie Ihren Hausbesuch online: Anliegen und Geräte angeben, freien Termin aussuchen, fertig. Ich bestätige den Termin telefonisch.",
  alternates: {
    canonical: "/termin",
  },
};

// Welche Termine frei sind, hängt vom Augenblick des Aufrufs ab. Diese Seite
// darf deshalb nicht vorab gebaut und eingefroren werden.
export const dynamic = "force-dynamic";

const schritte = [
  {
    icon: CalendarCheck,
    text: "Sie wählen hier einen Termin aus, der Ihnen passt.",
  },
  {
    icon: PhoneCall,
    text: "Ich rufe Sie kurz an und bestätige den Termin.",
  },
  {
    icon: HomeIcon,
    text: "Ich komme zu Ihnen nach Hause und löse das Problem.",
  },
];

export default async function Termin() {
  const termine = await freieTermineBerechnen();

  return (
    <>
      <a href="#inhalt" className="skip-link">
        Direkt zum Inhalt springen
      </a>

      <KopfZeile />

      <main id="inhalt" className="bg-slate-50 px-5 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Termin online buchen
          </h1>
          <div
            aria-hidden="true"
            className="mt-4 h-2 w-28 rounded-full bg-amber-400"
          />
          <p className="mt-5 text-xl leading-relaxed text-slate-700">
            Hier machen Sie in wenigen Schritten einen Hausbesuch aus, ganz
            ohne Hin und Her. Und so geht es weiter:
          </p>

          <ol className="mt-6 flex list-none flex-col gap-4">
            {schritte.map((schritt, nummer) => (
              <li
                key={schritt.text}
                className="flex items-center gap-4 text-lg leading-relaxed text-slate-700"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <schritt.icon size={24} aria-hidden="true" />
                </span>
                <span>
                  <strong className="font-bold text-slate-900">
                    {nummer + 1}.
                  </strong>{" "}
                  {schritt.text}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <TerminFormular
              termine={termine}
              ortsNamen={orte.map((ort) => ort.name)}
              zeitstempel={zeitstempelErzeugen()}
            />
          </div>
        </div>
      </main>

      <FussZeile />
    </>
  );
}
