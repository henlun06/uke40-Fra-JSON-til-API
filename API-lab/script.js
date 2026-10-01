// -------------------------
// API-ENE JEG BRUKER
// -------------------------

const apiVits =
    "https://v2.jokeapi.dev/joke/";

const apiPunchline =
    "https://official-joke-api.appspot.com/random_joke";

const apiHund =
    "https://dog.ceo/api/breeds/image/random";


// -------------------------
// HENTER ELEMENTER FRA HTML
// -------------------------

const hentVits = document.getElementById("hentVits");
const kategori = document.getElementById("kategori");
const antall = document.getElementById("antall");
const resultat = document.getElementById("resultat");

const hentPunchlineKnapp =
    document.getElementById("hentPunchline");

const setup = document.getElementById("setup");
const punchline = document.getElementById("punchline");
const punchlineInfo = document.getElementById("punchlineInfo");

const hentHund = document.getElementById("hentHund");
const hundResultat = document.getElementById("hundResultat");


// -------------------------
// VISER EN FEILMELDING
// -------------------------

function visFeil(beholder, feil) {

    beholder.innerHTML = `
        <div class="feil">
            <strong>⚠️ Det oppstod en feil.</strong>
            <p>${feil.message}</p>
            <p class="liten">
                Sjekk at du har internett, og prøv igjen om litt.
            </p>
        </div>
    `;

    console.error("Feil:", feil);

}


// -------------------------
// VITSER FRA JOKEAPI
// -------------------------

async function hentVitser() {

    const valgtKategori = kategori.value;
    const valgtAntall = antall.value;

    resultat.innerHTML = "<p>Henter data...</p>";

    try {

        const url =
            `${apiVits}${valgtKategori}` +
            `?type=single&amount=${valgtAntall}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `API-et svarte med ${response.status}`
            );
        }

        const data = await response.json();

        // API-et kan si fra hvis noe gikk galt
        if (data.error === true) {
            throw new Error(data.error_description);
        }

        console.log("Svar fra API-et:", data);

        // Bygger opp en knapp per vits
        const kort = data.jokes
            .map(vits => `
                <div class="vits">
                    <strong>${vits.category}</strong>
                    <p>${vits.joke}</p>
                </div>
            `)
            .join("");

        resultat.innerHTML = `
            <h3>${data.amount} vits fra ${valgtKategori}</h3>
            ${kort}
        `;

    } catch (feil) {
        visFeil(resultat, feil);
    }

}


// -------------------------
// VITS MED SETUP OG POENG
// -------------------------

async function hentSetupOgPoeng() {

    setup.textContent = "Henter data...";
    punchline.textContent = "";
    punchlineInfo.textContent = "";

    try {

        const response = await fetch(apiPunchline);

        if (!response.ok) {
            throw new Error(
                `API-et svarte med ${response.status}`
            );
        }

        const data = await response.json();

        console.log("Vits fra API-et:", data);

        setup.textContent = data.setup;

        punchline.textContent = data.punchline;

        punchlineInfo.textContent =
            `Type: ${data.type} · ID: ${data.id}`;

    } catch (feil) {

        setup.textContent = "";
        visFeil(punchlineInfo.parentElement, feil);

    }

}


// -------------------------
// TILFELDIG HUND (ET ANNET API)
// -------------------------

async function hentTilfeldigHund() {

    hundResultat.innerHTML = "<p>Henter data...</p>";

    try {

        const response = await fetch(apiHund);

        if (!response.ok) {
            throw new Error(
                `API-et svarte med ${response.status}`
            );
        }

        const data = await response.json();

        console.log("Hund fra API-et:", data);

        // Lager img-elementet i JavaScript
        const img = document.createElement("img");
        img.src = data.message;
        img.alt = "En tilfeldig hund";

        hundResultat.innerHTML = "";
        hundResultat.appendChild(img);

    } catch (feil) {
        visFeil(hundResultat, feil);
    }

}


// -------------------------
// KNYTTER TIL KNAPPENE
// -------------------------

hentVits.addEventListener("click", hentVitser);

hentPunchlineKnapp.addEventListener(
    "click",
    hentSetupOgPoeng
);

hentHund.addEventListener("click", hentTilfeldigHund);


// -------------------------
// START
// -------------------------

// Henter én vits med en gang,
// så siden ikke ser tom ut
hentSetupOgPoeng();
