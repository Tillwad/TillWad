import {
  type LucideIcon,
  Laptop,
  Smartphone,
  Wifi,
  Printer,
  ShieldCheck,
  Tv,
} from "lucide-react";

// Telefonnummer und E-Mail-Adresse stehen bewusst nicht hier, sondern zerlegt
// in app/schutz-links.tsx, damit sie nicht im Klartext im HTML landen.

export const SITE_URL = "https://www.tillwadehn.de";

export const ADRESSE = ["Breisgauer Str. 27", "14129 Berlin"];

/** Stundensatz als Zahl – Grundlage für Anzeige und strukturierte Daten. */
export const PREIS_ZAHL = 46;

export const PREIS_STUNDE = `${PREIS_ZAHL} € pro Stunde`;

export type Leistung = {
  icon: LucideIcon;
  farbe: string;
  titel: string;
  beschreibung: string;
  /** Eigene Unterseite zum Thema, falls es eine gibt. */
  seite?: string;
};

export const leistungen: Leistung[] = [
  {
    icon: Laptop,
    farbe: "bg-blue-100 text-blue-700",
    titel: "Computer & Laptop",
    beschreibung:
      "Einrichtung, langsame Geräte wieder schnell machen, Programme installieren und alle Fragen rund um Windows oder Apple.",
  },
  {
    icon: Smartphone,
    farbe: "bg-amber-100 text-amber-700",
    titel: "Handy & Tablet",
    beschreibung:
      "Neues Handy einrichten, Fotos sichern, WhatsApp erklären und alles so einstellen, dass Sie gut damit zurechtkommen.",
  },
  {
    icon: Wifi,
    farbe: "bg-sky-100 text-sky-700",
    titel: "Internet & WLAN",
    beschreibung:
      "Internet funktioniert nicht? Ich richte Ihren Router ein und sorge dafür, dass das WLAN in der ganzen Wohnung gut ankommt.",
  },
  {
    icon: Printer,
    farbe: "bg-violet-100 text-violet-700",
    titel: "Drucker anschließen & einrichten",
    beschreibung:
      "Drucker anschließen und einrichten, damit das Drucken vom Computer und vom Handy aus einfach funktioniert.",
    seite: "/drucker-hilfe",
  },
  {
    icon: Tv,
    farbe: "bg-rose-100 text-rose-700",
    titel: "Fernseher & Streaming",
    beschreibung:
      "Smart-TV einrichten, Mediatheken und Streaming-Dienste wie die ARD-Mediathek oder Netflix verständlich erklärt.",
  },
  {
    icon: ShieldCheck,
    farbe: "bg-green-100 text-green-700",
    titel: "Sicherheit & Betrugsschutz",
    beschreibung:
      "Ich zeige Ihnen, wie Sie betrügerische E-Mails und Anrufe erkennen, und mache Ihre Geräte sicher.",
  },
];

export type Frage = {
  frage: string;
  antwort: string;
};

// Häufige Fragen für die Startseite. Diese Liste wird zusätzlich als
// FAQPage-Auszeichnung (JSON-LD) ausgegeben, siehe app/strukturierte-daten.tsx.
export const fragen: Frage[] = [
  {
    frage: "Was kostet die Hilfe?",
    antwort: `Ein Hausbesuch kostet ${PREIS_STUNDE}. Abgerechnet wird nur die Zeit, die ich tatsächlich bei Ihnen vor Ort bin. Die Anfahrt innerhalb meines Einzugsgebiets ist kostenlos, und kurze Fragen am Telefon beantworte ich gerne, ohne dass Ihnen dafür etwas berechnet wird.`,
  },
  {
    frage: "Kommen Sie zu mir nach Hause?",
    antwort:
      "Ja. Ich komme zu Ihnen in die Wohnung oder ins Haus und schaue mir das Problem direkt an Ihren eigenen Geräten an. Das ist meistens der schnellste Weg, weil wir gemeinsam an dem Gerät sitzen, das Sie später auch benutzen.",
  },
  {
    frage: "Muss ich für den Termin etwas vorbereiten?",
    antwort:
      "Nein. Sie müssen nichts aufräumen, nichts aufschreiben und nichts installieren. Es hilft mir aber, wenn Sie mir am Telefon kurz schildern, worum es geht – dann kann ich das Passende mitbringen.",
  },
  {
    frage: "Ich kenne mich mit Technik überhaupt nicht aus. Ist das schlimm?",
    antwort:
      "Überhaupt nicht, im Gegenteil – genau dafür bin ich da. Ich erkläre alles in normalem Deutsch, ohne Fachbegriffe, und so oft Sie möchten. Es gibt bei mir keine dummen Fragen.",
  },
  {
    frage: "Helfen Sie auch bei Apple-Geräten?",
    antwort:
      "Ja. Ich helfe sowohl bei Windows-Computern als auch bei Mac, iPhone und iPad sowie bei Android-Handys und -Tablets. Auch bei Druckern, Routern und Smart-TVs bin ich für Sie da.",
  },
  {
    frage: "Wann muss ich bezahlen?",
    antwort:
      "Erst nach dem Termin, und nur die tatsächlich benötigte Zeit. Was der Besuch ungefähr kosten wird, sage ich Ihnen vorher – Sie haben keine versteckten Kosten zu befürchten.",
  },
  {
    frage: "Wie erreiche ich Sie am besten?",
    antwort:
      "Am einfachsten telefonisch. Wenn ich gerade nicht rangehen kann, sprechen Sie mir bitte auf den Anrufbeantworter, ich rufe zuverlässig zurück. Sie können mir stattdessen auch eine E-Mail schreiben.",
  },
  {
    frage: "Kann ich Sie auch anrufen, wenn ich nur eine kurze Frage habe?",
    antwort:
      "Ja, sehr gerne. Kurze Fragen kläre ich oft schon am Telefon, und das kostet Sie nichts. Wenn sich zeigt, dass wir gemeinsam vor dem Gerät sitzen sollten, machen wir einen Termin aus.",
  },
];

// Häufige Fragen speziell zum Drucker, für /drucker-hilfe. Bewusst eine
// eigene Liste: Auf der Unterseite sollen andere Fragen stehen als auf der
// Startseite, sonst wäre die neue Seite nur eine Wiederholung.
export const druckerFragen: Frage[] = [
  {
    frage: "Können Sie meinen Drucker reparieren?",
    antwort:
      "Meistens muss gar nichts repariert werden. Wenn ein Drucker „kaputt“ wirkt, liegt es sehr oft daran, dass er die Verbindung zum Computer oder zum WLAN verloren hat, dass ein Treiber fehlt oder dass eine Einstellung verstellt wurde – das bekomme ich vor Ort in Ordnung. Ist tatsächlich etwas am Gerät defekt, öffne ich es nicht, sondern sage Ihnen ehrlich, ob sich eine Reparatur lohnt oder ein neues Gerät die vernünftigere Wahl ist.",
  },
  {
    frage: "Mein Drucker wird vom Computer nicht mehr gefunden. Was tun?",
    antwort:
      "Das ist die mit Abstand häufigste Drucker-Frage, die man mir stellt, und sie lässt sich fast immer lösen. Typische Ursachen sind ein Router-Wechsel, ein Windows-Update oder ein neuer Computer. Ich verbinde den Drucker neu, richte ihn sauber ein und sorge dafür, dass er auch nach dem nächsten Neustart noch gefunden wird.",
  },
  {
    frage: "Kann ich vom Handy oder Tablet aus drucken?",
    antwort:
      "Ja, das können fast alle Drucker der letzten Jahre – es ist nur oft nicht eingerichtet. Ich richte das für iPhone, iPad und Android-Geräte ein und zeige Ihnen, wie Sie ein Foto oder einen Brief mit zwei, drei Tippern zu Papier bringen.",
  },
  {
    frage: "Ich habe einen neuen Drucker gekauft. Richten Sie ihn mir ein?",
    antwort:
      "Sehr gerne. Ich packe ihn aus, schließe ihn an, verbinde ihn mit Ihrem WLAN und Ihren Geräten, richte das Scannen ein und entsorge die Verpackung, wenn Sie möchten. Am Ende drucken wir gemeinsam eine Testseite, damit Sie sehen, dass alles läuft.",
  },
  {
    frage: "Welchen Drucker soll ich kaufen?",
    antwort:
      "Das kommt darauf an, wie viel Sie drucken. Wer nur gelegentlich etwas ausdruckt, fährt mit einem Laserdrucker oft besser, weil dessen Toner nicht eintrocknet. Wer regelmäßig Fotos druckt, ist mit Tinte besser bedient. Rufen Sie mich vor dem Kauf gerne kurz an – diese Beratung kostet Sie nichts, und sie erspart Ihnen womöglich einen Fehlkauf.",
  },
  {
    frage: "Warum druckt mein Drucker plötzlich nicht mehr richtig?",
    antwort:
      "Streifen im Ausdruck, blasse Farben oder leere Seiten deuten meist auf eingetrocknete Druckköpfe oder auf eine Patrone hin, die das Gerät nicht annimmt. Ich reinige die Düsen über die richtige Funktion des Geräts, prüfe die Patronen und zeige Ihnen, wie Sie das künftig selbst machen können.",
  },
];

export type Ort = {
  slug: string;
  name: string;
  text: string;
  /** Ortsspezifischer Absatz: worauf es bei der Technikhilfe genau hier ankommt. */
  lokal: string;
  /** Konkrete Straßen, Kieze und Ortsteile, in denen ich unterwegs bin. */
  gebiete: string[];
  /** Hinweis zur Anfahrt – erklärt, warum ich schnell hier bin. */
  anfahrt: string;
  /** Nur für diesen Ort gültige Fragen. Ergänzen die allgemeinen Fragen. */
  fragen: Frage[];
  /**
   * Absatz über die Hilfe für ältere Menschen in diesem Ort. Bewusst je Ort
   * eigens geschrieben: Achtmal derselbe Text wäre genau die Doppelung, die
   * uns die Meldung "Duplikat ohne Canonical" eingebracht hat.
   */
  senioren: string;
  /**
   * Beschreibung für die Suchergebnisse, höchstens rund 155 Zeichen – mehr
   * zeigt Google nicht an. Ebenfalls je Ort eigens geschrieben statt aus einer
   * Schablone gebildet.
   */
  metaBeschreibung: string;
  bild: string;
  bildAlt: string;
  bildAutor: string;
  bildLizenz: string;
  bildLizenzUrl: string;
};

export const orte: Ort[] = [
  {
    slug: "kleinmachnow",
    name: "Kleinmachnow",
    text: "Auch außerhalb der Berliner Stadtgrenze bin ich für Sie da: Nach Kleinmachnow komme ich regelmäßig – die Anfahrt kostet Sie selbstverständlich nichts.",
    lokal:
      "Kleinmachnow ist geprägt von Einfamilienhäusern mit großen Grundstücken – und genau das ist der häufigste Grund, warum man mich hier ruft: Der Router steht im Flur im Erdgeschoss, und im Schlafzimmer unterm Dach oder auf der Terrasse kommt vom WLAN kaum noch etwas an. Das lässt sich fast immer lösen, ohne dass Sie einen neuen Vertrag brauchen. Daneben helfe ich hier oft dabei, Fernseher, Handy und Computer so miteinander zu verbinden, dass zum Beispiel die Urlaubsfotos vom Handy auf dem großen Bildschirm im Wohnzimmer landen.",
    gebiete: [
      "Rund um den Rathausmarkt",
      "Am Weinberg und Seeberg",
      "Zehlendorfer Damm und Förster-Funke-Allee",
      "Rund um die Bäke und die Schleuse",
      "Dreilinden",
    ],
    anfahrt:
      "Von Zehlendorf aus bin ich über den Teltower Damm in wenigen Minuten bei Ihnen. Dass Kleinmachnow schon in Brandenburg liegt, ändert nichts am Preis: Die Anfahrt bleibt für Sie kostenlos.",
    fragen: [
      {
        frage:
          "Kleinmachnow liegt in Brandenburg – berechnen Sie dafür Anfahrtskosten?",
        antwort:
          "Nein. Kleinmachnow gehört fest zu meinem Einzugsgebiet, auch wenn es hinter der Berliner Stadtgrenze liegt. Sie zahlen genau denselben Stundensatz wie in Zehlendorf, und die Anfahrt ist kostenlos.",
      },
      {
        frage:
          "Bei uns im Haus reicht das WLAN nicht bis ins Obergeschoss. Können Sie das in Kleinmachnow lösen?",
        antwort:
          "In der Regel ja. Bei den größeren Häusern hier ist das ein sehr häufiges Thema. Oft genügt es schon, den Router besser zu stellen oder einen zusätzlichen Zugangspunkt einzurichten, damit das WLAN im ganzen Haus und auch im Garten ankommt. Ich schaue mir das vor Ort an und sage Ihnen ehrlich, was nötig ist.",
      },
    ],
    senioren:
      "In Kleinmachnow helfe ich vielen älteren Menschen, die in ihrem Haus seit Jahrzehnten zu Hause sind und einfach möchten, dass die Technik darin funktioniert. Wir gehen das in Ruhe an: Ich erkläre jeden Schritt in normalem Deutsch und wiederhole ihn, so oft Sie mögen. Niemand muss sich hier für eine Frage schämen.",
    metaBeschreibung:
      "Computerhilfe in Kleinmachnow bei Ihnen zu Hause. IT-Hilfe für Senioren, dazu WLAN, das im ganzen Haus ankommt. Anfahrt kostenlos. Jetzt anrufen.",
    bild: "/images/orte/kleinmachnow.jpg",
    bildAlt: "Die Schleuse Kleinmachnow",
    bildAutor: "A.Savin",
    bildLizenz: "FAL",
    bildLizenzUrl: "http://artlibre.org/licence/lal/en",
  },
  {
    slug: "wannsee",
    name: "Wannsee",
    text: "Ob im Ortskern von Wannsee oder in den ruhigen Seitenstraßen Richtung Havel – ich komme zu Ihnen nach Hause und nehme mir Zeit für Ihr Anliegen.",
    lokal:
      "Wannsee ist weitläufig, und die Wohnlagen liegen weit auseinander – vom Ortskern an der Königstraße über die Villenstraßen am Sandwerder bis nach Kohlhasenbrück und Steinstücken. Für mich heißt das vor allem: Ich plane für Wannsee bewusst mehr Zeit ein, damit ich nicht unter Druck bei Ihnen ankomme. Inhaltlich ist hier ein Thema besonders oft dabei: die alten, massiv gebauten Häuser. Dicke Wände schlucken Funk, deshalb ist das WLAN in einzelnen Zimmern schwach und der Handyempfang manchmal ebenfalls. Auch dafür gibt es Lösungen.",
    gebiete: [
      "Ortskern an der Königstraße",
      "Am Großen Wannsee und Am Sandwerder",
      "Kolonie Alsen",
      "Kohlhasenbrück",
      "Steinstücken",
    ],
    anfahrt:
      "Ich komme mit dem Auto über die Königstraße zu Ihnen. Auch wenn Wannsee der am weitesten entfernte Teil meines Gebiets ist, berechne ich Ihnen keine Anfahrt – wir stimmen nur den Termin etwas großzügiger ab.",
    fragen: [
      {
        frage: "Kommen Sie auch nach Kohlhasenbrück oder Steinstücken?",
        antwort:
          "Ja. Auch die abgelegeneren Ecken von Wannsee gehören zu meinem Einzugsgebiet, Steinstücken und Kohlhasenbrück eingeschlossen. Sagen Sie mir am Telefon einfach, wo genau Sie wohnen, dann planen wir den Termin passend.",
      },
      {
        frage:
          "In unserem alten Haus in Wannsee ist das WLAN in manchen Zimmern sehr schwach. Woran liegt das?",
        antwort:
          "Meistens an den Wänden. In den älteren, massiv gebauten Häusern hier kommt das Funksignal des Routers nur schwer durch, besonders über mehrere Etagen. Ein neuer Vertrag beim Anbieter hilft dagegen fast nie – nötig ist eine bessere Verteilung im Haus. Ich messe vor Ort nach und richte das entsprechend ein.",
      },
    ],
    senioren:
      "Weil in Wannsee alles etwas weiter auseinanderliegt, plane ich für Besuche bei älteren Kundinnen und Kunden bewusst mehr Zeit ein. Kein Blick auf die Uhr, keine Eile: Wir klären Ihre Frage so lange, bis Sie sich damit wohlfühlen – und wenn beim nächsten Mal dasselbe noch einmal drankommt, ist das völlig in Ordnung.",
    metaBeschreibung:
      "Computerhilfe in Wannsee bei Ihnen zu Hause. IT-Hilfe für Senioren bei Computer, Handy und WLAN – auch in Kohlhasenbrück und Steinstücken.",
    bild: "/images/orte/wannsee.jpg",
    bildAlt: "Blick über den Großen Wannsee",
    bildAutor: "Times",
    bildLizenz: "CC BY-SA 3.0",
    bildLizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    slug: "schlachtensee",
    name: "Schlachtensee",
    text: "Rund um den Schlachtensee helfe ich Ihnen direkt bei Ihnen zu Hause – geduldig, verständlich und ohne Fachchinesisch.",
    lokal:
      "Am Schlachtensee bin ich buchstäblich Ihr Nachbar: Ich wohne selbst in diesem Kiez, nur ein paar Straßen entfernt. Kurzfristige Termine sind hier deshalb am ehesten möglich, und wenn nach einem Besuch noch eine Frage offenbleibt, komme ich für ein paar Minuten unkompliziert noch einmal vorbei. Gefragt bin ich hier besonders oft bei Handy und Tablet – neues Gerät einrichten, Fotos vom alten Handy retten, WhatsApp und Videotelefonie mit den Enkeln zum Laufen bringen.",
    gebiete: [
      "Beerenstraße und Matterhornstraße",
      "Fischerhüttenstraße",
      "Rund um den S-Bahnhof Schlachtensee",
      "Am Schlachtensee und Richtung Krumme Lanke",
      "Breisgauer Straße und Umgebung",
    ],
    anfahrt:
      "Hier brauche ich kein Auto: Zu den meisten Adressen am Schlachtensee komme ich zu Fuß oder mit dem Rad. Kürzere Wege gibt es in meinem Einzugsgebiet nicht.",
    fragen: [
      {
        frage: "Wie schnell können Sie am Schlachtensee da sein?",
        antwort:
          "Am Schlachtensee bin ich zu Hause, deshalb sind kurzfristige Termine hier am ehesten machbar – manchmal sogar noch am selben Tag. Rufen Sie einfach an, dann sage ich Ihnen direkt, wann es passt.",
      },
      {
        frage:
          "Können Sie mir mein neues Handy einrichten und die Fotos vom alten übernehmen?",
        antwort:
          "Ja, das mache ich hier sehr häufig. Wir übertragen Ihre Fotos, Kontakte und Nachrichten vom alten auf das neue Gerät, richten alles so ein, dass Sie gut damit zurechtkommen, und ich zeige Ihnen in Ruhe, was sich verändert hat. Bringen Sie zum Termin am besten beide Geräte bereit.",
      },
    ],
    senioren:
      "Am Schlachtensee bin ich Ihr Nachbar, und das merken ältere Kundinnen und Kunden vor allem daran: Wenn nach meinem Besuch eine Frage offenbleibt, komme ich für ein paar Minuten noch einmal vorbei. Sie müssen sich also nicht alles auf einmal merken – gerade beim neuen Handy ist das eine große Erleichterung.",
    metaBeschreibung:
      "Computerhilfe am Schlachtensee bei Ihnen zu Hause. IT-Hilfe für Senioren, neues Handy einrichten, Fotos retten. Ich wohne selbst im Kiez.",
    bild: "/images/orte/schlachtensee.jpg",
    bildAlt: "Der Schlachtensee",
    bildAutor: "A.Savin",
    bildLizenz: "FAL",
    bildLizenzUrl: "http://artlibre.org/licence/lal/en",
  },
  {
    slug: "nikolassee",
    name: "Nikolassee",
    text: "In Nikolassee bin ich schnell bei Ihnen: Ich helfe direkt vor Ort bei Computer, Handy und Internet und erkläre alles in Ruhe.",
    lokal:
      "Nikolassee ist mein eigener Ortsteil – meine Adresse liegt in der Breisgauer Straße, mitten im Gebiet. Näher dran geht nicht, und entsprechend flexibel kann ich hier Termine legen. Typisch für Nikolassee sind Häuser mit mehreren Etagen und oft noch alter Telefonverkabelung. Wenn das Internet ständig abbricht, liegt es hier erfahrungsgemäß seltener am Anbieter als an der Leitung in der Wohnung oder an einem veralteten Router. Das schaue ich mir vor Ort an, bevor Sie unnötig einen neuen Vertrag abschließen.",
    gebiete: [
      "Rund um die Rehwiese",
      "Kirchweg und Borussenstraße",
      "Prinz-Friedrich-Leopold-Straße",
      "Sven-Hedin-Straße",
      "Rund um den S-Bahnhof Nikolassee",
    ],
    anfahrt:
      "Ich wohne selbst in Nikolassee und bin daher meist in wenigen Minuten bei Ihnen – häufig sogar zu Fuß oder mit dem Rad.",
    fragen: [
      {
        frage: "Wohnen Sie selbst in Nikolassee?",
        antwort:
          "Ja. Meine Adresse liegt in der Breisgauer Straße in Nikolassee. Ich bin also tatsächlich Ihr Nachbar und nicht ein Dienstleister, der von weit her anreist – das merken Sie an den kurzen Wegen und daran, dass ich auch für eine kleine Nachfrage noch einmal vorbeikomme.",
      },
      {
        frage:
          "Unser Internet bricht in Nikolassee ständig ab. Sollen wir den Anbieter wechseln?",
        antwort:
          "Bitte noch nicht. In den älteren Häusern hier liegt die Ursache sehr oft in der Wohnung selbst: eine alte Telefondose, ein zu langes Kabel oder ein Router, der seit Jahren nicht mehr aktualisiert wurde. Lassen Sie mich das zuerst prüfen. Wenn es wirklich an der Leitung liegt, sage ich Ihnen das ehrlich.",
      },
    ],
    senioren:
      "Für ältere Menschen in Nikolassee bin ich buchstäblich der Nachbar von nebenan – meine Adresse liegt hier im Ortsteil. Das heißt kurze Wege und die Ruhe, eine Sache auch zweimal zu erklären. Besonders oft geht es darum, Video-Anrufe mit Kindern und Enkeln so einzurichten, dass sie ohne Hilfe klappen.",
    metaBeschreibung:
      "Computerhilfe in Nikolassee bei Ihnen zu Hause. IT-Hilfe für Senioren bei Computer, Handy und Internet. Ich wohne selbst hier – kurze Wege.",
    bild: "/images/orte/nikolassee.jpg",
    bildAlt: "Der S-Bahnhof Nikolassee",
    bildAutor: "A.Savin",
    bildLizenz: "FAL",
    bildLizenzUrl: "http://artlibre.org/licence/lal/en",
  },
  {
    slug: "grunewald",
    name: "Grunewald",
    text: "Auch im Grunewald bin ich für Sie unterwegs und helfe bei allen Fragen rund um Computer, Fernseher, WLAN und Drucker.",
    lokal:
      "Im Grunewald stehen viele große Altbauvillen – schön zu wohnen, aber für Funk eine Herausforderung: Über drei Etagen und durch massive Wände schafft es ein einzelner Router selten. Entsprechend oft geht es hier darum, das WLAN sauber im ganzen Haus zu verteilen, gern auch bis ins Gartenhaus oder ins Souterrain. Das zweite häufige Thema ist der Fernseher: Smart-TV einrichten, Mediatheken und Streamingdienste so sortieren, dass Sie mit einer Fernbedienung zurechtkommen statt mit dreien.",
    gebiete: [
      "Hagenstraße und Herthastraße",
      "Koenigsallee",
      "Bismarckallee und Hubertusallee",
      "Rund um den Grunewaldturm",
      "Richtung Halensee",
    ],
    anfahrt:
      "In den Grunewald komme ich über die Clayallee und die Hüttenweg-Verbindung. Auch hier gilt: Die Anfahrt berechne ich Ihnen nicht.",
    fragen: [
      {
        frage:
          "Wir haben ein großes Haus im Grunewald. Bekommen Sie WLAN in alle Etagen?",
        antwort:
          "In aller Regel ja. Bei den großen Häusern hier reicht ein einzelner Router fast nie aus. Ich schaue mir an, wo das Signal abreißt, und richte die Verteilung so ein, dass Sie in jeder Etage – oft auch im Garten – stabiles WLAN haben. Welche Geräte dafür wirklich nötig sind, bespreche ich vorher mit Ihnen.",
      },
      {
        frage:
          "Können Sie unseren Fernseher einrichten und uns die Mediatheken erklären?",
        antwort:
          "Sehr gerne, das ist eines meiner häufigsten Themen im Grunewald. Ich richte den Smart-TV ein, verbinde ihn mit dem Internet, sortiere die Mediatheken und Streamingdienste übersichtlich und zeige Ihnen in Ruhe, wie Sie damit umgehen – so oft Sie möchten.",
      },
    ],
    senioren:
      "Im Grunewald werde ich von älteren Kundinnen und Kunden am häufigsten zum Fernseher gerufen: Drei Fernbedienungen, und keine tut das, was sie soll. Ich sortiere das so, dass eine genügt, schreibe die wichtigen Schritte bei Bedarf auf und zeige sie Ihnen so oft, wie Sie möchten.",
    metaBeschreibung:
      "Computerhilfe im Grunewald bei Ihnen zu Hause. IT-Hilfe für Senioren: Smart-TV einrichten, WLAN über alle Etagen, Mediatheken erklärt.",
    bild: "/images/orte/grunewald.jpg",
    bildAlt: "Der Grunewaldturm",
    bildAutor: "Times",
    bildLizenz: "CC BY-SA 3.0",
    bildLizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    slug: "dahlem",
    name: "Dahlem",
    text: "In Dahlem komme ich direkt zu Ihnen nach Hause – vom Dorfkern bis zu den Straßen rund um die Freie Universität.",
    lokal:
      "Dahlem ist bunt gemischt: der alte Dorfkern rund um die Domäne, die ruhigen Villenstraßen im Dol und das lebhafte Viertel rund um die Freie Universität. Entsprechend unterschiedlich sind die Anliegen. Häufig geht es hier ums Sichere: E-Mails, die angeblich von der Bank kommen, Anrufe von angeblichen Microsoft-Mitarbeitern, Warnmeldungen, die plötzlich auf dem Bildschirm aufpoppen. Ich zeige Ihnen in Ruhe, woran Sie solche Maschen erkennen, und richte Ihre Geräte so ein, dass möglichst wenig davon überhaupt bei Ihnen ankommt.",
    gebiete: [
      "Dorfkern rund um die Domäne Dahlem",
      "Königin-Luise-Straße",
      "Im Dol",
      "Thielallee und Podbielskiallee",
      "Rund um den Botanischen Garten",
    ],
    anfahrt:
      "Von Zehlendorf aus bin ich über die Clayallee oder die Königin-Luise-Straße schnell in Dahlem – ohne Anfahrtskosten für Sie.",
    fragen: [
      {
        frage:
          "Ich habe eine merkwürdige E-Mail bekommen. Können Sie sich das in Dahlem ansehen?",
        antwort:
          "Ja, und bitte zögern Sie damit nicht. Löschen Sie die Nachricht nicht sofort und klicken Sie nichts an – rufen Sie mich lieber kurz an. Oft kann ich Ihnen schon am Telefon sagen, ob es Betrug ist. Wenn nötig, komme ich vorbei, prüfe Ihr Gerät und zeige Ihnen, woran Sie solche Nachrichten künftig selbst erkennen.",
      },
      {
        frage:
          "Es hat jemand angerufen und behauptet, mein Computer sei kaputt. Was nun?",
        antwort:
          "Das ist eine bekannte Betrugsmasche und kommt hier leider regelmäßig vor. Legen Sie einfach auf, geben Sie niemandem am Telefon Zugriff auf Ihren Computer und nennen Sie keine Zugangsdaten. Wenn Sie unsicher sind, ob doch etwas passiert ist, schaue ich mir Ihr Gerät vor Ort an und mache es wieder sauber.",
      },
    ],
    senioren:
      "Ältere Menschen sind das bevorzugte Ziel von Betrugsmaschen im Internet, und in Dahlem werde ich deshalb oft genau dafür gerufen. Ich zeige Ihnen ohne erhobenen Zeigefinger, woran Sie falsche E-Mails und Anrufe erkennen. Fragen kostet nichts – lieber einmal zu viel angerufen als einmal zu wenig.",
    metaBeschreibung:
      "Computerhilfe in Dahlem bei Ihnen zu Hause. IT-Hilfe für Senioren, Schutz vor Betrug per E-Mail und Telefon. Verständlich erklärt.",
    bild: "/images/orte/dahlem.jpg",
    bildAlt: "Die Domäne Dahlem",
    bildAutor: "Karl-Heinz Meurer",
    bildLizenz: "CC BY-SA 3.0",
    bildLizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    slug: "zehlendorf",
    name: "Zehlendorf",
    text: "Zehlendorf ist das Herz meines Einzugsgebiets – hier bin ich besonders schnell bei Ihnen und helfe bei allem, was Technik heißt.",
    lokal:
      "Zehlendorf liegt mitten in meinem Gebiet, deshalb bin ich hier am häufigsten unterwegs – vom Teltower Damm über Onkel Toms Hütte bis zum Mexikoplatz. Die Wohnformen sind gemischt: Etagenwohnungen an der Clayallee, Reihenhäuser in der Waldsiedlung, Altbauten rund um den Mexikoplatz. Entsprechend breit sind die Anliegen, und weil die Wege kurz sind, kann ich hier auch mal für eine halbe Stunde vorbeikommen, wenn nur eine Kleinigkeit klemmt. Genau dafür rechne ich nach Zeit ab und nicht in Pauschalen.",
    gebiete: [
      "Teltower Damm und Rathaus Zehlendorf",
      "Clayallee",
      "Onkel Toms Hütte und die Waldsiedlung",
      "Rund um den Mexikoplatz",
      "Richtung Krumme Lanke",
    ],
    anfahrt:
      "Zehlendorf ist mein Heimatgebiet – ich bin hier praktisch täglich unterwegs und daher besonders schnell bei Ihnen.",
    fragen: [
      {
        frage: "Kommen Sie auch, wenn es nur eine Kleinigkeit ist?",
        antwort:
          "Ja, gerade in Zehlendorf. Die Wege sind für mich kurz, deshalb lohnt sich auch ein kurzer Besuch. Ich rechne nach der tatsächlich benötigten Zeit ab – für eine halbe Stunde zahlen Sie also auch nur eine halbe Stunde und keine Pauschale.",
      },
      {
        frage:
          "Helfen Sie in Zehlendorf auch in Mietwohnungen und nicht nur in Häusern?",
        antwort:
          "Selbstverständlich. Ob Etagenwohnung an der Clayallee, Reihenhaus in der Waldsiedlung oder Altbau am Mexikoplatz – ich komme überall dorthin, wo Ihre Geräte stehen. Für die Arbeit an Computer, Handy oder Router brauche ich nichts weiter als einen Platz am Tisch.",
      },
    ],
    senioren:
      "In Zehlendorf bin ich fast täglich unterwegs, deshalb lohnt sich hier auch der kurze Besuch. Gerade ältere Kundinnen und Kunden zögern oft, wegen einer Kleinigkeit anzurufen – das müssen Sie nicht. Ich rechne nach Zeit ab, eine halbe Stunde kostet auch nur eine halbe Stunde.",
    metaBeschreibung:
      "Computerhilfe in Zehlendorf bei Ihnen zu Hause. IT-Hilfe für Senioren bei Computer, Handy und Drucker. Auch kurze Besuche, Abrechnung nach Zeit.",
    bild: "/images/orte/zehlendorf.jpg",
    bildAlt: "Das Rathaus Zehlendorf",
    bildAutor: "Clemensfranz",
    bildLizenz: "CC BY-SA 3.0",
    bildLizenzUrl: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  {
    slug: "teltow",
    name: "Teltow",
    text: "Auch nach Teltow komme ich gerne zu Ihnen nach Hause – die Anfahrt ist für Sie kostenlos, versprochen.",
    lokal:
      "Teltow ist zweigeteilt: die gewachsene Altstadt rund um die St.-Andreas-Kirche auf der einen Seite, die neueren Wohngebiete in Seehof und Richtung Sigridshorst auf der anderen. In den Neubaugebieten geht es oft um Geräte, die miteinander sprechen sollen – Fernseher, Lautsprecher, Handy, Türklingel – und die sich untereinander ins Gehege kommen. In der Altstadt ist es häufiger die klassische Frage: Der Computer ist über die Jahre langsam geworden, und niemand weiß mehr, welche Programme darauf eigentlich noch gebraucht werden. Beides lässt sich in einem ruhigen Termin klären.",
    gebiete: [
      "Altstadt rund um die St.-Andreas-Kirche",
      "Teltow-Seehof",
      "Potsdamer Straße und Ruhlsdorfer Straße",
      "Sigridshorst",
      "Entlang des Teltowkanals",
    ],
    anfahrt:
      "Ich komme über den Teltower Damm und den Teltowkanal zu Ihnen. Teltow liegt in Brandenburg, gehört aber ganz normal zu meinem Einzugsgebiet – ohne Aufschlag und ohne Anfahrtskosten.",
    fragen: [
      {
        frage: "Fahren Sie wirklich bis nach Teltow – auch nach Seehof?",
        antwort:
          "Ja. Teltow gehört komplett zu meinem Einzugsgebiet, die Altstadt ebenso wie Seehof und Sigridshorst. Für die Fahrt über die Landesgrenze berechne ich Ihnen nichts extra; es gilt derselbe Stundensatz wie in Berlin.",
      },
      {
        frage:
          "Mein Computer ist über die Jahre sehr langsam geworden. Muss ich einen neuen kaufen?",
        antwort:
          "Meistens nicht. Sehr oft liegt es an Programmen, die beim Start unbemerkt mitlaufen, an einer vollen Festplatte oder an fehlenden Aktualisierungen – das lässt sich in einem Termin beheben. Nur wenn das Gerät wirklich zu alt ist, sage ich Ihnen das ehrlich und berate Sie, was Sie brauchen und was nicht.",
      },
    ],
    senioren:
      "Viele ältere Menschen in Teltow fürchten, ihr langsam gewordener Computer sei nun ein Fall für den Sperrmüll. Das stimmt selten. Ich schaue mir das Gerät an, sage Ihnen ehrlich, ob sich eine Auffrischung lohnt, und rede Ihnen ganz sicher nichts Neues auf, das Sie nicht brauchen.",
    metaBeschreibung:
      "Computerhilfe in Teltow bei Ihnen zu Hause. IT-Hilfe für Senioren: langsamer Computer, Handy, Drucker. Altstadt und Seehof, Anfahrt kostenlos.",
    bild: "/images/orte/teltow.jpg",
    bildAlt: "Die St.-Andreas-Kirche in Teltow",
    bildAutor: "Bautsch",
    bildLizenz: "CC0",
    bildLizenzUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.de",
  },
];
