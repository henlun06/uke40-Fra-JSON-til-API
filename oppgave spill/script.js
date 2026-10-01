// -------------------------
// OPPGAVE 2: LISTER OG OPPSLAG
// -------------------------
//
// Her tester jeg lister i JavaScript.
// Resultatene skrives BÅDE ut i konsollen OG på nettsiden.


// -------------------------
// LISTENE
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


// Jeg jobber på en kopi av startlisten, slik at
// jeg alltid kan gå tilbake til start med nullstill
let favorittMat = [...startMat];


// -------------------------
// KONSOLLUTSKRIFT
// -------------------------
//
// Dette er den enkleste løsningen oppgaven krever.
// Trykk F12 i nettleseren for å se utskriften.

console.log("Oppgave 2 – Lister og oppslag");
console.log("");

console.log("Oppslag i listen 'spill':");
console.log("Hele listen:", spill);
console.log("spill[0]     ->", spill[0], "(første)");
console.log("spill[2]     ->", spill[2], "(tredje)");
console.log("spill[10]    ->", spill[10], "(finnes ikke!)");
console.log("spill.length ->", spill.length);
console.log("");

console.log("Favorittmaten min:");
console.log("Listen:", favorittMat);
console.log("Første element:", favorittMat[0]);
console.log(
    "Siste element:",
    favorittMat[favorittMat.length - 1]
);
console.log("Antall elementer:", favorittMat.length);


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
// VISER FØRSTE, SISTE OG ANTALL
// -------------------------

function visStatistikk() {

    // Listen kan bli tom, så jeg må sjekke
    // at det finnes noe å vise først
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
// DEAKTIVERER KNAPPER NÅR
// LISTEN ER TOM
// -------------------------

function oppdaterKnapper() {

    const erTom = favorittMat.length === 0;

    fjernSiste.disabled = erTom;
    fjernForste.disabled = erTom;

}


// -------------------------
// OPPDATERER HELE SIDEN
// -------------------------

function oppdater() {
    visStatistikk();
    visAlle();
    oppdaterKnapper();
}


// -------------------------
// LEGGER TIL ET ELEMENT
// -------------------------

function leggTilMat() {

    const nyMat = matInn.value.trim();

    if (nyMat === "") {
        matMelding.textContent =
            "⚠️ Skriv inn en matrett først.";
        matInn.focus();
        return;
    }

    // .push() legger til bakerst i listen
    favorittMat.push(nyMat);

    console.log("La til:", nyMat);
    console.log("Listen nå:", favorittMat);

    matMelding.textContent = `✅ La til «${nyMat}».`;
    matInn.value = "";

    oppdater();
    matInn.focus();

}

leggTil.addEventListener("click", leggTilMat);


// Enter-tasten skal også legge til
matInn.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        leggTilMat();
    }
});


// -------------------------
// FJERNER SISTE ELEMENT
// -------------------------

fjernSiste.addEventListener("click", () => {

    if (favorittMat.length === 0) {
        matMelding.textContent =
            "⚠️ Listen er allerede tom.";
        return;
    }

    // .pop() fjerner det siste elementet
    // og gir det tilbake
    const fjernet = favorittMat.pop();

    console.log("Fjernet siste:", fjernet);
    console.log("Listen nå:", favorittMat);

    matMelding.textContent = `🗑️ Fjernet «${fjernet}».`;
    oppdater();

});


// -------------------------
// FJERNER FØRSTE ELEMENT
// -------------------------

fjernForste.addEventListener("click", () => {

    if (favorittMat.length === 0) {
        matMelding.textContent =
            "⚠️ Listen er allerede tom.";
        return;
    }

    // .splice(plassering, antall) fjerner
    // element 0 – altså det første
    const fjernet = favorittMat.splice(0, 1)[0];

    console.log("Fjernet første:", fjernet);
    console.log("Listen nå:", favorittMat);

    matMelding.textContent = `🗑️ Fjernet «${fjernet}».`;
    oppdater();

});


// -------------------------
// NULLSTILLER LISTEN
// -------------------------

nullstill.addEventListener("click", () => {

    favorittMat = [...startMat];

    matMelding.textContent =
        "🔄 Listen er tilbake til start.";

    console.log("Nullstilt. Listen:", favorittMat);

    oppdater();

});


// -------------------------
// START
// -------------------------

oppdater();
