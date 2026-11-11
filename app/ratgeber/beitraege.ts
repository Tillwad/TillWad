import { PREIS_STUNDE, type Frage } from "../daten";

// Der Ratgeber ist der Blog der Website. Er heißt bewusst nicht "Blog":
// "Ratgeber" versteht jeder, auch wer mit dem Wort Blog nichts anfangen kann,
// und es sagt gleich, was drinsteht.
//
// Jeder Beitrag steht in diesem Verzeichnis als Datensatz, nicht als eigene
// Seitendatei. Das hat einen Grund: Ein neuer Beitrag ist dann ein neuer
// Eintrag in der Liste unten und sonst nichts. Übersicht, Sitemap, llms.txt,
// strukturierte Daten und die Verweise auf der Startseite wachsen von allein
// mit. Wie man einen Beitrag anlegt, steht in ratgeber-anleitung.md.
//
// Worauf es bei den Themen ankommt: Ein Beitrag soll eine Frage beantworten,
// die Leute gerade wirklich bei Google eintippen, und zwar vollständig, sodass
// man danach nicht weitersuchen muss. Wer sich geholfen fühlt, ruft beim
// nächsten Problem an. Deshalb steht in jedem Beitrag die Lösung zum
// Selbermachen und erst danach das Angebot, es übernehmen zu lassen.

/** Ein Baustein im Text eines Beitrags. */
export type Block =
  | { art: "absatz"; text: string }
  | { art: "zwischentitel"; text: string }
  | { art: "liste"; punkte: string[] }
  | { art: "schritte"; schritte: { titel: string; text: string }[] }
  | {
      art: "kasten";
      /** Färbung: wichtig (rot), hinweis (blau), gut (grün). */
      ton: "wichtig" | "hinweis" | "gut";
      titel: string;
      text: string;
    }
  /**
   * Ein Tipp-Weg durch eine App, etwa "OneDrive öffnen, Profilbild, Papierkorb".
   * Steht als eigener Baustein da, weil genau daran die meisten scheitern:
   * Im Fließtext liest man über so eine Kette hinweg.
   */
  | { art: "pfad"; titel: string; schritte: string[] };

export type Beitrag = {
  slug: string;
  /** Überschrift auf der Seite selbst. Darf länger sein als der Titel bei Google. */
  titel: string;
  /** Titel für Google, rund 60 Zeichen, sonst wird er abgeschnitten. */
  metaTitel: string;
  beschreibung: string;
  /** Kurzes Schlagwort für die Übersicht, etwa "Handy und Fotos". */
  thema: string;
  /** Veröffentlichung als JJJJ-MM-TT. */
  veroeffentlicht: string;
  /** Letzte inhaltliche Überarbeitung, falls es eine gab. */
  aktualisiert?: string;
  /** Geschätzte Lesezeit in Minuten, für die Übersicht. */
  lesezeit: number;
  /** Anreißer für die Übersicht und als Einstieg über dem Text. */
  teaser: string;
  inhalt: Block[];
  fragen: Frage[];
  /** Produkt-Slugs aus der Kaufberatung, falls welche zum Thema passen. */
  produkte?: string[];
  /** Verweise auf passende Seiten der Website. */
  weiterlesen?: { pfad: string; titel: string }[];
  /**
   * Belege. Bei einem Beitrag über eine aktuelle Änderung sind die Quellen
   * kein Beiwerk: Sie sind der Unterschied zwischen "irgendwer schreibt was"
   * und einer Auskunft, auf die man sich verlassen kann.
   */
  quellen?: { titel: string; url: string }[];
};

export const beitraege: Beitrag[] = [
  {
    slug: "samsung-fotos-verschwunden-onedrive",
    titel:
      "Samsung: Fotos nach dem OneDrive-Aus verschwunden? So holen Sie sie zurück",
    metaTitel: "Samsung Fotos verschwunden nach OneDrive-Aus: was tun?",
    beschreibung:
      "Seit dem 30. September 2026 sichert die Samsung Galerie nicht mehr in OneDrive. Warum Ihre Bilder oft als Ordner DCIM im Papierkorb liegen und wie Sie sie zurückholen, Schritt für Schritt erklärt.",
    thema: "Handy und Fotos",
    veroeffentlicht: "2026-11-11",
    lesezeit: 7,
    teaser:
      "Seit Anfang Oktober rufen mich Leute an, weil in der Samsung Galerie plötzlich Jahre an Fotos fehlen. Die gute Nachricht: In fast allen Fällen sind die Bilder noch da. Man muss nur wissen, wo man nachsehen muss, und es gibt eine Frist.",
    inhalt: [
      {
        art: "absatz",
        text: "Wenn Sie ein Samsung-Handy haben und seit Oktober Fotos fehlen, dann liegt das mit hoher Wahrscheinlichkeit nicht an Ihnen und auch nicht an einem Defekt. Microsoft und Samsung haben zum 30. September 2026 ihre Zusammenarbeit beendet. Die Samsung Galerie sichert seitdem nichts mehr in OneDrive, und alles, was vorher über diesen Weg in der Cloud lag, wird in der Galerie nicht mehr angezeigt.",
      },
      {
        art: "kasten",
        ton: "gut",
        titel: "Das Wichtigste zuerst",
        text: "Offiziell wurde nichts gelöscht. Ihre Fotos liegen weiterhin in OneDrive, sie sind nur nicht mehr in der Galerie-App Ihres Handys sichtbar. Öffnen Sie die OneDrive-App oder onedrive.live.com im Browser, dann sehen Sie sie wieder. Bevor Sie irgendetwas anderes versuchen, machen Sie bitte genau das.",
      },
      {
        art: "zwischentitel",
        text: "Warum die Fotos als Ordner DCIM im Papierkorb landen",
      },
      {
        art: "absatz",
        text: "Viele Betroffene finden ihre Bilder tatsächlich im Papierkorb wieder, und zwar als Ordner mit dem merkwürdigen Namen DCIM. Das verwirrt, hat aber eine einfache Erklärung in zwei Teilen.",
      },
      {
        art: "absatz",
        text: "Der erste Teil ist der Name. DCIM steht für Digital Camera Images und ist der Ordner, in dem jede Handykamera und jede Fotokamera ihre Aufnahmen ablegt. In OneDrive lagen Ihre Bilder deshalb unter Bilder, dann Samsung Gallery, dann DCIM und darin Camera. Was Sie im Papierkorb sehen, ist also kein fremder Ordner, sondern Ihre Kamerarolle.",
      },
      {
        art: "absatz",
        text: "Der zweite Teil ist die eigentliche Ursache, und das ist der Punkt, den kaum jemand kennt: Diese Synchronisierung lief in beide Richtungen. Microsoft beschreibt das selbst so. Was Sie auf dem Handy in der Galerie gelöscht haben, wurde dadurch auch in OneDrive gelöscht, und umgekehrt. Es war ein Abgleich, keine Sicherung. Wer im Sommer Speicherplatz auf dem Handy freigeräumt hat, hat damit unbemerkt auch die Kopie in der Cloud in den Papierkorb geschoben. Solange die Galerie die OneDrive-Bilder noch anzeigte, fiel das nicht auf. Seit Oktober zeigt sie sie nicht mehr an, und erst dadurch wird die Lücke sichtbar.",
      },
      {
        art: "absatz",
        text: "Dazu kommt: Beim Abschalten der Verknüpfung haben manche Handys gefragt, ob die Kopien in OneDrive mit entfernt werden sollen. Wer in dem Moment nicht verstanden hat, worum es geht, und auf Löschen getippt hat, hat den ganzen DCIM-Ordner in den Papierkorb geschickt. Beides führt zum selben Bild auf dem Schirm: Die Fotos sind weg, und im Papierkorb liegt ein Ordner namens DCIM.",
      },
      {
        art: "kasten",
        ton: "wichtig",
        titel: "Es läuft eine Frist, und die ist kurz",
        text: "Im Papierkorb bleibt nichts für immer. Bei einem privaten Microsoft-Konto löscht OneDrive den Papierkorb 30 Tage nach dem Löschen endgültig. Der Papierkorb der Samsung Galerie hält 30 Tage, der von Google Fotos 60 Tage. Wenn Ihre Fotos schon Anfang Oktober verschwunden sind, kann die OneDrive-Frist bereits abgelaufen sein. Warten Sie damit also keinen Tag länger, sondern sehen Sie heute nach.",
      },
      {
        art: "zwischentitel",
        text: "Drei Papierkörbe, in die Sie nachsehen sollten",
      },
      {
        art: "absatz",
        text: "Es gibt nicht einen Papierkorb, sondern drei, und sie wissen nichts voneinander. Gehen Sie alle drei durch, auch wenn Sie im ersten schon etwas finden. Oft sind die Bilder über mehrere verteilt.",
      },
      {
        art: "pfad",
        titel: "1. Der Papierkorb in OneDrive, hier liegt meist das Meiste",
        schritte: [
          "OneDrive-App öffnen",
          "Unten auf Ich tippen",
          "Papierkorb",
          "Ordner DCIM suchen, antippen und halten",
          "Oben rechts die drei Punkte, dann Wiederherstellen",
        ],
      },
      {
        art: "absatz",
        text: "Am Computer geht das genauso und ist für viele übersichtlicher: onedrive.live.com im Browser öffnen, anmelden, links auf Papierkorb klicken, den Ordner anhaken und oben auf Wiederherstellen klicken. Auf einem großen Bildschirm sehen Sie auf einen Blick, was alles drin liegt.",
      },
      {
        art: "pfad",
        titel: "2. Der Papierkorb der Samsung Galerie",
        schritte: [
          "Galerie öffnen",
          "Unten rechts auf Menü oder die drei Striche tippen",
          "Papierkorb",
          "Bilder auswählen",
          "Wiederherstellen",
        ],
      },
      {
        art: "pfad",
        titel: "3. Der Papierkorb von Google Fotos",
        schritte: [
          "Google Fotos öffnen",
          "Unten auf Mediathek oder Sammlungen tippen",
          "Papierkorb",
          "Bilder auswählen",
          "Wiederherstellen",
        ],
      },
      {
        art: "absatz",
        text: "Finden Sie in allen drei nichts, ist noch nicht alles verloren. Sehen Sie dann in der OneDrive-App auch im Ordner Bilder und im Ordner Eigener Tresor nach, denn was im Tresor liegt, erscheint bei der Suche nicht. Und prüfen Sie auf dem Handy über die App Eigene Dateien den internen Speicher: Sehr oft liegen die Originale noch unverändert dort, und nur die Cloud-Kopie ist betroffen.",
      },
      {
        art: "zwischentitel",
        text: "Was Sie jetzt besser nicht tun",
      },
      {
        art: "liste",
        punkte: [
          "Die OneDrive-App nicht löschen und sich nicht abmelden. Solange Sie angemeldet sind, kommen Sie an den Papierkorb. Ohne Anmeldung nicht mehr.",
          "Keine Datenrettungs-App aus dem Play Store installieren. Die können nichts aus einer Cloud zurückholen, verlangen weitreichende Zugriffsrechte und am Ende Geld für ein Ergebnis, das es nicht gibt.",
          "Den Papierkorb nicht leeren, auch wenn das Handy anbietet, damit Speicherplatz zu gewinnen. Genau dort liegt gerade Ihre Rettung.",
          "Das Handy nicht auf Werkseinstellungen zurücksetzen. Das löst das Problem nicht, sondern vernichtet die letzten lokalen Kopien.",
          "Nicht erst in Ruhe darüber nachdenken. Die 30 Tage laufen, ob Sie nachsehen oder nicht.",
        ],
      },
      {
        art: "zwischentitel",
        text: "Wie Sie Ihre Fotos danach richtig sichern",
      },
      {
        art: "absatz",
        text: "Wenn die Bilder wieder da sind, sollten Sie die Sicherung neu aufsetzen. Sonst stehen Sie beim nächsten Wechsel wieder hier. Sie haben zwei Wege, und beide sind in Ordnung. Entscheidend ist, dass Sie sich für einen entscheiden und ihn einmal richtig einstellen.",
      },
      {
        art: "schritte",
        schritte: [
          {
            titel: "Weg eins: bei OneDrive bleiben",
            text: "Nicht mehr über die Galerie, sondern über die OneDrive-App selbst. Dort gibt es die Kamerasicherung, die Ihre Aufnahmen hochlädt. Der wichtige Unterschied: Die lädt nur hoch. Löschen Sie etwas auf dem Handy, bleibt die Kopie in der Cloud erhalten. Das ist eine echte Sicherung.",
          },
          {
            titel: "Weg zwei: zu Google Fotos wechseln",
            text: "Das ist der Weg, den Samsung jetzt selbst vorsieht. Seit dem 10. November 2026 gibt es dafür eine neue Funktion direkt in der Galerie, die auf Ihren Google-Speicher sichert. Sie kommt schrittweise und zunächst nur auf Geräte mit One UI 9. Ob und wann Ihr Handy sie bekommt, steht noch nicht fest. Bis dahin tut es die Sicherung in der App Google Fotos genauso.",
          },
          {
            titel: "Und in jedem Fall: eine Kopie, die niemandem gehört außer Ihnen",
            text: "Eine Cloud allein reicht mir nicht, und genau dieser Fall zeigt, warum: Ein Anbieter kann eine Zusammenarbeit beenden, ein Konto kann gesperrt werden, ein Passwort kann verloren gehen. Kopieren Sie Ihre Fotos zusätzlich einmal im Jahr auf eine Festplatte, die bei Ihnen im Schrank liegt. Das ist die einzige Kopie, die von keiner Entscheidung eines Unternehmens abhängt.",
          },
        ],
      },
      {
        art: "kasten",
        ton: "hinweis",
        titel: "Der Satz, den ich mir von diesem Beitrag wünsche",
        text: "Synchronisieren ist keine Sicherung. Ein Abgleich hält zwei Orte gleich, auch beim Löschen. Eine Sicherung bewahrt auf, auch wenn das Original verschwindet. Die Samsung Galerie hat abgeglichen, und viele haben es für eine Sicherung gehalten. Das ist der eigentliche Grund, warum dieser Fall so viele Leute trifft.",
      },
      {
        art: "zwischentitel",
        text: "Wenn Sie das nicht allein machen möchten",
      },
      {
        art: "absatz",
        text: `Das ist völlig verständlich. Es geht um Fotos, an denen oft Jahre hängen, und man möchte in so einer Lage nichts falsch anklicken. Ich komme zu Ihnen nach Hause, sehe gemeinsam mit Ihnen in alle Papierkörbe, hole zurück, was zurückzuholen ist, und richte danach eine Sicherung ein, die auch nach dem nächsten Update noch läuft. Ein Hausbesuch kostet ${PREIS_STUNDE}, die Anfahrt im Berliner Südwesten ist für Sie kostenlos. Rufen Sie mich an und schildern Sie mir kurz, was fehlt. Oft kann ich schon am Telefon sagen, wie gut die Chancen stehen.`,
      },
      {
        art: "kasten",
        ton: "wichtig",
        titel: "Bitte rufen Sie lieber heute an als nächste Woche",
        text: "Das ist der eine Fall, in dem ich zur Eile rate, und es liegt nicht an mir, sondern an der Frist im Papierkorb. Was dort endgültig gelöscht ist, kann niemand mehr zurückholen, auch kein Fachmann und kein Programm.",
      },
    ],
    fragen: [
      {
        frage: "Sind meine Fotos jetzt endgültig gelöscht?",
        antwort:
          "In den allermeisten Fällen nicht. Offiziell hat niemand etwas gelöscht: Ihre Bilder liegen weiterhin in OneDrive, sie werden nur nicht mehr in der Samsung Galerie angezeigt. Öffnen Sie die OneDrive-App, dann sehen Sie sie wieder. Liegen sie dort im Papierkorb, können Sie sie von Hand wiederherstellen, solange die Frist von 30 Tagen noch nicht abgelaufen ist.",
      },
      {
        frage: "Was bedeutet der Ordner DCIM im Papierkorb?",
        antwort:
          "DCIM steht für Digital Camera Images und ist der Ordner, in dem jede Handykamera ihre Aufnahmen ablegt. In OneDrive lagen Ihre Bilder unter Bilder, Samsung Gallery, DCIM, Camera. Was Sie im Papierkorb sehen, ist also kein fremder Ordner, sondern Ihre eigene Kamerarolle. Stellen Sie den ganzen Ordner wieder her, nicht einzelne Bilder daraus.",
      },
      {
        frage: "Wie lange habe ich Zeit, die Fotos zurückzuholen?",
        antwort:
          "Bei einem privaten Microsoft-Konto löscht OneDrive den Papierkorb 30 Tage nach dem Löschen endgültig. Der Papierkorb der Samsung Galerie hält 30 Tage, der von Google Fotos 60 Tage. Wenn Ihre Bilder bereits Anfang Oktober verschwunden sind, kann die OneDrive-Frist schon abgelaufen sein. Sehen Sie deshalb bitte noch heute nach.",
      },
      {
        frage: "Warum haben Samsung und Microsoft das überhaupt geändert?",
        antwort:
          "Die beiden Unternehmen haben ihre Zusammenarbeit bei der Galerie zum 30. September 2026 beendet. Samsung setzt stattdessen auf eine enge Verbindung zu Google Fotos und hat dafür am 10. November 2026 eine eigene Funktion vorgestellt, die auf Ihren Google-Speicher sichert. Sie kommt schrittweise und zunächst nur auf Geräte mit One UI 9.",
      },
      {
        frage: "Muss ich jetzt für Speicherplatz bezahlen?",
        antwort:
          "Nicht zwangsläufig. Bei Google sind 15 Gigabyte kostenlos, die sich allerdings Gmail, Google Drive und Google Fotos teilen. Bei Microsoft sind es 5 Gigabyte. Wer viele Videos aufnimmt, kommt damit nicht weit. Bevor Sie ein Abo abschließen, sehen wir uns gemeinsam an, wie viel Platz Sie wirklich brauchen. Oft hilft es schon, alte Videos auf eine Festplatte auszulagern.",
      },
      {
        frage: "Hilft eine Datenrettungs-App aus dem Play Store?",
        antwort:
          "Nein, und davon rate ich ausdrücklich ab. Diese Apps können nichts aus einer Cloud zurückholen, denn dort haben sie keinen Zugriff. Sie verlangen weitreichende Rechte auf Ihrem Handy und am Ende Geld für ein Ergebnis, das es nicht gibt. Der Papierkorb in OneDrive, in der Galerie und in Google Fotos ist der richtige und kostenlose Weg.",
      },
    ],
    weiterlesen: [
      { pfad: "/computerhilfe-senioren", titel: "Computerhilfe für Senioren" },
      { pfad: "/it-hilfe", titel: "IT-Hilfe im Berliner Südwesten" },
    ],
    quellen: [
      {
        titel:
          "Microsoft: Änderungen an der Synchronisierung der Samsung Galerie und OneDrive",
        url: "https://support.microsoft.com/de-de/onedrive/changes-to-samsung-gallery-sync-and-onedrive",
      },
      {
        titel: "Microsoft: Verwenden der Samsung Galerie mit OneDrive",
        url: "https://support.microsoft.com/de-de/onedrive/using-samsung-gallery-with-onedrive",
      },
      {
        titel:
          "Microsoft: Wiederherstellen gelöschter Dateien oder Ordner in OneDrive",
        url: "https://support.microsoft.com/de-de/office/wiederherstellen-gel%C3%B6schter-dateien-oder-ordner-in-onedrive-949ada80-0026-4db3-a953-c99083e6a84f",
      },
      {
        titel: "Samsung: Was hat sich bei der Synchronisierung geändert?",
        url: "https://www.samsung.com/de/support/mobile-devices/fotos-videos-synchronisation-mit-onedrive",
      },
      {
        titel:
          "Samsung Galerie sichert Fotos jetzt im Google-Speicher, 10. November 2026",
        url: "https://www.androidauthority.com/samsung-gallery-sync-google-storage-3733418/",
      },
    ],
  },
];

/** Beiträge, neueste zuerst. Grundlage für Übersicht, Sitemap und Verweise. */
export function beitraegeSortiert(): Beitrag[] {
  return [...beitraege].sort((a, b) =>
    b.veroeffentlicht.localeCompare(a.veroeffentlicht),
  );
}

export function beitragFinden(slug: string): Beitrag | undefined {
  return beitraege.find((beitrag) => beitrag.slug === slug);
}

/**
 * Datum in der Form "11. November 2026". Bewusst ohne Intl und ohne
 * Date-Objekt: Ein Datum ohne Uhrzeit verschiebt sich beim Umweg über Date je
 * nach Zeitzone um einen Tag, und auf dem Server steht die Uhr auf UTC.
 */
const MONATE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export function datumLesbar(iso: string): string {
  const [jahr, monat, tag] = iso.split("-");
  return `${Number(tag)}. ${MONATE[Number(monat) - 1]} ${jahr}`;
}
