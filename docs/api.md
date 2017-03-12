# API
Die Daten für den Vertretungsplan kommen von der "PupilPlanAPI".
Diese ist erreichbar unter der URL http://fbi.gruener-campus-malchow.de/cis/pupilplanapi.php?cert=Passwort
("Passwort" in der URL muss mit dem Passwort ausgetauscht werden.)
In der Datei "jsonparser.js" in der Funktion "updateVertretungsplan()" wird eine HTTP-Request an die PupilplanAPI gesendet.
Bei Erfolg kommt eine .json-Datei zurück, die der Funktion "updatePlan()" übergeben wird. Hier werden alle Daten aus der Datei ausgewertet.
Das json sollte alle Klassen nach Alphabet und nach der Zahlenfolge sortiert beinhalten. Das heißt, "7a" würde vor "7b" stehen und "8a" kommt nach "7b" (Falls das json irgendwann nicht mehr sortiert sein sollte, kann die Funktion sortClassNames(classNames) verwendet werden).
Ein anonymisiertes Beispiel sieht so aus:

```
{"Tag":"20.1.2017 Freitag","Time":"2017-01-20","Informationen":[],"7b":

  {"1":
  
    {"Stunde":"1 - 2","Fach":"DEU","Raum":"3.309","LehrerIn":"___(statt ___)","Hinweis":"\u00a0","Art":"Vertretung"},
    
   "2":
   
    {"Stunde":"3 - 4","Fach":"MA","Raum":"3.214","LehrerIn":"___","Hinweis":"\u00a0","Art":"Vertretung"}
    
   "3":
   
    {"Stunde":"5","Fach":"EN","Raum":"3.202","LehrerIn":"___","Hinweis":"\u00a0","Art":"Ausfall"}
    
  }
  
}
```

Test
----

Die API hat eine test-Schnittstelle:

- `cert=00000000`
- `user=test&passphrase0000`

