"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ereignisMelden } from "./einwilligung";

// Welche Kontaktwege angezeigt werden, entscheidet Till unter /admin. Telefon
// und WhatsApp lassen sich getrennt abschalten. Die Werte werden im Layout
// gelesen und hier über den Kontext an alle Schaltflächen weitergereicht – so
// muss sie nicht jede Seite einzeln durchschleifen.
type Kontaktwege = { telefon: boolean; whatsapp: boolean };

const KontaktKontext = createContext<Kontaktwege>({
  telefon: true,
  whatsapp: true,
});

export function KontaktKontextProvider({
  telefon,
  whatsapp,
  children,
}: Kontaktwege & { children: ReactNode }) {
  return (
    <KontaktKontext.Provider value={{ telefon, whatsapp }}>
      {children}
    </KontaktKontext.Provider>
  );
}

/**
 * Zeigt seinen Inhalt nur, wenn die Telefonnummer sichtbar sein soll. Damit
 * lassen sich auch die Sätze rund um die Schaltflächen ausblenden, die ohne
 * Telefonnummer keinen Sinn ergeben.
 */
export function WennTelefonSichtbar({ children }: { children: ReactNode }) {
  return useContext(KontaktKontext).telefon ? <>{children}</> : null;
}

/** Das Gegenstück: Inhalt nur zeigen, solange die Telefonnummer aus ist. */
export function WennTelefonNichtSichtbar({
  children,
}: {
  children: ReactNode;
}) {
  return useContext(KontaktKontext).telefon ? null : <>{children}</>;
}

/**
 * Nur anzeigen, wenn weder Telefon noch WhatsApp erreichbar sind – dann
 * braucht es an prominenter Stelle einen Ersatz, damit die Seite nicht ganz
 * ohne Kontaktmöglichkeit dasteht.
 */
export function WennKeinSofortkontakt({ children }: { children: ReactNode }) {
  const { telefon, whatsapp } = useContext(KontaktKontext);
  return telefon || whatsapp ? null : <>{children}</>;
}

// Die Kontaktdaten sind Base64-kodiert und werden erst im Browser dekodiert.
// So stehen Telefonnummer und E-Mail-Adresse weder im HTML noch im Klartext
// im JavaScript und können von Spam-Robotern nicht abgesammelt werden.
// Neue Werte erzeugen mit: btoa("...") in der Browser-Konsole.
const TEL_ANZEIGE_B64 = "MDE3NCAvIDcyMSAxNyAwNA==";
const TEL_HREF_B64 = "dGVsOis0OTE3NDcyMTE3MDQ=";
const MAIL_B64 = "dGlsbC53YWRlaG5AZGd0aWxsLmNvbQ==";
const MAIL_HREF_B64 = "bWFpbHRvOnRpbGwud2FkZWhuQGRndGlsbC5jb20=";
const WHATSAPP_B64 = "aHR0cHM6Ly93YS5tZS80OTE3NDcyMTE3MDQ=";
const WHATSAPP_TEXT = "Hallo Till, ich brauche Hilfe mit meiner Technik.";

function telefonAnzeige() {
  return window.atob(TEL_ANZEIGE_B64);
}

function telefonHref() {
  return window.atob(TEL_HREF_B64);
}

function mailAdresse() {
  return window.atob(MAIL_B64);
}

function whatsappHref() {
  return (
    window.atob(WHATSAPP_B64) + "?text=" + encodeURIComponent(WHATSAPP_TEXT)
  );
}

/**
 * Wo auf der Seite eine Kontakt-Schaltfläche steht. Wird als Parameter an die
 * Besuchsmessung übergeben, damit erkennbar ist, welche Schaltfläche tatsächlich
 * benutzt wird – die in der Kopfzeile oder die weiter unten.
 *
 * Damit das in Google Analytics sichtbar wird, muss "bereich" dort einmalig als
 * benutzerdefinierte Dimension angelegt werden (Verwaltung → Benutzerdefinierte
 * Definitionen). Ohne diesen Schritt kommen die Ereignisse trotzdem an, nur
 * lässt sich nicht nach Bereich aufschlüsseln.
 */
export type Bereich = "kopfzeile" | "hero" | "kontakt" | "rechtliches";

type SchutzLinkProps = {
  /** Pflichtangabe, damit keine Schaltfläche ohne Herkunft gemessen wird. */
  bereich: Bereich;
  className?: string;
  children: ReactNode;
};

// Bewusst ein Button statt eines Links: Das Ziel wird erst beim Klick
// dekodiert und geöffnet und steht daher zu keinem Zeitpunkt im Quellcode
// oder im Seiten-DOM.
function SchutzKnopf({
  macheZiel,
  kontaktweg,
  bereich,
  neuerTab = false,
  className,
  children,
}: SchutzLinkProps & {
  macheZiel: () => string;
  /** Welcher Kontaktweg – bestimmt den Namen des gemeldeten Ereignisses. */
  kontaktweg: "telefon" | "whatsapp" | "email";
  neuerTab?: boolean;
}) {
  const oeffnen = () => {
    // Dass die Kontaktdaten kodiert sind, stört die Messung nicht: Gezählt
    // wird der Klick, nicht das Ziel. Ohne Einwilligung ist gtag nicht
    // geladen und der Aufruf verpufft folgenlos.
    //
    // Zwei Meldungen pro Klick, mit Absicht:
    // - Ein eigener Name je Kontaktweg. Der ist in den Berichten sofort
    //   lesbar, ganz ohne zusätzliche Einrichtung in Google Analytics.
    // - Zusätzlich generate_lead, ein von Google vordefiniertes Ereignis.
    //   Darüber laufen alle Kontaktaufnahmen zusammen, sodass eine einzige
    //   Zahl sagt, wie oft jemand Kontakt aufgenommen hat.
    ereignisMelden(`${kontaktweg}_klick`, { bereich });
    ereignisMelden("generate_lead", { kontaktweg, bereich });
    const ziel = macheZiel();
    if (neuerTab) {
      window.open(ziel, "_blank", "noopener");
    } else {
      window.location.href = ziel;
    }
  };

  return (
    <button
      type="button"
      onClick={oeffnen}
      className={`cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

// Telefon und WhatsApp lassen sich getrennt abschalten. Die E-Mail-Adresse
// bleibt in jedem Fall stehen, damit man Till immer erreichen kann.
export function TelefonLink(props: SchutzLinkProps) {
  return (
    <WennTelefonSichtbar>
      <SchutzKnopf macheZiel={telefonHref} kontaktweg="telefon" {...props} />
    </WennTelefonSichtbar>
  );
}

export function MailLink(props: SchutzLinkProps) {
  return (
    <SchutzKnopf
      macheZiel={() => window.atob(MAIL_HREF_B64)}
      kontaktweg="email"
      {...props}
    />
  );
}

export function WhatsAppLink(props: SchutzLinkProps) {
  return useContext(KontaktKontext).whatsapp ? (
    <SchutzKnopf
      macheZiel={whatsappHref}
      kontaktweg="whatsapp"
      neuerTab
      {...props}
    />
  ) : null;
}

export function TelefonAnzeige() {
  const sichtbar = useContext(KontaktKontext).telefon;
  const [text, setText] = useState("");
  useEffect(() => {
    setText(telefonAnzeige());
  }, []);
  return <>{sichtbar ? text : ""}</>;
}

// Zeigt die Adresse bewusst als "info [at] dgtill.com" an: Diese Schreibweise
// passt auf kein E-Mail-Muster und kann daher auch von Robotern, die
// JavaScript ausführen, nicht als Adresse erkannt werden. Der Klick auf den
// Button öffnet trotzdem das Mailprogramm mit der echten Adresse.
export function MailAnzeige() {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(mailAdresse().replace("@", " [at] "));
  }, []);
  return <>{text}</>;
}
