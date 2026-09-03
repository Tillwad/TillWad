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
  title: "Computerhilfe mit Till – bei Ihnen zu Hause",
  description:
    "Geduldige Hilfe bei Computer, Handy, Tablet, Internet und Drucker – bei Ihnen zu Hause. Verständlich erklärt, ohne Fachchinesisch. Rufen Sie einfach an.",
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
