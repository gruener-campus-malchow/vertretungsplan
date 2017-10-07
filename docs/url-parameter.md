# URL-Parameter für plan.html:
## Passwort-Eingabe
Parameter: `cert=123`

Angeben des Passworts für die pupilplanapi.php, in der das Passwort auch überprüft wird. jsonparser.js prüft lediglich, ob die API ein korrektes Passwort feststellte.
## Foyer Features
Parameter: `user=foyer`

Features für user=foyer:
- automatisches Scrollen des Plans, damit alle Informationen sichtbar sind
- verstecken des Dropdowns für die Klassenauswahl
- aktualisieren der Seite nach einer bestimmten Zeit

Wird dieser Parameter weggelassen, wie es der Fall sein sollte, wenn man den Plan z.B. von zu Hause aus aufruft, sind die obigen Features deaktiviert.
## Bestimmte Klassen anzeigen
Parameter: `klasse=7a`

Wird dieser Parameter angegeben, werden nur Vertretungsstunden für diese Klasse angezeigt. Wird er weggelassen, wird alles angezeigt.
Er wird vom Klassen-Dropdown genutzt.
## Bestimmte Klassenstufen anzeigen
Parameter: `klassenstufe=8`

Nur Vertretungsstunden für diese Klassenstufe werden angezeigt. Wird er weggelassen, wird alles angezeigt.
## Test Informationen
Parameter: `dev=wanto`

Dieser Parameter füllt den Plan mit anonymisierten Daten. Wird dieser Parameter angegeben, wird kein Passwort benötigt.
Er existiert für Testzwecke.
## Schriftgröße anpassen
Parameter: `size=1.2`

Alle Schriftgrößen werden mit diesem Wert multipliziert, das heißt eine Größe von 1.0 entspricht der Originalgröße. 2 entspricht der doppelten Größe und 0.5 der halben Größe.
Der Text im Header nimmt maximal den Wert 3 an.
## Banner einblenden
Parameter: `banner=true`

Im unteren Bereich des Plans wird das Bild eingeblendet, das unter https://cis.gruener-campus-malchow.de/diglit/img/banner.png gespeichert ist.
Der Banner nimmt maximal 40% der Höhe des Bildschirms und 100% der Breite ein, er sollte also eher breit als hoch sein, damit er weniger Platz verbraucht.
# URL-Parameter für index.html:
## Falsches Passwort
Parameter: `wrongpw=true`

Wird verwendet um festzustellen, ob ein falsches Passwort angegeben wurde, damit der Text unter dem Passwort-Eingabefeld verändert werden kann. Gibt man ein falsches Passwort ein, redirected jsonparser.js auf index.html?wrongpw=true.
