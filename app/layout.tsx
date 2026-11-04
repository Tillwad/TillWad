import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SITE_URL } from "./daten";
import { EinwilligungProvider } from "./einwilligung";
import { Banner } from "./banner";
import { einstellungenLesen } from "./einstellungen";
import { KontaktKontextProvider } from "./schutz-links";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Computerhilfe mit Till, bei Ihnen zu Hause",
  description:
    "Geduldige Hilfe bei Computer, Handy, Tablet, Internet und Drucker, bei Ihnen zu Hause. Alles verständlich erklärt. Rufen Sie einfach an.",
  // Weist der Google Search Console nach, dass die Domain uns gehört. Der
  // Eintrag muss dauerhaft stehen bleiben, sonst verfällt die Bestätigung
  // und die Zugriffszahlen brechen ab.
  verification: {
    google: "-bDqE2FsVsE0StfbOGTExI55VdwHGRh6OdCgudFaIBU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const einstellungen = await einstellungenLesen();

  return (
    <html lang="de">
      <body className={`${geistSans.variable} antialiased`}>
        <EinwilligungProvider>
          <KontaktKontextProvider
            telefon={!einstellungen.telefonVersteckt}
            whatsapp={!einstellungen.whatsappVersteckt}
          >
            <Banner />
            {children}
          </KontaktKontextProvider>
        </EinwilligungProvider>
      </body>
    </html>
  );
}
