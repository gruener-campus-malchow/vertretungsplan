function updateKasten(klasse, raum, fach, stunde, hinweis, art) {
    var kasten = '                                                           \
        <div class="kasten">                    \
            <div>                                                           \
                <div class="kasten-fach">                                        \
                    '+ fach +'                  \
                </div>                                                           \
                <div class="kasten-stunde">                                      \
                    ' + stunde + '             \
                </div>                                                \
            </div>                                                          \
            <div class="kasten-raum">                                        \
                ' + raum + '                \
            </div>                                                           \
            <div class="kasten-hinweis">                                     \
                ' + hinweis + '           \
            </div>                                                           \
        </div>                                                               \
        ';

    var kastenContainer = document.getElementById("kasten-container");

    kastenContainer.innerHTML += kasten;
}

updateKasten("11a", "2.209", "BIO", "5", "Ausfall", "Ausfall");