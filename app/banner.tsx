import { Info } from "lucide-react";
import { bannerLaeuftNoch, einstellungenLesen } from "./einstellungen";

/**
 * Hinweisleiste ganz oben auf jeder Seite, zum Beispiel für eine
 * Urlaubsankündigung. Inhalt und Laufzeit werden unter /admin gepflegt.
 */
export async function Banner() {
  const einstellungen = await einstellungenLesen();
  if (!bannerLaeuftNoch(einstellungen)) {
    return null;
  }

  return (
    <aside
      aria-label="Wichtiger Hinweis"
      className="border-b-4 border-amber-500 bg-amber-100 px-5 py-5"
    >
      <p className="mx-auto flex w-full max-w-5xl items-start gap-4 text-xl font-semibold leading-relaxed text-amber-950">
        <Info size={30} aria-hidden="true" className="mt-1 shrink-0" />
        {einstellungen.bannerText}
      </p>
    </aside>
  );
}
