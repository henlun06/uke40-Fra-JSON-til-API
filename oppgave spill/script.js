// -------------------------
// OPPGAVE 2: LISTER OG OPPSLAG
// -------------------------

// Dette er listen fra oppgaveteksten
const spill = [
    "Minecraft",
    "Roblox",
    "Fortnite",
    "Valorant"
];


// Favorittmaten min
const startMat = [
    "Pizza",
    "Taco",
    "Burger",
    "Pasta",
    "Sushi"
];


// Vi jobber på en kopi, slik at vi alltid
// kan gå tilbake til startlisten
let favorittMat = [...startMat];


// -------------------------
// HENTER ELEMENTER FRA HTML
// -------------------------

const forsteMat = document.getElementById("forsteMat");
const sisteMat = document.getElementById("sisteMat");
const antallMat = document.getElementById("antallMat");
const matListe = document.getElementById("matListe");
const listeAntall = document.getElementById("listeAntall");
const matMelding = document.getElementById("matMelding");

const matInn = document.getElementById("matInn");
const leggTil = document.getElementById("leggTil");
const fjernSiste = document.getElementById("fjernSiste");
const fjernForste = document.getElementById("fjernForste");
const nullstill = document.getElementById("nullstill");


// -------------------------
// KONSOLLUTSKRIFT
// (Dette er den enkleste løsningen
//  oppgaven krever – jeg kjører den
//  også for å vise i konsollen)
// -------------------------

console.log("Oppgave 2 – Lister og oppslag");

console.log("Listen:", spill);
console.log("spill[0]:", spill[0]);
console.log("spill[2]:", spill[2]);
console.log("spill[10]:", spill[10]);

console.log("Første element:", favorittMat[0]);
console.log(
    "Siste element:",
    favorittMat[favorittMat.length - 1]
);
console.log("Antall elementer:", favorittMat.length);


// -------------------------
// VISER FØRSTE, SISTE OG ANTALL
// -------------------------

function visStatistikk() {

    // Ettersom listen kan bli tom, må vi
    // sjekke at det finnes noe å vise
    if (favorittMat.length === 0) {
        forsteMat.textContent = "Tom liste";
        sisteMat.textContent = "Tom liste";
    } else {
        forsteMat.textContent = favorittMat[0];
        sisteMat.textContent =
            favorittMat[favorittMat.length - 1];
    }

    antallMat.textContent = favorittMat.length;
}


// -------------------------
// VISER ALLE ELEMENTENE
// -------------------------

function visAlle() {

    matListe.innerHTML = "";

    listeAntall.textContent =
        `${favorittMat.length} elementer`;

    if (favorittMat.length === 0) {
        matListe.innerHTML = `
            <li class="tom">
                Listen er tom. Legg til noe fra knappen over.
            </li>
        `;

        return;
    }


    // for...of-løkke som går gjennom listen
    for (const mat of favorittMat) {

        const li = document.createElement("li");
        li.className = "mat-element";
        li.textContent = mat;

        matListe.appendChild(li);

    }
}


// -------------------------
// OPPDATERER SIDEN
// -------------------------

function oppdater() {
    visStatistikk();
    visAlle();
}


// -------------------------
// LEGGER TIL ET ELEMENT
// -------------------------

leggTil.addEventListener("click", () => {

    const nyMat = matInn.value.trim();

    if (nyMat === "") {
        matMelding.textContent =
            "⚠️ Skriv inn en matrett før du trykker på knappen.";
        return;
    }

    favorittMat.push(nyMat);

    console.log("La til:", nyMat);
    console.log("Listen nå:", favorittMat);

    matMelding.textContent = `✅ La til «${nyMat}».`;
    matInn.value = "";

    oppdater();

});


// Enter-tasten skal også legge til
matInn.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        leggTil.click();
    }
});


// -------------------------
// FJERNER ELEMENTER
// -------------------------

fjernSiste.addEventListener("click", () => {

    if (favorittMat.length === 0) {
        matMelding.textContent = "⚠️ Listen er allerede tom.";
        return;
    }

    // .pop() fjerner og returnerer
    // det siste elementet i listen
    const fjernet = favorittMat.pop();

    console.log("Fjernet siste:", fjernet);
    console.log("Listen nå:", favorittMat);

    matMelding.textContent = `🗑️ Fjernet «${fjernet}».`;
    oppdater();

});


fjernForste.addEventListener("click", () => {

    if (favorittMat.length === 0) {
        matMelding.textContent = "⚠️ Listen er allerede tom.";
        return;
    }

    // splice(plassering, antall) fjerner
    // element 0 – altså det første
    const fjernet = favorittMat.splice(0, 1)[0];

    console.log("Fjernet første:", fjernet);
    console.log("Listen nå:", favorittMat);

    matMelding.textContent = `🗑️ Fjernet «${fjernet}».`;
    oppdater();

});


nullstill.addEventListener("click", () => {

    favorittMat = [...startMat];

    matMelding.textContent = "🔄 Listen er tilbake til start.";
    oppdater();

    console.log("Nullstilt. Listen:", favorittMat);

});


// -------------------------
// START
// -------------------------

oppdater();
