"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Ob die Telefonnummer angezeigt wird, entscheidet Till unter /admin. Der Wert
// wird im Layout gelesen und hier über den Kontext an alle Schaltflächen
// weitergereicht – so muss ihn nicht jede Seite einzeln durchschleifen.
const TelefonKontext = createContext(true);

export function TelefonKontextProvider({
  sichtbar,
  children,
}: {
  sichtbar: boolean;
  children: ReactNode;
}) {
  return (
    <TelefonKontext.Provider value={sichtbar}>
      {children}
    </TelefonKontext.Provider>
  );
}

/**
 * Zeigt seinen Inhalt nur, wenn die Telefonnummer sichtbar sein soll. Damit
 * lassen sich auch die Sätze rund um die Schaltflächen ausblenden, die ohne
 * Telefonnummer keinen Sinn ergeben.
 */
export function WennTelefonSichtbar({ children }: { children: ReactNode }) {
  return useContext(TelefonKontext) ? <>{children}</> : null;
}

/** Das Gegenstück: Inhalt nur zeigen, solange die Telefonnummer aus ist. */
export function WennTelefonNichtSichtbar({
  children,
}: {
  children: ReactNode;
}) {
  return useContext(TelefonKontext) ? null : <>{children}</>;
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

type SchutzLinkProps = {
  className?: string;
  children: ReactNode;
};

// Bewusst ein Button statt eines Links: Das Ziel wird erst beim Klick
// dekodiert und geöffnet und steht daher zu keinem Zeitpunkt im Quellcode
// oder im Seiten-DOM.
function SchutzKnopf({
  macheZiel,
  neuerTab = false,
  className,
  children,
}: SchutzLinkProps & { macheZiel: () => string; neuerTab?: boolean }) {
  const oeffnen = () => {
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

// Telefon und WhatsApp verschwinden gemeinsam, wenn Till nicht erreichbar ist.
// Die E-Mail-Adresse bleibt bewusst stehen, damit man ihn trotzdem erreicht.
export function TelefonLink(props: SchutzLinkProps) {
  return (
    <WennTelefonSichtbar>
      <SchutzKnopf macheZiel={telefonHref} {...props} />
    </WennTelefonSichtbar>
  );
}

export function MailLink(props: SchutzLinkProps) {
  return (
    <SchutzKnopf macheZiel={() => window.atob(MAIL_HREF_B64)} {...props} />
  );
}

export function WhatsAppLink(props: SchutzLinkProps) {
  return (
    <WennTelefonSichtbar>
      <SchutzKnopf macheZiel={whatsappHref} neuerTab {...props} />
    </WennTelefonSichtbar>
  );
}

export function TelefonAnzeige() {
  const sichtbar = useContext(TelefonKontext);
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
