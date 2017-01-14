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

    var keineKlasse = ['Informationen', 'Tag', 'Time'];
    for (var klassenName in plan) {
        if (plan.hasOwnProperty(klassenName)) {
            if (!keineKlasse.includes(klassenName)) {

                var klasse = plan[klassenName];
                for (var eintragsNummer in klasse) {
                    if (klasse.hasOwnProperty(eintragsNummer)) {
                        console.log(klassenName + " : " + eintragsNummer);
                        var eintrag = klasse[eintragsNummer];
                        console.log(eintrag["Art"]);
                        updateKasten(klassenName, eintrag["Raum"], eintrag["Fach"],
                            eintrag["Stunde"], eintrag["Hinweis"],
                            eintrag["Art"]);
                    }
                }

            }
        }
    }
    console.log(json);
}

function updateInfo(informationen) {

}

function updateKasten(klasse, raum, fach, stunde, hinweis, art) {

}

updateVertretungsplan();
