var json;

function updateVertretungsplan() { //http://stackoverflow.com/a/22790025
    var httpreq = new XMLHttpRequest();
    httpreq.open("GET", "http://fbi.gruener-campus-malchow.de/cis/pupilplanapi.php" + document.location.search, true);
    httpreq.onload = function(e) {
        if (httpreq.readyState === 4) {
            if (httpreq.status === 200) {
                updatePlan(JSON.parse(httpreq.responseText));
            } else {
                console.error(httpreq.statusText);
            }
        }
    }
    httpreq.onerror = function(e) {
        console.error(httpreq.statusText);
    }
    httpreq.send(null);
    return httpreq.responseText;
}

function updatePlan(plan) {
    json = plan;

    updateInfo(plan["Informationen"][0]);
    updateKlassen(plan)
}
    
function updateKlassen(plan) {
    var keineKlasse = ['Informationen', 'Tag', 'Time'];
    var klassenNamen = [];
    for (var klassenName in plan) {
        if (plan.hasOwnProperty(klassenName)) {
            if (!keineKlasse.includes(klassenName)) {
                klassenNamen.push(klassenName);
            }
        }
    }
    // klassenNamen sortieren
    var zahlenMuster = new RegExp("^\\d+");
    klassenNamen.sort(function (s1, s2) {
        var ret = parseInt(zahlenMuster.exec(s1)) - parseInt(zahlenMuster.exec(s2));
        if (ret != 0) {
            return ret;
        } else if (s1 < s2) {
            return -1;
        } else if (s1 > s2) {
            return 1;
        }
        return 0;
        });
    // update
    for (var i = 0; i < klassenNamen.length; i += 1) {
        var klassenName = klassenNamen[i];
        var klasse = plan[klassenName];
        updateKlasse(klassenName, klasse);
    }
}

function updateKlasse(klassenName, klasse) {
    var eintragsNummern = [];
    for (var eintragsNummer in klasse) {
        if (klasse.hasOwnProperty(eintragsNummer)) {
            eintragsNummern.push(eintragsNummer);
        }
    }
    // eintragsNummern wie Zahlen sortieren, obwohl sie Strings sind
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    eintragsNummern.sort(function (s1, s2) { return parseInt(s1) - parseInt(s2); })
    // addiere Eintraege auf
    var eintraege = [];
    var letzterEintrag;
    for (var i = 0; i < eintragsNummern.length; i += 1) {
        var eintragsNummer = eintragsNummern[i];
        var eintrag = klasse[eintragsNummer];
        if (istNeuerEintrag(eintrag)) {
            letzterEintrag = {"Raum":"", "Fach":"", "Hinweis":"", "Art":"", "Stunde":""};
            eintraege.push(letzterEintrag);
        }
        letzterEintrag["Raum"] += eintrag["Raum"];
        letzterEintrag["Fach"] += eintrag["Fach"];
        letzterEintrag["Hinweis"] += eintrag["Hinweis"];
        letzterEintrag["Art"] += eintrag["Art"];
        letzterEintrag["Stunde"] += eintrag["Stunde"];
    }
    // update mit addierten Eintraegen
    for (var i = 0; i < eintraege.length; i += 1) {
        var eintrag = eintraege[i];
        updateKasten(klassenName,
             eintrag["Raum"],
             eintrag["Fach"],
             eintrag["Stunde"],
             eintrag["Hinweis"],
             eintrag["Art"]);
        console.log(eintrag);
    }
}

var allSpace = new RegExp("^\\s*$"); 
function isAllSpace(string) {
    return allSpace.exec(string) != null;
}
function istNeuerEintrag(eintrag) {
    return !isAllSpace(eintrag["Art"]);
}

function updateInfo(informationen) {

}

updateVertretungsplan();
