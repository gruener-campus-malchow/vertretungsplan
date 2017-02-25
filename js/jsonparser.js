var urlIndexhtml = "index.html";
var urlPlanhtml = "plan.html";

var parameters = {};
var infos = {};

/**
  reads parameters in URL and adds them to the parameters map
*/
function setParametersFromURL() {
  var params = document.location.search.split("&");
  params[0] = params[0].replace("?", "");

  for (var i = 0; i < params.length; i++) {
    var param = params[i];
    parameters[param.substring(0, param.indexOf("="))] = param.substring(param.indexOf("=")+1, param.length);
  }
}

function updateVertretungsplan() { //http://stackoverflow.com/a/22790025
    /*json = {"Tag":"20.1.2017 Freitag","Time":"2017-01-20","Informationen":["Das sind Test-Informationen."],"7b":{"1":{"Stunde":"1 - 2","Fach":"DEU","Raum":"3.309","LehrerIn":"___(statt ___)","Hinweis":"\u00a0","Art":"Vertretung"},"2":{"Stunde":"3 - 4","Fach":"MA","Raum":"3.214","LehrerIn":"___","Hinweis":"\u00a0","Art":"Vertretung"},"3":{"Stunde":"5","Fach":"EN","Raum":"3.202","LehrerIn":"___","Hinweis":"\u00a0","Art":"Ausfall"}},"7a":{"1":{"Stunde":"1 - 2","Fach":"DEU","Raum":"3.309","LehrerIn":"___(statt ___)","Hinweis":"\u00a0","Art":"Vertretung"},"2":{"Stunde":"3 - 4","Fach":"MA","Raum":"3.214","LehrerIn":"___","Hinweis":"\u00a0","Art":"Vertretung"},"3":{"Stunde":"5","Fach":"EN","Raum":"3.202","LehrerIn":"___","Hinweis":"\u00a0","Art":"Ausfall"}},"9a":{"1":{"Stunde":"1 - 2","Fach":"DEU","Raum":"3.309","LehrerIn":"___(statt ___)","Hinweis":"\u00a0","Art":"Vertretung"},"2":{"Stunde":"3 - 4","Fach":"MA","Raum":"3.214","LehrerIn":"___","Hinweis":"\u00a0","Art":"Vertretung"},"3":{"Stunde":"5","Fach":"EN","Raum":"3.202","LehrerIn":"___","Hinweis":"\u00a0","Art":"Ausfall"}}};
    updatePlan(json);
    document.getElementById('plan').style.display='inline';
    document.getElementById('wrong-pswd').style.display='none';*/

    var httpreq = new XMLHttpRequest();

    httpreq.open("GET", getApiUrl(), true);

    httpreq.onload = function(e) {
        if (httpreq.readyState === 4) {
            if (httpreq.status === 200) {
              try {
                var responseJSON = JSON.parse(httpreq.responseText);
                console.log(responseJSON);

                if(noPlanOnline(responseJSON)) {
                  showById('kein-plan');
                } else {
                  hideById('wrong-pswd');
                  //plan has to be set visible before calling updatePlan() because
                  //calculating the correct offset for the plan wouldn't work otherwise
                  showById('plan');
                  updatePlan(responseJSON);
                  finishedParsing();
                }
              } catch(err) {//wrong password
                hideById('plan');
                showById('wrong-pswd');

                redirect(urlIndexhtml, 2000);
              }
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

function getApiUrl() {
  return "http://fbi.gruener-campus-malchow.de/cis/pupilplanapi.php" + getUrlArguments();
}

function getUrlArguments() {
  var cert = parameters["cert"];
  var dev = parameters["dev"];
  var klasse = parameters["klasse"];
  var user = parameters["user"];

  var arguments = "?cert=" + cert;
  if(dev) {
    arguments+="&dev=" + dev;
  }
  if(klasse) {
    arguments+="&klasse=" + klasse;
  }
  if(user) {
    arguments+="&user=" + user;
  }

  return arguments;
}

function finishedParsing() {
  if(parameters['user'] === 'foyer') {
    startScrolling();
  } else {
    addClassNamesToDropdown();
  }
}

function noPlanOnline(json) {
  return json[0] === "false";
}

function redirect(url, delay) {
  setTimeout(function() {window.location.replace(url);}, delay);
}

function updatePlan(plan) {
    updateInfo(plan);
    updatePlanPaddingTop();  //style.js
    updateClasses(plan);
}

function updateClasses(plan) {
    var noClass = ['Informationen', 'Tag', 'Time'];

    for (var i = 0; i < plan.length; i++) {
      var day = plan[i];

      updateBoxDate(day['Tag']);

      for (var className in day) {
          if (day.hasOwnProperty(className)) {
              if (!noClass.includes(className)) {
				  var schoolClass = day[className];
				  updateClass(className, schoolClass);
              }
          }
      }

    }
}

function updateClass(className, schoolClass) {
    var entryNumbers = [];
    for (var entryNumber in schoolClass) {
        if (schoolClass.hasOwnProperty(entryNumber)) {
            entryNumbers.push(entryNumber);
        }
    }
    // eintragsNummern wie Zahlen sortieren, obwohl sie Strings sind
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    entryNumbers.sort(function (s1, s2) { return parseInt(s1) - parseInt(s2); })
    // addiere Eintraege auf
    var entries = [];
    var lastEntry;
    for (var i = 0; i < entryNumbers.length; i += 1) {
        var entryNumber = entryNumbers[i];
        var entry = schoolClass[entryNumber];
        if (isNewEntry(entry)) {
            lastEntry = {"Raum":"", "Fach":"", "Hinweis":"", "Art":"", "Stunde":""};
            entries.push(lastEntry);
        }
        lastEntry["Raum"] += entry["Raum"] + " ";
        lastEntry["Fach"] += entry["Fach"] + " ";
        lastEntry["Hinweis"] += entry["Hinweis"] + " ";
        lastEntry["Art"] += entry["Art"] + " ";
        lastEntry["Stunde"] += entry["Stunde"] + " ";
    }
    // update mit addierten Eintraegen
    for (var i = 0; i < entries.length; i += 1) {
        var entry = entries[i];
        updateBox(className,
             entry["Raum"],
             entry["Fach"],
             entry["Stunde"],
             entry["Hinweis"],
             entry["Art"]);
    }
}

var allSpace = new RegExp("^\\s*$");
function isAllSpace(string) {
    return allSpace.exec(string) != null;
}
function isNewEntry(eintrag) {
    return !isAllSpace(eintrag["Art"]);
}

function updateInfo(plan) {
  for (var i = 0; i < plan.length; i++) {
    var day = plan[i];
    var informations = day['Informationen'];
    var text = '';
    if (informations!==undefined&&informations!=='') {

      for (var j = 0; j < informations.length; j++) {
        var info = day['Informationen'][j];
        text += info;

        if(j < informations.length-1) {
          text+='\n';
        }
      }

    } else {
      hideInfoText();
    }

    infos[day['Tag']]=text;
  }

  setInfoText(infos[plan[0]['Tag']]); //information of first day
}

setParametersFromURL();
updateVertretungsplan();
