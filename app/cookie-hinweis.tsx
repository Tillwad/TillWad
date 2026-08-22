"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-hinweis-bestaetigt";

export function CookieHinweis() {
  const [sichtbar, setSichtbar] = useState(false);
  // Der Verwaltungsbereich setzt sehr wohl ein Cookie (für die Anmeldung).
  // Dort wäre der Hinweis also schlicht falsch – und da ihn ohnehin nur Till
  // zu sehen bekäme, bleibt er auf diesen Seiten weg.
  const pfad = usePathname();

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setSichtbar(true);
      }
    } catch {
      setSichtbar(true);
    }
  }, []);

  if (!sichtbar || pfad?.startsWith("/admin")) {
    return null;
  }

  const schliessen = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "ja");
    } catch {
      // Wenn der Speicher nicht verfügbar ist, wird der Hinweis nur für diesen Besuch geschlossen.
    }
    setSichtbar(false);
  };

  return (
    <section
      role="region"
      aria-label="Hinweis zu Cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-blue-700 bg-white px-5 py-5 shadow-[0_-8px_30px_rgba(15,23,42,0.15)]"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:gap-8 sm:text-left">
        <p className="text-lg leading-relaxed text-slate-800">
          <strong>Gut zu wissen:</strong> Diese Website verwendet keine
          Cookies und sammelt keine Daten über Sie. Mehr dazu in der{" "}
          <Link
            href="/datenschutz"
            className="font-bold text-blue-800 underline underline-offset-4"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={schliessen}
          className="shrink-0 rounded-xl bg-blue-700 px-8 py-4 text-xl font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Alles klar
        </button>
      </div>
    </section>
  );
}
