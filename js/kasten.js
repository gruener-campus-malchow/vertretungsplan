function updateKasten(klasse, raum, fach, stunde, hinweis, art) {
    var kasten = '                                                           \
        <div class="kasten">                    \
            <div>                                                           \
                <div class="kasten-fach">                                        \
                    <p class="kasten-fach-text">' + fach + '</p>                 \
                </div>                                                           \
                <div class="kasten-stunde">                                      \
                    <p class="kasten-stunde-text">' + stunde + '</p>             \
                </div>                                                \
            </div>                                                          \
            <div class="kasten-raum">                                        \
                <p class="kasten-raum-text">' + raum + '</p>                 \
            </div>                                                           \
            <div class="kasten-hinweis">                                     \
                <p class="kasten-hinweis-text">' + hinweis + '</p>           \
            </div>                                                           \
        </div>                                                               \
        ';

    var kastenContainer = document.getElementById("kasten-container");

    kastenContainer.innerHTML += kasten;
}

updateKasten("11a", "2.209", "BIO", "5", "Ausfall", "Ausfall");