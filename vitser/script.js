// -------------------------
// FILENE VI KAN VELGE MELLOM
// -------------------------

// Jeg har begge filene lokalt i mappen.
// Først prøver jeg å lese den lokalt.
// Hvis det ikke virker (for eksempel når
// nettsiden åpnes direkte fra fil), henter
// jeg fra internett i stedet.

const filer = {
    jokes: {
        navn: "jokes.json",
        lokal: "./jokes.json",
        fjern:
            "https://terjetheteacher.github.io/some-jokes/jokes.json",
        type: "Avansert – objekt med liste"
    },
    justJokes: {
        navn: "justJokes.json",
        lokal: "./justJokes.json",
        fjern:
            "https://terjetheteacher.github.io/some-jokes/justJokes.json",
        type: "Enkel – bare nøkler og tekster"
    }
};


// Hvilken fil brukeren har valgt
let valgtFil = "jokes";


// Her lagrer vi alle vitsene
let vitser = [];


// Hvilken vits vi ser i "én vits om gangen"
let vitsIndex = 0;


// -------------------------
// HENTER ELEMENTER FRA HTML
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

const valgtFilTekst =
    document.getElementById("valgtFil");

const filValg =
    document.querySelectorAll('input[name="fil"]');

const feilMelding =
    document.getElementById("feilMelding");

const feilTekst =
    document.getElementById("feilTekst");


// -------------------------
// GJØR OM TIL SAMME FORMAT
// -------------------------
//
// De to filene er bygget opp på ulike måter.
// Denne funksjonen gjør dem om til det SAMME,
// slik at resten av koden bare trenger å jobbe
// med én type vits: { id, joke }

function gjørOmTilVitser(data, type) {

    // jokes.json: data.jokes er en liste med objekter
    if (type === "jokes") {

        return data.jokes.map(vits => ({
            id: vits.id,
            joke: vits.joke
        }));

    }


    // justJokes.json: toppnivå er et objekt,
    // så Object.values() gir oss en liste
    return Object.values(data).map((tekst, index) => ({
        id: String(index + 1),
        joke: tekst
    }));

}


// -------------------------
// HENTER ÉN JSON-FIL
// -------------------------

async function hentJson(url) {

    const svar = await fetch(url);

    if (!svar.ok) {
        throw new Error(
            `${url} svarte med feilmelding ${svar.status}`
        );
    }

    return svar.json();

}


// -------------------------
// HENTER VITSENE
// -------------------------

async function hentVitser() {

    const fil = filer[valgtFil];

    let data;
    let kilde;

    try {

        alleVitser.textContent = "Laster vitser...";

        // 1. Prøv den lokale filen først
        try {
            data = await hentJson(fil.lokal);
            kilde = "lokalt";
        } catch (lokalFeil) {

            // 2. Hvis det ikke virker,
            //    hent fra internett i stedet
            data = await hentJson(fil.fjern);
            kilde = "internett";

        }

        vitser = gjørOmTilVitser(data, valgtFil);
        vitsIndex = 0;

        // Nå vet vi at det gikk bra
        feilMelding.hidden = true;

        valgtFilTekst.textContent =
            `Leste fra ${fil.navn} (${kilde}) – ${fil.type}`;

        oppdaterAlt();

        console.log(`Vitser lest fra ${fil.navn} (${kilde}):`);
        console.log("Antall vitser:", vitser.length);
        console.log("Første vits:", vitser[0]);
        console.log("Siste vits:", vitser[vitser.length - 1]);

    } catch (feil) {

        console.error("Klarte ikke å hente vitser:", feil);

        vitser = [];
        vitsIndex = 0;

        feilTekst.textContent = feil.message;
        feilMelding.hidden = false;

        oppdaterAlt();

    }

}


// -------------------------
// OPPDATERER HELE SIDEN
// -------------------------

function oppdaterAlt() {
    visForsStats();
    visEnVits();
    visAlleVitser(vitser);
}


// -------------------------
// FØRSTE, SISTE OG ANTALL
// -------------------------

function visForsStats() {

    antall.textContent = vitser.length;

    if (vitser.length === 0) {
        forsteVits.textContent = "–";
        sisteVits.textContent = "–";
        return;
    }

    forsteVits.textContent = vitser[0].joke;

    sisteVits.textContent =
        vitser[vitser.length - 1].joke;

}


// -------------------------
// ÉN VITS OM GANGEN
// -------------------------

function visEnVits() {

    if (vitser.length === 0) {
        vitsValg.textContent = "Ingen vitser å vise.";
        return;
    }


    // Holder index innenfor listen,
    // og starter på nytt når vi kommer forbi
    if (vitsIndex < 0) {
        vitsIndex = vitser.length - 1;
    }

    if (vitsIndex > vitser.length - 1) {
        vitsIndex = 0;
    }

    vitsValg.textContent = vitser[vitsIndex].joke;

}


// -------------------------
// VISER ALLE VITSENE
// -------------------------

function visAlleVitser(liste) {

    alleVitser.innerHTML = "";

    antallViser.textContent =
        `${liste.length} av ${vitser.length} vitser`;

    if (liste.length === 0) {

        alleVitser.innerHTML =
            "<p class='tom'>😕 Fant ingen vitser.</p>";

        return;

    }

    liste.forEach(vits => {

        const div = document.createElement("div");

        div.className = "vits";

        div.innerHTML = `
            <strong>Vits ${vits.id}</strong>
            <p>${vits.joke}</p>
        `;

        alleVitser.appendChild(div);

    });

}


// -------------------------
// TILFELDIG VITS
// -------------------------

function visTilfeldigVits() {

    if (vitser.length === 0) {
        tilfeldigVits.textContent =
            "Fant ingen vitser å vise.";
        return;
    }

    const tilfeldigTall =
        Math.floor(Math.random() * vitser.length);

    tilfeldigVits.textContent =
        vitser[tilfeldigTall].joke;

}

tilfeldigKnapp.addEventListener(
    "click",
    visTilfeldigVits
);


// -------------------------
// BLA GJENNOM VITSENE
// -------------------------

forrige.addEventListener("click", () => {
    vitsIndex = vitsIndex - 1;
    visEnVits();
});

neste.addEventListener("click", () => {
    vitsIndex = vitsIndex + 1;
    visEnVits();
});

tilfeldigValg.addEventListener("click", () => {

    if (vitser.length === 0) {
        visEnVits();
        return;
    }

    vitsIndex =
        Math.floor(Math.random() * vitser.length);

    visEnVits();

});


// -------------------------
// MENY: BYTTE FIL
// -------------------------

filValg.forEach(knapp => {

    knapp.addEventListener("change", event => {

        valgtFil = event.target.value;

        sok.value = "";

        hentVitser();

    });

});


// -------------------------
// SØK ETTER ORD
// -------------------------

sok.addEventListener("input", () => {

    const søkeord =
        sok.value.toLowerCase().trim();

    const resultat =
        vitser.filter(vits =>
            vits.joke
                .toLowerCase()
                .includes(søkeord)
        );

    visAlleVitser(resultat);

});


// -------------------------
// START
// -------------------------

hentVitser();
