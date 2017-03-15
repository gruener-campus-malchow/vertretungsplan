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
## Test Informationen
Parameter: `dev=wanto`

Dieser Parameter füllt den Plan mit anonymisierten Daten. Wird dieser Parameter angegeben, wird kein Passwort benötigt.
Er existiert für Testzwecke.

# URL-Parameter für index.html:
## Falsches Passwort
Parameter: `wrongpw=true`

Wird verwendet um festzustellen, ob ein falsches Passwort angegeben wurde, damit der Text unter dem Passwort-Eingabefeld verändert werden kann. Gibt man ein falsches Passwort ein, redirected jsonparser.js auf index.html?wrongpw=true.
