"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Google Analytics setzt Cookies und überträgt Daten an Google. In Deutschland
// braucht das eine vorherige Einwilligung (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1
// lit. a DSGVO). Deshalb wird das Google-Skript hier erst geladen, nachdem
// jemand zugestimmt hat – vorher wird nichts nachgeladen und nichts gesetzt.

const MESS_ID = "G-82GS7V5GJ6";
const SPEICHER = "einwilligung-analyse";

export type Einwilligung = "unbekannt" | "erteilt" | "abgelehnt";

type Steuerung = {
  stand: Einwilligung;
  /** Erst wahr, wenn der gespeicherte Stand im Browser gelesen wurde. */
  geladen: boolean;
  entscheiden: (neu: Exclude<Einwilligung, "unbekannt">) => void;
  zuruecksetzen: () => void;
};

const EinwilligungKontext = createContext<Steuerung>({
  stand: "unbekannt",
  geladen: false,
  entscheiden: () => {},
  zuruecksetzen: () => {},
});

export function useEinwilligung() {
  return useContext(EinwilligungKontext);
}

function lesen(): Einwilligung {
  try {
    const wert = window.localStorage.getItem(SPEICHER);
    return wert === "erteilt" || wert === "abgelehnt" ? wert : "unbekannt";
  } catch {
    return "unbekannt";
  }
}

/**
 * Entfernt die von Google Analytics gesetzten Cookies. Wird beim Widerruf
 * aufgerufen, damit nicht nur das Nachladen aufhört, sondern auch die schon
 * gesetzten Kennungen verschwinden.
 */
function analyseCookiesLoeschen() {
  const heute = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  // Google setzt _ga sowie _ga_<MESS-ID>. Beide können auf der Domain selbst
  // oder auf der übergeordneten Domain liegen, deshalb beide Varianten.
  const domain = window.location.hostname;
  const uebergeordnet = `.${domain.split(".").slice(-2).join(".")}`;
  for (const name of document.cookie
    .split(";")
    .map((eintrag) => eintrag.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"))) {
    document.cookie = `${name}=; ${heute}; path=/`;
    document.cookie = `${name}=; ${heute}; path=/; domain=${domain}`;
    document.cookie = `${name}=; ${heute}; path=/; domain=${uebergeordnet}`;
  }
}

/**
 * Meldet ein Ereignis an Google Analytics. Ohne Einwilligung ist gtag gar
 * nicht geladen – dann passiert hier nichts, und der Aufruf schadet auch
 * nicht. So müssen die Schaltflächen selbst nichts über den Stand wissen.
 */
export function ereignisMelden(
  name: string,
  parameter?: Record<string, string>,
) {
  if (typeof window === "undefined") {
    return;
  }
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag === "function") {
    gtag("event", name, parameter);
  }
}

export function EinwilligungProvider({ children }: { children: ReactNode }) {
  const [stand, setStand] = useState<Einwilligung>("unbekannt");
  // Vor dem ersten Rendern im Browser ist der gespeicherte Stand unbekannt.
  // Ohne dieses Merkmal würde der Banner kurz aufblitzen, obwohl längst
  // entschieden wurde.
  const [geladen, setGeladen] = useState(false);

  useEffect(() => {
    setStand(lesen());
    setGeladen(true);
  }, []);

  // Nach einem Widerruf bleibt das Google-Skript im laufenden Tab geladen –
  // beim Wechsel auf eine andere Seite lädt Next.js die Seite ja nicht neu.
  // Ohne diesen Schalter würde also weiter gemessen, bis jemand die Seite
  // vollständig neu lädt. Der Name der Variablen ist von Google so
  // vorgegeben.
  useEffect(() => {
    (window as unknown as Record<string, boolean>)[`ga-disable-${MESS_ID}`] =
      stand !== "erteilt";
  }, [stand]);

  const entscheiden = useCallback((neu: Exclude<Einwilligung, "unbekannt">) => {
    try {
      window.localStorage.setItem(SPEICHER, neu);
    } catch {
      // Kein Speicher verfügbar: Die Entscheidung gilt dann nur für diesen
      // Besuch. Das ist unschön, aber besser als gar nicht zu funktionieren.
    }
    if (neu === "abgelehnt") {
      analyseCookiesLoeschen();
    }
    setStand(neu);
  }, []);

  const zuruecksetzen = useCallback(() => {
    try {
      window.localStorage.removeItem(SPEICHER);
    } catch {
      // siehe oben
    }
    analyseCookiesLoeschen();
    setStand("unbekannt");
  }, []);

  return (
    <EinwilligungKontext.Provider
      value={{ stand, geladen, entscheiden, zuruecksetzen }}
    >
      <AnalyseWennErlaubt stand={stand} />
      {children}
      {geladen ? <Einwilligungsbanner /> : null}
    </EinwilligungKontext.Provider>
  );
}

/**
 * Im Verwaltungsbereich wird nichts gemessen: Dort ist nur Till selbst
 * unterwegs, und seine eigenen Aufrufe sollen die Statistik nicht verfälschen.
 */
function AnalyseWennErlaubt({ stand }: { stand: Einwilligung }) {
  const pfad = usePathname();
  if (stand !== "erteilt" || pfad?.startsWith("/admin")) {
    return null;
  }
  return <Analyse />;
}

function Analyse() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MESS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${MESS_ID}');
        `}
      </Script>
    </>
  );
}

function Einwilligungsbanner() {
  const { stand, entscheiden } = useEinwilligung();
  const pfad = usePathname();

  // Im Verwaltungsbereich wird nichts gemessen, dort braucht es die Frage
  // also auch nicht.
  if (stand !== "unbekannt" || pfad?.startsWith("/admin")) {
    return null;
  }

  return (
    <section
      role="region"
      aria-label="Frage zur Datenerhebung"
      className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-blue-700 bg-white px-5 py-6 shadow-[0_-8px_30px_rgba(15,23,42,0.15)]"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <p className="text-lg leading-relaxed text-slate-800">
          <strong className="font-bold">Darf ich mitzählen?</strong> Ich würde
          gerne anonym erfassen, welche Seiten besucht werden, um mein Angebot
          zu verbessern. Dafür nutze ich Google Analytics, das Cookies setzt und
          Daten an Google überträgt. Das ist freiwillig – die Website
          funktioniert ohne Zustimmung genauso. Mehr dazu in der{" "}
          <Link
            href="/datenschutz"
            className="font-bold text-blue-800 underline underline-offset-4"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
        {/* Beide Schaltflächen sind bewusst gleich groß: Ablehnen darf nicht
            schwerer fallen als Zustimmen. */}
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => entscheiden("abgelehnt")}
            className="rounded-xl border-2 border-slate-500 bg-white px-8 py-4 text-xl font-bold text-slate-900 hover:border-slate-700 hover:bg-slate-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
          >
            Nein, danke
          </button>
          <button
            type="button"
            onClick={() => entscheiden("erteilt")}
            className="rounded-xl border-2 border-blue-700 bg-blue-700 px-8 py-4 text-xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Einverstanden
          </button>
        </div>
      </div>
    </section>
  );
}

/**
 * Zeigt die getroffene Entscheidung und lässt sie jederzeit ändern. Steht in
 * der Datenschutzerklärung, damit der Widerruf so einfach ist wie die
 * Zustimmung.
 */
export function EinwilligungSteuerung() {
  const { stand, geladen, entscheiden, zuruecksetzen } = useEinwilligung();

  // Vor dem Lesen im Browser wäre jede Aussage über den Stand geraten.
  if (!geladen) {
    return null;
  }

  return (
    <div className="mt-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-6">
      <p className="text-lg leading-relaxed text-slate-800">
        {stand === "erteilt"
          ? "Sie haben der anonymen Besuchsmessung zugestimmt."
          : stand === "abgelehnt"
            ? "Sie haben die anonyme Besuchsmessung abgelehnt. Es wird nichts gemessen."
            : "Sie haben sich noch nicht entschieden. Bis dahin wird nichts gemessen."}
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        {stand === "erteilt" ? (
          <button
            type="button"
            onClick={() => entscheiden("abgelehnt")}
            className="rounded-xl border-2 border-slate-500 bg-white px-6 py-3 text-lg font-bold text-slate-900 hover:border-slate-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
          >
            Einwilligung widerrufen
          </button>
        ) : (
          <button
            type="button"
            onClick={() => entscheiden("erteilt")}
            className="rounded-xl border-2 border-blue-700 bg-blue-700 px-6 py-3 text-lg font-bold text-white hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Jetzt zustimmen
          </button>
        )}
        {stand !== "unbekannt" ? (
          <button
            type="button"
            onClick={zuruecksetzen}
            className="rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-lg font-semibold text-slate-700 hover:border-slate-500 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
          >
            Erneut fragen
          </button>
        ) : null}
      </div>
    </div>
  );
}
