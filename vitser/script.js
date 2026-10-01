// -------------------------
// FILENE VI HAR Å VELGE MELLOM
// -------------------------

// Lokale filer ligger i mappen sammen med index.html
const filer = {
    jokes: {
        navn: "jokes.json",
        url: "./jokes.json",
        type: "Avansert – objekt med liste"
    },
    justJokes: {
        navn: "justJokes.json",
        url: "./justJokes.json",
        type: "Enkel – bare nøkler og tekster"
    }
};


// Hvilken fil er valgt nå
let valgtFil = "jokes";


// Her lagrer vi alle vitsene
let vitser = [];


// Hvilken vits vi ser i "én vits om gangen"
let vitsIndex = 0;


// -------------------------
// HENTER ELEMENTENE FRA HTML
// -------------------------

const forsteVits =
    document.getElementById("forsteVits");

const sisteVits =
    document.getElementById("sisteVits");

const alleVitser =
    document.getElementById("alleVitser");

const antallViser =
    document.getElementById("antallViser");

const tilfeldigVits =
    document.getElementById("tilfeldigVits");

const tilfeldigKnapp =
    document.getElementById("tilfeldigKnapp");

const vitsValg =
    document.getElementById("vitsValg");

const forrige = document.getElementById("forrige");
const neste = document.getElementById("neste");
const tilfeldigValg =
    document.getElementById("tilfeldigValg");

const sok = document.getElementById("sok");
const antall = document.getElementById("antall");
const valgtFilTekst = document.getElementById("valgtFil");

const feilMelding = document.getElementById("feilMelding");
const feilTekst = document.getElementById("feilTekst");


// Henter JSON-filen

async function hentVitser() {

    const response = await fetch(jokesURL);

    const data = await response.json();

    // Lagrer vitse-listen

    vitser = data.jokes;


    // Teller antall vitser

    antall.textContent = vitser.length;


    // Viser første vits

    forsteVits.textContent =
        vitser[0].joke;


    // Viser alle vitsene

    visAlleVitser(vitser);
}


// Funksjon som viser alle vitser

function visAlleVitser(liste) {

    alleVitser.innerHTML = "";


    if (liste.length === 0) {

        alleVitser.innerHTML =
            "<p>😕 Fant ingen vitser.</p>";

        return;
    }


    liste.forEach(vits => {

        const div =
            document.createElement("div");

        div.className = "vits";


        div.innerHTML = `
            <strong>Vits ${vits.id}</strong>
            <p>${vits.joke}</p>
        `;


        alleVitser.appendChild(div);

    });
}


// Tilfeldig vits

tilfeldigKnapp.addEventListener(
    "click",
    () => {

        const tilfeldigTall =
            Math.floor(
                Math.random() * vitser.length
            );


        tilfeldigVits.textContent =
            vitser[tilfeldigTall].joke;

    }
);


// Søk etter ord

sok.addEventListener(
    "input",
    () => {

        const søkeord =
            sok.value.toLowerCase().trim();


        const resultat =
            vitser.filter(vits =>
                vits.joke
                    .toLowerCase()
                    .includes(søkeord)
            );


        visAlleVitser(resultat);

    }
);


// Start programmet

hentVitser();