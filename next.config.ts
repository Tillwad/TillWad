import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

// Die alte Domain leitet pfadgenau auf die neue weiter: tillwadehn.de/termin
// landet also auf computerhilfe-till.de/termin und nicht auf der Startseite.
// Nur so geben die alten Adressen ihre Platzierungen bei Google weiter.
//
// Die Weiterleitung muss dauerhaft bestehen bleiben, auch Jahre nach dem
// Umzug: Auf gedruckten Flyern und Visitenkarten steht die alte Adresse,
// und verlinkt ist sie ebenfalls noch an vielen Stellen.
//
// Wichtig: portal.tillwadehn.de ist Tills CRM auf einem eigenen Server und
// hat mit dieser Anwendung nichts zu tun. Die Regeln nennen die beiden Hosts
// deshalb ausdrücklich, statt alles unter tillwadehn.de zu erfassen.
const ALTE_HOSTS = ["www.tillwadehn.de", "tillwadehn.de"];

const NEUE_ADRESSE = "https://www.computerhilfe-till.de";

const nextConfig: NextConfig = {
  async redirects() {
    return ALTE_HOSTS.map((host) => ({
      source: "/:pfad*",
      has: [{ type: "host" as const, value: host }],
      destination: `${NEUE_ADRESSE}/:pfad*`,
      permanent: true,
    }));
  },
};

// withBotId richtet die Weiterleitungen für die Bot-Erkennung von Vercel ein,
// damit Werbeblocker deren Skript nicht aushebeln. Geschützt wird damit das
// Buchungsformular unter /termin, siehe instrumentation-client.ts.
export default withBotId(nextConfig);
