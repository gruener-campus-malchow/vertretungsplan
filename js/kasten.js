function updateKasten(klasse, raum, fach, stunde, hinweis, art) {
    var kasten = '                                                           \
        <div class="kasten">                    \
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
                  ' + hinweis + '           \
              </div>                                                           \
            </div>                                         \
        </div>                                                               \
        ';

    var kastenContainer = document.getElementById("kasten-container");

    kastenContainer.innerHTML += kasten;

    console.log(klasse + " " + raum + " " + fach + " " + stunde + " " + hinweis + " " + art);
}

updateKasten("11a", "2.209", "BIO", "5", "Ausfall", "Ausfall");
