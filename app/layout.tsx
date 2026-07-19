import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SITE_URL } from "./daten";
import { CookieHinweis } from "./cookie-hinweis";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "IT-Hilfe von Till – Computerhilfe für Ihre Nachbarschaft",
  description:
    "Geduldige Hilfe bei Computer, Handy, Tablet, Internet und Drucker – bei Ihnen zu Hause. Verständlich erklärt, ohne Fachchinesisch. Rufen Sie einfach an.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <CookieHinweis />
      </body>
    </html>
  );
}
