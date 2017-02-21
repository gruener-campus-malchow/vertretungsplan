var dateBoxes = [];

var boxContainer = document.getElementById("kasten-container");
var lastClass = '';

function updateBox(klasse, raum, fach, stunde, hinweis, art) {
    if(!classShouldBeShown(klasse)) {
      return;
    }

    checkIfNewClass(klasse);

    var box = '<div class="kasten';
          if (art.startsWith('Ausfall')) {
            box+=' ausfall';
          }
        box+='">                    \
            <div class="top">                                                           \
                <div class="kasten-fach">                                        \
                    '+ fach +'                  \
                </div>                                                           \
                <div class="kasten-raum">                                        \
                    ' + raum + '                \
                </div>                                                           \
                <div class="kasten-stunde">                                      \
                    ' + stunde + '             \
                </div>                                                \
            </div>                                                          \
                                                          \
            <div class="bottom">                          \
              <div class="kasten-hinweis">                                     \
                  ' + art + '           \
              </div>                                                           \
            </div>                                         \
        </div>                                                               \
        ';

    boxContainer.innerHTML += box;
}

function updateBoxClass(schoolClass) {
  var box = '\
    <div class="kasten klasse">\
      <p>'+schoolClass+'</p>\
    </div>\
  ';

  boxContainer.appendChild(createElement(box));
}

function updateBoxDate(date) {
  var box = '\
    <div class="kasten date">\
      <p>'+date+'</p>\
    </div>\
  ';

  var element = createElement(box);
  boxContainer.appendChild(element);
  dateBoxes.push(element);
}

function createElement(html) {
  var e = document.createElement('span');
  e.innerHTML = html;
  return e;
}

function classShouldBeShown(schoolClass) {
  return (parameters["klasse"]==undefined || parameters["klasse"]=='' || parameters["klasse"]===schoolClass);
}

function checkIfNewClass(schoolClass) {
  if(schoolClass != lastClass) {
    updateBoxClass(schoolClass);
  }

  lastClass = schoolClass;
}

//updateKasten("11a", "2.209", "BIO", "5", "Ausfall", "Ausfall");
