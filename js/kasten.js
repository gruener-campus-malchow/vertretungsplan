var lastClass = '';
var allClassNames = [];
var lastGrade = '';

function getBoxContainer() {
  return document.getElementById('kasten-container');
}

function getInfoContainer() {
  return document.getElementById('info-container');
}

function updateBox(klasse, raum, fach, stunde, hinweis, art, date) {
  if (isStundeInPast(date, stunde)) {
    return;
  }

  if (allClassNames.indexOf(klasse) === -1) {
    allClassNames.push(klasse);
  }

  if (!classShouldBeShown(klasse)) {
    return;
  }

  checkIfNewClass(klasse);

  var box = createBox();

    var top = createDivWithClass('top');
    top.classList.add(findBorderColorCssClassByGrade(klasse));

      var kastenFach = createDivWithClass('kasten-fach');
      kastenFach.innerText = fach;
      top.appendChild(kastenFach);

      var kastenRaum = createDivWithClass('kasten-raum');
      if (raum.indexOf('---') === -1) {
        kastenRaum.innerText = raum;
      }
      top.appendChild(kastenRaum);  //still appended if no raum for little margin

      var kastenStunde = createDivWithClass('kasten-stunde');
      kastenStunde.innerText = stunde;
      top.appendChild(kastenStunde);

    box.appendChild(top);

    if (hinweis.length > 2) {
      var middle = createDivWithClass('middle');
      middle.innerText = hinweis;
      box.appendChild(middle);
    }

    var bottom = createDivWithClass('bottom');

      var kastenArt = createDivWithClass('kasten-art');
      if (art.indexOf('Ausfall') !== -1) {
        kastenArt.classList.add('ausfall');
      } else if (art.indexOf('Vertretung') !== -1) {
        kastenArt.classList.add('vertretung');
      }
      kastenArt.innerText = art;
      bottom.appendChild(kastenArt);

    box.appendChild(bottom);

  getBoxContainer().appendChild(box);
}

function createDivWithClass(className) {
  var div = document.createElement('div');
  div.classList.add(className);
  return div;
}

function updateBoxClass(schoolClass) {
  var box = createBox();
  box.classList.add('klasse');
  box.classList.add(findBgColorCssClassByGrade(schoolClass));

  var p = document.createElement('p');
  p.innerText = schoolClass;
  box.appendChild(p);

  if (isNewGrade(schoolClass)) {
    getBoxContainer().appendChild(document.createElement('br'));
  }

  lastGrade = getGradeOfClass(schoolClass);

  getBoxContainer().appendChild(box);
}

function isNewGrade(schoolClass) {
  var grade = getGradeOfClass(schoolClass);
  if (lastGrade !== '' && lastGrade !== grade) {
    return true;
  }

  return false;
}

function getGradeOfClass(schoolClass) {
  if (schoolClass.length === 2) {
    return schoolClass.substring(0, 1);
  } else {
    return schoolClass.substring(0, 2);
  }
}

function updateInfoDateBox(date) {
  getInfoContainer().appendChild(createInfoDateBox(date));
}

function updateInfoBox(info) {
  getInfoContainer().appendChild(createInfoBox(info));
}

function createInfoBox(text) {
  var box = document.createElement('div');
  box.classList.add('info-kasten');

  addTextWithBRs(box, text);

  return box;
}

function createInfoDateBox(date) {
  var box = createInfoBox(date);
  box.classList.add('info-date');
  return box;
}

function findBorderColorCssClassByGrade(schoolClass) {
  return findBgColorCssClassByGrade(schoolClass) + '-border';
}

function findBgColorCssClassByGrade(schoolClass) {
  var grade = getGradeOfClass(schoolClass);

  switch (grade) {
    case '7':  return 'grade-seven';
    case '8':  return 'grade-eight';
    case '9':  return 'grade-nine';
    case '10': return 'grade-ten';
    case '11': return 'grade-eleven';
    case '12': return 'grade-twelve';
    case '13': return 'grade-thirteen';
  }

  return 'no-grade';
}

var dateCounter = 0;
function updateBoxDate(date) {
  var box = createBox();
  box.classList.add('date');

  var p = document.createElement('p');
  p.innerText = date;
  box.appendChild(p);

  if (dateCounter > 0) {
    getBoxContainer().appendChild(document.createElement('br'));
  }
  getBoxContainer().appendChild(box);

  dateCounter++;
}

function createBox() {
  var box = document.createElement('div');
  box.classList.add('kasten');
  return box;
}

function classShouldBeShown(schoolClass) {
  var klasseShouldBeShown = parameters['klasse'] == undefined ||
    parameters['klasse'] == '' ||
    parameters['klasse'] === schoolClass;

  var klassenstufeShouldBeShown = parameters['klassenstufe'] == undefined ||
    parameters['klassenstufe'] == '' ||
    schoolClass.includes(parameters['klassenstufe']);

  return (klasseShouldBeShown && klassenstufeShouldBeShown);
}

function checkIfNewClass(schoolClass) {
  if (schoolClass != lastClass) {
    updateBoxClass(schoolClass);
  }

  lastClass = schoolClass;
}
//updateKasten("11a", "2.209", "BIO", "5", "Ausfall", "Ausfall");

function isStundeInPast(date, stunde) {
  if (date !== getCurrentDate()) {
    return false;
  }

  var stunden = stunde.split("-");
  var lastStunde = parseInt(stunden[stunden.length -1]);

  if (getEndTimeInMinutes(lastStunde) < convertTimeToMinutes(getCurrentTime())) {
    return true;
  }

  return false;
}

function getEndTimeInMinutes(stunde) {

}

function getCurrentTime() {

}

function convertTimeToMinutes(time) {
  
}

function getCurrentDate() {//https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  var date = new Date();

  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();

  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }

  return yyyy + "-" + mm + "-" + dd;
}
