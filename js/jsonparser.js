var urlIndexhtml = 'index.html';
var urlPlanhtml = 'plan.html';

var json;

//http://stackoverflow.com/a/22790025
function updateVertretungsplan() {
  var httpreq = new XMLHttpRequest();

  httpreq.open('GET', getApiUrl() + getUrlArguments(), true);

  httpreq.onload = function(e) {
    if (httpRequestReady(httpreq)) {
      try {
        var responseJSON = JSON.parse(httpreq.responseText);
        console.log(responseJSON);

        if (isPasswordWrong(responseJSON)) {
          hideById('plan');

          redirect(urlIndexhtml + '?wrongpw=true', 0);
        }

        if (noPlanOnline(responseJSON)) {
          showById('kein-plan');
        } else {
          hideById('wrong-pswd');
          //plan has to be set visible before calling updatePlan() because
          //calculating the correct offset for the plan wouldn't work otherwise
          showById('plan');
          json = responseJSON;
          updatePlan(responseJSON);
          finishedParsing();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error(httpreq.statusText);
    }
  };
  httpreq.onerror = function(e) {
    console.error(httpreq.statusText);
  };
  httpreq.send(null);
  return httpreq.responseText;
}

function httpRequestReady(httpreq) {
  //check if request completed and if request was successful
  if (httpreq.readyState === 4 && httpreq.status === 200) {
    return true;
  }
  return false;
}

function getApiUrl() {
  return 'http://fbi.gruener-campus-malchow.de/cis/pupilplanapi.php';
}

function getUrlArguments() {
  var cert = parameters['cert'];
  var dev = parameters['dev'];
  var klasse = parameters['klasse'];
  var user = parameters['user'];

  var args = '?cert=' + cert;
  if (dev) {
    args += '&dev=' + dev;
  }
  if (klasse) {
    args += '&klasse=' + klasse;
  }
  if (user) {
    args += '&user=' + user;
  }

  return args;
}

function finishedParsing() {
  if (parameters['user'] === 'foyer') {
    startScrolling();
  } else {
    allClassNames = sortClassNames(allClassNames);
    addClassNamesToDropdown(allClassNames);
  }

  updatePlanPaddingTop();
}

function isPasswordWrong(json) {
  return json === false;
}

function noPlanOnline(json) {
  return json[0] === 'false';
}

function redirect(url, delay) {
  setTimeout(
    function() {
      window.location.replace(url);
    },
    delay
  );
}

function updatePlan(plan) {
  setInfoText(getInfoText());
  updatePlanPaddingTop(); //style.js
  updateClasses(plan);
}

function updateClasses(plan) {
  var noClass = ['Informationen', 'Tag', 'Time'];

  for (var i = 0; i < plan.length; i++) {
    var day = plan[i];

    updateBoxDate(day['Tag']);

    for (var className in day) {
      if (day.hasOwnProperty(className)) {
        if (noClass.indexOf(className) === -1) {
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
  entryNumbers.sort(function(s1, s2) {
    return parseInt(s1) - parseInt(s2);
  });
  // addiere Eintraege auf
  var entries = [];
  var lastEntry;
  for (var i = 0; i < entryNumbers.length; i += 1) {
    var entryNumber = entryNumbers[i];
    var entry = schoolClass[entryNumber];
    if (isNewEntry(entry)) {
      lastEntry = { Raum: '', Fach: '', Hinweis: '', Art: '', Stunde: '' };
      entries.push(lastEntry);
    }
    lastEntry['Raum'] += entry['Raum'] + ' ';
    lastEntry['Fach'] += entry['Fach'] + ' ';
    lastEntry['Hinweis'] += entry['Hinweis'] + ' ';
    lastEntry['Art'] += entry['Art'] + ' ';
    lastEntry['Stunde'] += entry['Stunde'] + ' ';
  }
  // update mit addierten Eintraegen
  for (var i = 0; i < entries.length; i += 1) {
    var entry = entries[i];
    updateBox(
      className,
      entry['Raum'],
      entry['Fach'],
      entry['Stunde'],
      entry['Hinweis'],
      entry['Art']
    );
  }
}

var allSpace = new RegExp('^\\s*$');
function isAllSpace(string) {
  return allSpace.exec(string) != null;
}
function isNewEntry(eintrag) {
  return !isAllSpace(eintrag['Art']);
}

//https://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
function removeLineBreaks(string) {
  return string.replace(/\r?\n|\r/g, '');
}

function getInfoText() {
  var text = '';

  for (var i = 0; i < json.length; i++) {
    var day = json[i];
    var date = day['Tag'];
    var informations = day['Informationen'];

    if (informations !== undefined && informations !== '') {
      if (i > 0) {
        text += '\n';
      }
      text += date + '\n';

      for (var j = 0; j < informations.length; j++) {
        var info = day['Informationen'][j];
        info = removeLineBreaks(info);
        text += info;

        if (j < informations.length - 1) {
          text += ', ';
        }
      }
    }

  }

  return text;
}

updateVertretungsplan();
