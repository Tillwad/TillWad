"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, X } from "lucide-react";
import { useEinwilligung } from "./einwilligung";

/**
 * Hinweis für Firmenbesucher, mit Verweis auf dgtill.com.
 *
 * Warum überhaupt: Laut Search Console steht die Seite auf der neuen Domain
 * für "it-unterstützung", "it-dienste" und "it notfallhilfe" auf Platz 1.
 * Das sind Begriffe, die Firmen eingeben, nicht Privatleute. Diese Besucher
 * landen auf /it-hilfe und finden dort ein Angebot, das ausdrücklich für
 * Privatpersonen gedacht ist. Statt sie wieder wegklicken zu lassen, zeigt
 * ihnen dieser Hinweis den Weg zur B2B-Marke.
 *
 * Warum eine Einblendung unten in der Ecke und kein Fenster über der Seite:
 * Google wertet Einblendungen ab, die beim Einstieg aus der Suche den Inhalt
 * verdecken, und die Hauptzielgruppe dieser Website sind ältere Menschen,
 * die ein aufspringendes Fenster eher verunsichert. Diese Fassung verdeckt
 * nichts, ist mit einer einzigen Schaltfläche weg und kommt danach nicht
 * wieder.
 *
 * Eingebunden ist der Hinweis auf der Startseite, auf /it-hilfe und auf den
 * acht Ortsseiten, also überall dort, wo Firmen ankommen können. Bewusst
 * NICHT auf /computerhilfe-senioren und den Themenseiten: Wer dort landet,
 * sucht sicher keine Firmen-IT, und der Hinweis wäre nur im Weg.
 *
 * Dass jemand ihn weggeklickt hat, merkt sich der Browser seitenübergreifend.
 * Wer ihn auf der Startseite schließt, bekommt ihn auf der Ortsseite nicht
 * noch einmal zu sehen.
 */

/** Hier merkt sich der Browser, dass der Hinweis schon weggeklickt wurde. */
const SPEICHER_SCHLUESSEL = "firmenhinweis-gesehen";

/**
 * So lange bleibt der Hinweis aus. Nicht sofort beim Laden: Wer gerade erst
 * angekommen ist, liest noch die Überschrift. Nach ein paar Sekunden hat
 * sich außerdem der Cookie-Hinweis meist erledigt.
 */
const VERZOEGERUNG_MS = 6000;

export function FirmenHinweis() {
  const [sichtbar, setSichtbar] = useState(false);
  const [eingeblendet, setEingeblendet] = useState(false);
  const { stand } = useEinwilligung();

  // Der Cookie-Hinweis liegt unten über die volle Breite (siehe
  // app/einwilligung.tsx). Solange er steht, bleibt dieser Hinweis weg,
  // sonst stapeln sich zwei Kästen übereinander.
  const cookieHinweisSteht = stand === "unbekannt";

  useEffect(() => {
    if (cookieHinweisSteht) return;

    try {
      if (window.localStorage.getItem(SPEICHER_SCHLUESSEL)) return;
    } catch {
      // Privater Modus oder gesperrter Speicher: Dann wird der Hinweis
      // eben jedes Mal gezeigt. Das ist besser, als gar nichts anzuzeigen.
    }

    const uhr = window.setTimeout(() => setSichtbar(true), VERZOEGERUNG_MS);
    return () => window.clearTimeout(uhr);
  }, [cookieHinweisSteht]);

  // Erst einbauen, dann im nächsten Bild einblenden: Nur so läuft der
  // Übergang, statt dass der Kasten einfach da ist.
  useEffect(() => {
    if (!sichtbar) return;
    const bild = window.requestAnimationFrame(() => setEingeblendet(true));
    return () => window.cancelAnimationFrame(bild);
  }, [sichtbar]);

  function schliessen() {
    setEingeblendet(false);
    try {
      window.localStorage.setItem(SPEICHER_SCHLUESSEL, "ja");
    } catch {
      // siehe oben
    }
    window.setTimeout(() => setSichtbar(false), 200);
  }

  if (!sichtbar) return null;

  return (
    <aside
      aria-labelledby="firmenhinweis-titel"
      className={`fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-xs rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-[0_8px_40px_rgba(15,23,42,0.18)] transition-all duration-200 motion-reduce:transition-none sm:bottom-6 sm:right-6 ${
        eingeblendet
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 motion-reduce:translate-y-0"
      }`}
    >
      <button
        type="button"
        onClick={schliessen}
        aria-label="Hinweis schließen"
        className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        <X size={24} aria-hidden="true" />
      </button>

      {/* Symbol neben der Überschrift statt darüber: Der Kasten steht in der
          Ecke und darf den Seiteninhalt nicht unnötig verdecken, also zählt
          jede eingesparte Zeile. */}
      <h2
        id="firmenhinweis-titel"
        className="flex items-start gap-3 pr-8 text-xl font-bold leading-tight text-slate-900"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <Building2 size={22} aria-hidden="true" />
        </span>
        Sie suchen IT-Hilfe für Ihre Firma?
      </h2>

      <p className="mt-3 text-base leading-relaxed text-slate-700">
        Diese Seite ist für Privathaushalte. Für Unternehmen arbeite ich mit
        dgtill zusammen: IT-Betreuung, Webseiten und KI.
      </p>

      <a
        href="https://dgtill.com"
        target="_blank"
        rel="noopener"
        onClick={schliessen}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-base font-bold text-white shadow-md hover:bg-blue-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        Zum Angebot für Firmen
        {/* Der sichtbare Hinweis auf den neuen Tab ist bewusst weg, der
            Kasten soll knapp bleiben. Für Screenreader bleibt die Ansage
            trotzdem stehen: Ein unangekündigt springender Tab ist sonst
            genau die Art Überraschung, die Leute verliert. */}
        <span className="sr-only">, öffnet dgtill.com in einem neuen Tab</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </a>
    </aside>
  );
}
