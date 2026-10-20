import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  /* config options here */
};

// withBotId richtet die Weiterleitungen für die Bot-Erkennung von Vercel ein,
// damit Werbeblocker deren Skript nicht aushebeln. Geschützt wird damit das
// Buchungsformular unter /termin, siehe instrumentation-client.ts.
export default withBotId(nextConfig);
