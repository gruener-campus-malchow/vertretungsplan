var urlIndexhtml = 'index.html';
var urlPlanhtml = 'plan.html';

var urlArguments = ['dev', 'klasse', 'user', 'klassenstufe', 'size', 'banner'];

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
          showById('header');
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
  return 'https://cis.gruener-campus-malchow.de/cis/pupilplanapi.php';
}

function getUrlArguments() {
  var args = '?cert=' + parameters['cert'];

  for (var i = 0; i < urlArguments.length; i++) {
    var arg = urlArguments[i];

    argValue = parameters[arg];
    if (argValue) {
      args += "&" + arg + "=" + argValue;
    }
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

  if (parameters['banner'] === 'true') {
    showById('banner');
  }

  updatePlanPaddingTop();

  setKlassenstufeTextInHeader();  //style.js
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
  adjustFontSize();

  updateInfo(plan);
  updatePlanPaddingTop(); //style.js
  updateClasses(plan);
}

function adjustFontSize() {
  var size = getSizeParameter();
  var maxHeaderSize = 3;

  var kastenContainer = document.querySelector('.kasten-container');
  var header = document.querySelector('.header');

  kastenContainer.style.fontSize = size + 'em';

  var headerSize = size;
  if (headerSize > 3) {
    headerSize = 3;
  }
  header.style.fontSize = headerSize + 'em';
}

function getSizeParameter() {
  var size = parameters['size'];
  if (size === '1' || size === undefined || isNaN(size) || size === '') {
    size = 1;
  } else {
    size = parseFloat(size);

    if (size <= 0) {
      size = 1;
    }
  }

  return size;
}

function updateClasses(plan) {
  var noClass = ['Informationen', 'Tag', 'Time'];

  for (var i = 0; i < plan.length; i++) {
    var day = plan[i];
    var date = day['Time'];

    updateBoxDate(day['Tag']);

    var classNames = [];
    for (var className in day) {
      if (day.hasOwnProperty(className)) {
        if (noClass.indexOf(className) === -1) {
          classNames.push(className);
        }
      }
    }

    classNames = sortClassNames(classNames);
    for (var j = 0; j < classNames.length; j++) {
        var className = classNames[j];
        var schoolClass = day[className];
        updateClass(className, schoolClass, date);
    }

  }
}

function updateClass(className, schoolClass, date) {
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
      entry['Art'],
      date
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

function updateInfo(plan) {
  var text = '';
  var isInfoAlreadyTooLong = false;

  for (var i = 0; i < plan.length; i++) {
    var day = plan[i];
    var date = day['Tag'];
    var informations = day['Informationen'];

    if (informations !== undefined && informations !== '') {
      if (i > 0) {
        text += '\n';
      }
      text += date + '\n';
      updateInfoDateBox(date);

      for (var j = 0; j < informations.length; j++) {
        var info = day['Informationen'][j];
        info = removeLineBreaks(info);
        if (info) {
          text += info;
          updateInfoBox(info);

          if (!isInfoAlreadyTooLong) {
            if (isInfoTooLong(info)) {
              hideById('header-info');
              showById('left-side');

              isInfoAlreadyTooLong = true;
            }
          }

          if (j < informations.length - 1) {
            text += ', ';
          }
        }
      }
    }

  }

  setInfoText(text);
}

function isInfoTooLong(info) {
  if (info.length > 187) { //187 characters fit into one box at the moment
    return true;
  }

  return false;
}

$(document).ready(updateVertretungsplan);
