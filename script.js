import data from "./artist.json" with { type: "json" };


// Henter elementene fra HTML
const artister = document.getElementById("artister");
const sok = document.getElementById("sok");
const sjangerFilter = document.getElementById("sjangerFilter");
const resultatTekst = document.getElementById("resultatTekst");

const antallArtister = document.getElementById("antallArtister");
const antallAlbum = document.getElementById("antallAlbum");
const antallLand = document.getElementById("antallLand");
const antallSjangre = document.getElementById("antallSjangre");

const temaKnapp = document.getElementById("temaKnapp");


// Lagrer alle artistene
const alleArtister = data.artists;


// -------------------------
// STATISTIKK
// -------------------------

function lagStatistikk() {

    const land = new Set(
        alleArtister.map(artist => artist.country)
    );

    const sjangre = new Set(
        alleArtister.map(artist => artist.genre)
    );

    const album = alleArtister.reduce(
        (sum, artist) => sum + artist.music.albums,
        0
    );


    antallArtister.textContent = alleArtister.length;

    antallAlbum.textContent = album;

    antallLand.textContent = land.size;

    antallSjangre.textContent = sjangre.size;
}


// -------------------------
// SJANGER-FILTER
// -------------------------

function lagSjangerFilter() {

    const sjangre = [
        ...new Set(
            alleArtister.map(artist => artist.genre)
        )
    ];

    sjangre.forEach(sjanger => {

        const option = document.createElement("option");

        option.value = sjanger;

        option.textContent = sjanger;

        sjangerFilter.appendChild(option);

    });
}


// -------------------------
// VIS ARTISTER
// -------------------------

function visArtister(liste) {

    artister.innerHTML = "";


    resultatTekst.textContent =
        `${liste.length} artist${liste.length !== 1 ? "er" : ""}`;


    if (liste.length === 0) {

        artister.innerHTML = `
            <div class="no-results">

                <h2>😕 Ingen artister funnet</h2>

                <p>
                    Prøv et annet søkeord eller velg en annen sjanger.
                </p>

            </div>
        `;

        return;
    }


    liste.forEach(artist => {

        const kort = document.createElement("article");

        kort.className = "artist-card";


        kort.innerHTML = `

            <div class="artist-icon">
                🎤
            </div>

            <h2>${artist.name}</h2>


            <div class="artist-info">

                <div>
                    <span>Sjanger</span>
                    <strong>${artist.genre}</strong>
                </div>

                <div>
                    <span>Land</span>
                    <strong>${artist.country}</strong>
                </div>

                <div>
                    <span>Født</span>
                    <strong>${artist.details.birthYear}</strong>
                </div>

                <div>
                    <span>Aktiv siden</span>
                    <strong>${artist.details.activeSince}</strong>
                </div>

                <div>
                    <span>Album</span>
                    <strong>${artist.music.albums}</strong>
                </div>

            </div>


            <div class="song">

                🎵 Populær sang

                <strong>
                    ${artist.music.popularSong}
                </strong>

            </div>
        `;


        artister.appendChild(kort);

    });
}


// -------------------------
// FILTRERING
// -------------------------

function filtrerArtister() {

    const soketekst =
        sok.value.toLowerCase().trim();

    const valgtSjanger =
        sjangerFilter.value;


    const filtrerte = alleArtister.filter(artist => {

        const passerSok =
            artist.name
                .toLowerCase()
                .includes(soketekst);


        const passerSjanger =
            valgtSjanger === "alle" ||
            artist.genre === valgtSjanger;


        return passerSok && passerSjanger;

    });


    visArtister(filtrerte);
}


// -------------------------
// SØK
// -------------------------

sok.addEventListener("input", filtrerArtister);


// -------------------------
// SJANGER
// -------------------------

sjangerFilter.addEventListener(
    "change",
    filtrerArtister
);


// -------------------------
// MØRK MODUS
// -------------------------

temaKnapp.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        temaKnapp.textContent = "☀️ Lys modus";

    } else {

        temaKnapp.textContent = "🌙 Mørk modus";

    }

});


// -------------------------
// START
// -------------------------

lagStatistikk();

lagSjangerFilter();

visArtister(alleArtister);