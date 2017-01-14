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
    // TODO: klassenNamen sortieren
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
    // TODO: eintragsNummern sortieren
    for (var i = 0; i < eintragsNummern.length; i += 1) {
        var eintragsNummer = eintragsNummern[i];
        var eintrag = klasse[eintragsNummer];
        console.log(klassenName + " : " + eintragsNummer + " -> " +
                    eintrag["Art"]);
        updateKasten(klassenName, eintrag["Raum"], eintrag["Fach"],
                     eintrag["Stunde"], eintrag["Hinweis"],
                     eintrag["Art"]);
    }
}

function updateInfo(informationen) {

}

updateVertretungsplan();
