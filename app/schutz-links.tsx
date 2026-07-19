"use client";

import { useEffect, useState, type ReactNode } from "react";

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

export function TelefonLink(props: SchutzLinkProps) {
  return <SchutzKnopf macheZiel={telefonHref} {...props} />;
}

export function MailLink(props: SchutzLinkProps) {
  return (
    <SchutzKnopf macheZiel={() => window.atob(MAIL_HREF_B64)} {...props} />
  );
}

export function WhatsAppLink(props: SchutzLinkProps) {
  return <SchutzKnopf macheZiel={whatsappHref} neuerTab {...props} />;
}

export function TelefonAnzeige() {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(telefonAnzeige());
  }, []);
  return <>{text}</>;
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
