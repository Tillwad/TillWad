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
    slug: "windows-10-support-ende-neuer-computer",
    titel:
      "Windows 10 wird nicht mehr unterstützt? Sie brauchen keinen neuen Computer",
    metaTitel: "Windows 10 Support-Ende: brauchen Sie einen neuen PC?",
    beschreibung:
      "Windows 10 bekommt in Deutschland kostenlos Sicherheitsupdates bis Oktober 2027. Warum viele die Schaltfläche dafür nicht sehen und wann ein neuer Computer wirklich nötig ist.",
    thema: "Computer und Windows",
    veroeffentlicht: "2026-11-12",
    lesezeit: 8,
    teaser:
      "Ihr Computer meldet, dass Windows 10 nicht mehr unterstützt wird, und im Elektromarkt sagt man Ihnen, Sie bräuchten ein neues Gerät. In den meisten Fällen stimmt das nicht. Es gibt kostenlose Sicherheitsupdates bis Oktober 2027, nur sieht die Schaltfläche dafür kaum jemand.",
    inhalt: [
      {
        art: "absatz",
        text: "Seit Oktober 2025 bekommt Windows 10 keine regulären Updates mehr, und seitdem weist Microsoft mit Meldungen auf dem Bildschirm darauf hin. Diese Meldungen klingen ernst, und das sind sie auch: Ein Computer ohne Sicherheitsupdates ist mit der Zeit angreifbar. Nur führen sie viele Leute zur falschen Schlussfolgerung, nämlich dass jetzt ein neuer Computer her muss.",
      },
      {
        art: "kasten",
        ton: "gut",
        titel: "Das Wichtigste zuerst",
        text: "Microsoft hat im Juni 2026 verlängert: Windows 10 bekommt Sicherheitsupdates bis zum 12. Oktober 2027, und in Deutschland und dem übrigen Europäischen Wirtschaftsraum kostet das nichts. Ihr Computer kann also noch fast ein Jahr sicher weiterlaufen. Sie müssen ihn nur einmal dafür anmelden.",
      },
      {
        art: "absatz",
        text: "Wenn Sie im Internet etwas anderes lesen, dann liegt das daran: Ursprünglich sollte die Verlängerung am 13. Oktober 2026 enden, und unzählige Artikel aus dieser Zeit stehen noch im Netz. Microsoft hat die Frist danach noch einmal um ein Jahr verlängert. Die alten Texte wurden nie aktualisiert. Es ist also gut möglich, dass Sie gerade eine überholte Nachricht gelesen haben.",
      },
      {
        art: "zwischentitel",
        text: "Warum Sie die Schaltfläche zum Anmelden wahrscheinlich nicht sehen",
      },
      {
        art: "absatz",
        text: "Das ist der Punkt, an dem fast alle hängenbleiben, und er hat nichts mit Ihnen zu tun. Die kostenlose Verlängerung setzt ein Microsoft-Konto voraus. Wenn Sie sich an Ihrem Computer mit einem lokalen Benutzerkonto anmelden, also einfach mit Ihrem Namen und einem selbst gewählten Kennwort ohne E-Mail-Adresse, dann erscheint die Schaltfläche zum Anmelden schlicht nicht. Der Rechner meldet weiterhin, er sei nicht mehr unterstützt, obwohl die Updates kostenlos bereitstünden.",
      },
      {
        art: "absatz",
        text: "Gerade ältere Computer, die noch jemand vor Jahren eingerichtet hat, laufen fast immer mit so einem lokalen Konto. Genau diese Leute bekommen die Verlängerung also nicht angeboten und glauben, sie hätten keine Wahl. Dazu kommen zwei weitere Hürden: Es muss die Windows-10-Version 22H2 installiert sein, und Sie brauchen Administratorrechte, also ein Konto mit vollen Berechtigungen. Ein eingeschränktes Benutzerkonto sieht die Schaltfläche ebenfalls nicht.",
      },
      {
        art: "zwischentitel",
        text: "Schritt für Schritt: so melden Sie Ihren Computer an",
      },
      {
        art: "absatz",
        text: "Prüfen Sie zuerst, welche Version auf Ihrem Computer läuft. Das geht in zehn Sekunden und erspart Ihnen die Sucherei, falls die Voraussetzung gar nicht erfüllt ist.",
      },
      {
        art: "pfad",
        titel: "1. Version prüfen",
        schritte: [
          "Windows-Taste und R gleichzeitig drücken",
          "winver eingeben",
          "Auf OK klicken",
          "Es muss Version 22H2 dastehen",
        ],
      },
      {
        art: "absatz",
        text: "Steht dort eine ältere Version, holen Sie zuerst alle Updates nach, unter Einstellungen, Update und Sicherheit, Nach Updates suchen. Das kann je nach Rechner eine Weile dauern und mehrere Neustarts brauchen. Erst danach erscheint die Anmeldung.",
      },
      {
        art: "pfad",
        titel: "2. Für die Verlängerung anmelden",
        schritte: [
          "Einstellungen öffnen",
          "Update und Sicherheit",
          "Windows Update",
          "Jetzt registrieren anklicken",
          "Mit Microsoft-Konto anmelden",
        ],
      },
      {
        art: "absatz",
        text: "Haben Sie noch kein Microsoft-Konto, können Sie an dieser Stelle eines anlegen. Es ist kostenlos. Und keine Sorge: Sie müssen sich danach nicht umgewöhnen. Sie können Ihren Computer weiterhin wie gewohnt mit Ihrem lokalen Konto benutzen, denn die Verlängerung gilt für das Gerät und nicht für das Benutzerkonto.",
      },
      {
        art: "kasten",
        ton: "hinweis",
        titel: "Wenn Sie sich schon angemeldet haben",
        text: "Dann müssen Sie gar nichts tun. Die Verlängerung bis Oktober 2027 läuft für bereits angemeldete Geräte automatisch weiter. Sie bekommen Ihre Updates einfach wie bisher.",
      },
      {
        art: "kasten",
        ton: "wichtig",
        titel: "Die 60-Tage-Regel, über die viele stolpern",
        text: "Melden Sie sich länger als 60 Tage nicht mehr mit dem Microsoft-Konto an, stellt Microsoft die Updates wieder ein, und das Gerät muss neu angemeldet werden. Wer seinen Computer nur selten benutzt, sollte sich das notieren. Ich richte das bei meinen Kunden so ein, dass die Anmeldung im Hintergrund bestehen bleibt und man nicht daran denken muss.",
      },
      {
        art: "zwischentitel",
        text: "Was diese Verlängerung nicht leistet",
      },
      {
        art: "absatz",
        text: "Damit Sie wissen, woran Sie sind, denn hier wird oft zu viel versprochen:",
      },
      {
        art: "liste",
        punkte: [
          "Sie bekommen nur Sicherheitsupdates, also Flicken für gefundene Lücken. Neue Funktionen kommen keine mehr dazu.",
          "Sie bekommen keinen technischen Support von Microsoft. Bei Problemen hilft Ihnen dort niemand mehr.",
          "Am 12. Oktober 2027 ist endgültig Schluss. Diese Verlängerung ist eine Atempause, kein Dauerzustand. Nutzen Sie die Zeit, um den Wechsel in Ruhe zu planen, statt ihn unter Druck machen zu müssen.",
          "Programme wie Ihr Browser oder Ihr Virenschutz stellen die Unterstützung für Windows 10 nach und nach ebenfalls ein. Das passiert schleichend und zu unterschiedlichen Zeitpunkten.",
        ],
      },
      {
        art: "zwischentitel",
        text: "Brauche ich nun einen neuen Computer oder nicht?",
      },
      {
        art: "absatz",
        text: "Ehrliche Antwort: meistens nicht, jedenfalls nicht jetzt. Der naheliegende Weg wäre ein kostenloses Upgrade auf Windows 11. Das geht allerdings nur, wenn Ihr Computer die Voraussetzungen erfüllt, und Microsoft ist da streng. Gefordert werden unter anderem ein Sicherheitsbaustein namens TPM 2.0 und ein ausreichend neuer Hauptprozessor, grob gesagt ab Baujahr 2017 und 2018. Ob Ihr Gerät dazugehört, sagt Ihnen das kostenlose Programm PC-Integritätsprüfung von Microsoft.",
      },
      {
        art: "absatz",
        text: "Erfüllt Ihr Computer die Voraussetzungen, ist das Upgrade der beste Weg, und es kostet nichts. Erfüllt er sie nicht, läuft er mit der Verlängerung trotzdem sicher weiter, und Sie haben bis Oktober 2027 Zeit. Von Bastellösungen, mit denen man Windows 11 auf eigentlich zu alten Geräten erzwingt, rate ich ab: Diese Rechner bekommen später oft keine Updates mehr und stehen dann schlechter da als vorher.",
      },
      {
        art: "schritte",
        schritte: [
          {
            titel: "Wann sich ein neues Gerät wirklich lohnt",
            text: "Wenn Ihr Computer schon heute quälend langsam ist, weniger als 8 Gigabyte Arbeitsspeicher hat oder noch mit einer alten mechanischen Festplatte läuft. Dann ist das Support-Ende nicht Ihr eigentliches Problem, sondern nur der Anlass, der es sichtbar macht.",
          },
          {
            titel: "Wann es sich nicht lohnt",
            text: "Wenn Ihr Gerät zügig startet, alles tut, was Sie brauchen, und Sie nur wegen der Meldung auf dem Bildschirm beunruhigt sind. Dann melden Sie es an und benutzen es weiter. Ein neuer Computer bringt Ihnen in dieser Lage nichts außer Kosten und der Mühe, sich an etwas Neues zu gewöhnen.",
          },
          {
            titel: "Der günstige Mittelweg, den kaum jemand nennt",
            text: "Oft genügt es, in einen älteren Rechner eine moderne SSD einzubauen oder den Arbeitsspeicher zu erweitern. Das kostet einen Bruchteil eines neuen Geräts und macht aus einem lahmen Computer wieder einen flotten. Ob sich das bei Ihrem Gerät lohnt, sehe ich mir gerne an.",
          },
        ],
      },
      {
        art: "kasten",
        ton: "wichtig",
        titel: "Vorsicht: Betrüger nutzen genau diese Meldung aus",
        text: "Rund um das Support-Ende häufen sich Anrufe und Pop-up-Fenster, die behaupten, Ihr Computer sei unsicher, und zu einer Rückrufnummer oder einem Download drängen. Das ist immer Betrug. Microsoft ruft Privatleute nicht an, und ein echtes Windows-Update fordert Sie nie auf, irgendwo anzurufen oder ein Programm aus dem Internet zu installieren. Legen Sie in so einem Fall einfach auf und schließen Sie das Fenster.",
      },
      {
        art: "zwischentitel",
        text: "Bevor Sie irgendetwas ändern: eine Sicherung",
      },
      {
        art: "absatz",
        text: "Ob Anmeldung, Upgrade auf Windows 11 oder neues Gerät, vorher gehören Ihre Fotos, Dokumente und E-Mails auf eine externe Festplatte. Nicht weil es dabei oft schiefgeht, sondern weil es der einzige Moment ist, in dem man ohnehin an die Sache denkt. Eine Festplatte für eine vollständige Sicherung kostet unter sechzig Euro und ist die beste Versicherung, die Sie für Ihre Daten kaufen können.",
      },
      {
        art: "zwischentitel",
        text: "Wenn Sie das nicht allein machen möchten",
      },
      {
        art: "absatz",
        text: `Das verstehe ich gut, denn an mehreren Stellen kann man hier etwas übersehen. Ich komme zu Ihnen nach Hause, sehe mir an, was Ihr Gerät kann, melde es für die Verlängerung an, richte bei Bedarf das Microsoft-Konto ein und sichere vorher Ihre Daten. Und ich sage Ihnen ehrlich, ob sich bei Ihrem Rechner ein neues Gerät lohnt oder eben nicht. Ein Hausbesuch kostet ${PREIS_STUNDE}, die Anfahrt im Berliner Südwesten ist für Sie kostenlos. Verkaufen muss ich Ihnen nichts, und das ist genau der Unterschied zum Elektromarkt.`,
      },
    ],
    fragen: [
      {
        frage: "Wie lange bekommt Windows 10 noch Sicherheitsupdates?",
        antwort:
          "Bis zum 12. Oktober 2027. Microsoft hat die Frist im Juni 2026 noch einmal um ein Jahr verlängert. Ältere Artikel nennen oft den 13. Oktober 2026, das ist überholt. In Deutschland und dem übrigen Europäischen Wirtschaftsraum sind diese Updates für Privatleute kostenlos.",
      },
      {
        frage: "Warum sehe ich die Schaltfläche zum Registrieren nicht?",
        antwort:
          "Meist aus einem von drei Gründen. Erstens: Sie melden sich mit einem lokalen Konto am Computer an, die Verlängerung setzt aber ein Microsoft-Konto voraus. Zweitens: Es ist nicht die Windows-10-Version 22H2 installiert. Drittens: Ihr Benutzerkonto hat keine Administratorrechte. Alle drei Punkte lassen sich beheben.",
      },
      {
        frage: "Muss ich jetzt einen neuen Computer kaufen?",
        antwort:
          "In den meisten Fällen nicht. Wenn Ihr Gerät zügig läuft und tut, was Sie brauchen, melden Sie es für die Verlängerung an und benutzen es weiter. Ein neues Gerät lohnt sich, wenn der Computer schon heute sehr langsam ist, weniger als 8 Gigabyte Arbeitsspeicher hat oder noch mit einer alten mechanischen Festplatte läuft. Oft genügt dann auch eine neue SSD oder mehr Arbeitsspeicher.",
      },
      {
        frage: "Kostet die Verlängerung etwas?",
        antwort:
          "In Deutschland nicht. Für Privatleute im Europäischen Wirtschaftsraum sind die erweiterten Sicherheitsupdates kostenlos, Sie brauchen dafür nur ein Microsoft-Konto. Auch ein Microsoft-Konto anzulegen kostet nichts. Wenn Ihnen jemand Geld dafür abnehmen will, stimmt etwas nicht.",
      },
      {
        frage: "Kann ich kostenlos auf Windows 11 wechseln?",
        antwort:
          "Ja, wenn Ihr Computer die Voraussetzungen erfüllt. Microsoft verlangt unter anderem den Sicherheitsbaustein TPM 2.0 und einen ausreichend neuen Hauptprozessor, grob ab Baujahr 2017 und 2018. Ob Ihr Gerät dazugehört, zeigt das kostenlose Programm PC-Integritätsprüfung. Erfüllt es die Voraussetzungen nicht, läuft Windows 10 mit der Verlängerung sicher weiter.",
      },
      {
        frage: "Ich wurde angerufen, mein Windows sei unsicher. Stimmt das?",
        antwort:
          "Nein, das ist Betrug, und solche Anrufe häufen sich gerade. Microsoft ruft Privatleute nicht an. Auch Pop-up-Fenster, die zu einer Rückrufnummer oder einem Download drängen, sind immer gefälscht. Legen Sie auf, klicken Sie nichts an und schließen Sie das Fenster. Wenn Sie unsicher sind, rufen Sie mich lieber kurz an.",
      },
    ],
    produkte: [
      "externe-festplatte-2tb",
      "lenovo-ideapad-slim-3",
      "lenovo-mini-pc",
    ],
    weiterlesen: [
      { pfad: "/computerhilfe-senioren", titel: "Computerhilfe für Senioren" },
      { pfad: "/it-hilfe", titel: "IT-Hilfe im Berliner Südwesten" },
    ],
    quellen: [
      {
        titel:
          "Microsoft: Informationen zum Supportende von Windows 10 für Privatnutzer",
        url: "https://news.microsoft.com/de-de/informationen-zum-supportende-von-windows-10-fuer-privatnutzerinnen/",
      },
      {
        titel: "Microsoft: Extended Security Updates für Windows 10",
        url: "https://learn.microsoft.com/de-de/windows/whats-new/extended-security-updates",
      },
      {
        titel:
          "Dr. Windows: Windows 10 erhält Updates bis Oktober 2027, nochmalige Verlängerung für Privatnutzer",
        url: "https://www.drwindows.de/news/windows-10-erhaelt-updates-bis-oktober-2027-nochmalige-verlaengerung-fuer-privatnutzer",
      },
      {
        titel:
          "Borns IT-Blog: Microsoft verlängert kostenloses ESU bis Oktober 2027",
        url: "https://borncity.com/blog/2026/06/26/windows-10-microsoft-verlaengert-kostenloses-esu-bis-oktober-2027/",
      },
      {
        titel: "WindowsUnited: Windows 10 ESU wird nicht angezeigt",
        url: "https://windowsunited.de/windows-10-esu-wird-nicht-angezeigt/",
      },
    ],
  },
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
