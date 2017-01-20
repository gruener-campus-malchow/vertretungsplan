var kastenContainer = document.getElementById("kasten-container");
var letzteKlasse = '';

function updateKasten(klasse, raum, fach, stunde, hinweis, art) {
    pruefeObNeueKlasse(klasse);

    var kasten = '<div class="kasten';
          if (art==='Ausfall') {
            kasten+=' ausfall';
          }
        kasten+='">                    \
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

    kastenContainer.innerHTML += kasten;

    console.log(klasse + " " + raum + " " + fach + " " + stunde + " " + hinweis + " " + art);
}

function updateKastenKlasse(klasse) {
  var kasten = '\
    <div class="kasten klasse">\
      <p>'+klasse+'</p>\
    </div>\
  ';

  kastenContainer.innerHTML+=kasten;
}

function pruefeObNeueKlasse(klasse) {
  if(klasse != letzteKlasse) {
    updateKastenKlasse(klasse);
  }

  letzteKlasse = klasse;
}

//updateKasten("11a", "2.209", "BIO", "5", "Ausfall", "Ausfall");
