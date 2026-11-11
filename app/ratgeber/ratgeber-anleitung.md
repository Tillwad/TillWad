# Einen neuen Ratgeber-Beitrag anlegen

Alles, was ein Beitrag braucht, steht in `beitraege.ts`. Dort einen neuen
Eintrag **oben** in die Liste `beitraege` einfügen, fertig. Es muss keine neue
Seitendatei angelegt werden.

Automatisch mitwachsen dann:

- die Übersicht unter `/ratgeber`
- die eigene Seite unter `/ratgeber/<slug>`
- `sitemap.xml` (mit dem echten Datum des Beitrags)
- `llms.txt` für KI-Assistenten
- der Block "Neu im Ratgeber" auf der Startseite und auf `/computerhilfe-senioren`
- die Auszeichnungen BlogPosting und FAQPage für Google

## Die Felder

| Feld | Was hineingehört |
| --- | --- |
| `slug` | Adresse der Seite, nur Kleinbuchstaben und Bindestriche. Das Hauptsuchwort gehört hinein. Nachträglich nicht mehr ändern, sonst bricht der Link. |
| `titel` | Die große Überschrift auf der Seite. Darf lang sein. |
| `metaTitel` | Der Titel bei Google. Höchstens rund 60 Zeichen, sonst wird er abgeschnitten. |
| `beschreibung` | Der Text unter dem Titel bei Google. 150 bis 165 Zeichen. |
| `thema` | Schlagwort für das gelbe Schildchen, etwa "Handy und Fotos". |
| `veroeffentlicht` | `JJJJ-MM-TT`. |
| `aktualisiert` | Nur setzen, wenn der Text wirklich überarbeitet wurde. |
| `lesezeit` | Minuten, grob geschätzt: rund 200 Wörter je Minute. |
| `teaser` | Zwei bis drei Sätze. Stehen in der Übersicht und oben im Beitrag. |
| `inhalt` | Der Text als Liste von Bausteinen, siehe unten. |
| `fragen` | Vier bis sechs Fragen mit Antworten. Werden als FAQPage ausgezeichnet. |
| `produkte` | Optional, Produkt-Slugs aus `shop/produkte.ts`. |
| `weiterlesen` | Optional, Verweise auf eigene Seiten. |
| `quellen` | Bei Beiträgen über aktuelle Änderungen: bitte immer. |

## Die Bausteine für `inhalt`

```ts
{ art: "absatz", text: "..." }
{ art: "zwischentitel", text: "..." }
{ art: "liste", punkte: ["...", "..."] }
{ art: "schritte", schritte: [{ titel: "...", text: "..." }] }
{ art: "kasten", ton: "wichtig" | "hinweis" | "gut", titel: "...", text: "..." }
{ art: "pfad", titel: "...", schritte: ["App öffnen", "Menü", "Papierkorb"] }
```

`pfad` ist für Tipp-Wege durch eine App gedacht und der wichtigste Baustein
überhaupt: Genau an diesen Ketten scheitern die Leute, und im Fließtext liest
man darüber hinweg.

## Was einen Beitrag erfolgreich macht

1. **Ein Problem, das gerade viele haben.** Die besten Themen kommen vom
   Telefon: Wenn dieselbe Frage dreimal in einer Woche kommt, ist das ein
   Beitrag.
2. **Die Frage in der Überschrift so, wie man sie eintippt.** Nicht "Cloud-Sync
   bei Samsung-Geräten", sondern "Samsung Fotos verschwunden".
3. **Die Lösung vollständig.** Wer nach dem Lesen noch weitersuchen muss,
   kommt nicht zurück. Die Angst, sich die Arbeit wegzunehmen, ist unbegründet:
   Wer es selbst schafft, ruft beim nächsten Mal an, weil er weiß, wer geholfen
   hat.
4. **Erst helfen, dann anbieten.** Das Angebot steht am Ende, nicht oben.
5. **Quellen nennen.** Bei allem, was mit Daten und Fristen zu tun hat.
6. **Keine Gedankenstriche** in sichtbaren Texten. Doppelpunkt, Komma oder
   Punkt stattdessen.

## Nach dem Anlegen

Mit `npm run build` prüfen, dass alles durchläuft, dann wie gewohnt
veröffentlichen. Damit ein neuer Beitrag schnell bei Google landet, in der
Search Console unter "URL-Prüfung" die neue Adresse eingeben und
"Indexierung beantragen" anklicken. Das dauert eine Minute und holt Tage
heraus.
