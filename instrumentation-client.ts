import { initBotId } from "botid/client/core";

// Bot-Erkennung von Vercel (BotID): Vor dem Absenden des Buchungsformulars
// sammelt ein unsichtbares Skript Signale dafür, dass ein echter Browser mit
// einem echten Menschen davor am Werk ist. Die Server-Action unter /termin
// prüft das Ergebnis mit checkBotId(), siehe app/termin/aktionen.ts.
//
// Geschützt wird der POST auf /termin – dorthin schickt der Browser die
// Server-Action des Buchungsformulars – sowie die Produktseiten unter /shop,
// von denen aus das Bestellformular abgeschickt wird.
initBotId({
  protect: [
    {
      path: "/termin",
      method: "POST",
    },
    {
      path: "/shop/*",
      method: "POST",
    },
  ],
});
