// URL til JSON-filen min (Oppgave 1)
const artistURL = "./artist.json";


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

const utvalgtArtist = document.getElementById("utvalgtArtist");
const byttArtist = document.getElementById("byttArtist");

const feilMelding = document.getElementById("feilMelding");
const feilTekst = document.getElementById("feilTekst");


// Alle artistene. Fylles inn når vi har lest filen.
let alleArtister = [];


// Hvilken artist vi viser i "Utvalgt artist"
let valgtIndex = 0;


// -------------------------
// VIS ÉN ARTIST
// -------------------------

function visEnArtist(index) {

    const artist = alleArtister[index];

    // songs er en liste inne i artisten
    const sangliste = artist.music.songs
        .map(sang => `<li>${sang}</li>`)
        .join("");

    utvalgtArtist.innerHTML = `
        <div class="utvalgt-header">
            <div class="artist-icon">🎤</div>
            <div>
                <h2>${artist.name}</h2>
                <p class="tekst">${artist.genre} fra ${artist.country}</p>
            </div>
        </div>

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
            <strong>${artist.music.popularSong}</strong>
        </div>

        <div class="sanger">
            <h3>Andre sanger (${artist.music.songs.length})</h3>
            <ul>${sangliste}</ul>
        </div>
    `;
}


// -------------------------
// FEILHÅNDTERING
// -------------------------

function visFeilmelding() {
    feilMelding.hidden = false;
}


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
// BYTT UTVALGT ARTIST
// -------------------------

byttArtist.addEventListener("click", () => {

    valgtIndex = Math.floor(
        Math.random() * alleArtister.length
    );

    visEnArtist(valgtIndex);

});


// -------------------------
// LESER JSON-FILEN
// -------------------------

async function hentArtister() {

    try {

        const svar = await fetch(artistURL);

        if (!svar.ok) {
            throw new Error(
                `Serveren svarte med ${svar.status}`
            );
        }

        const data = await svar.json();

        alleArtister = data.artists;

        console.log("Antall artister lest:", alleArtister.length);
        console.log("Første artist:", alleArtister[0]);


        // Nå kan vi bygge siden
        lagStatistikk();
        lagSjangerFilter();
        visArtister(alleArtister);
        visEnArtist(0);

    } catch (feil) {

        console.error("Klarte ikke å hente artist.json:", feil);

        feilTekst.textContent = feil.message;
        visFeilmelding();

    }

}


// -------------------------
// START
// -------------------------

hentArtister();