import type { Bestellung } from "./bestellungen";

// Die Anbindung an den Großhändler (Kosatec) steckt hinter dieser einen
// Schnittstelle. Im Testlauf bestellt Till von Hand im Kosatec-Shop; später
// soll die Bestellung automatisch über deren API hinausgehen. Dann kommt hier
// eine zweite Umsetzung dazu, und der Rest des Shops bleibt unverändert.

export type UebermittlungsErgebnis = {
  /** true, wenn die Bestellung automatisch beim Großhändler gelandet ist. */
  uebermittelt: boolean;
  /** Was mit der Bestellung passiert ist bzw. noch passieren muss. */
  hinweis: string;
};

export interface Grosshaendler {
  name: string;
  bestellungUebermitteln(
    bestellung: Bestellung,
  ): Promise<UebermittlungsErgebnis>;
}

/**
 * Der Handbetrieb für den Testlauf: Es wird nichts übermittelt, die
 * Bestellung wartet unter /admin darauf, dass Till sie bei Kosatec aufgibt.
 */
const manuell: Grosshaendler = {
  name: "Kosatec (manuell)",
  async bestellungUebermitteln() {
    return {
      uebermittelt: false,
      hinweis: "Bitte von Hand im Kosatec-Shop bestellen.",
    };
  },
};

/** Der aktuell aktive Weg zum Großhändler. */
export const grosshaendler: Grosshaendler = manuell;
