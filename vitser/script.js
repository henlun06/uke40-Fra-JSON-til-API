// URL til JSON-filen

const jokesURL =
    "https://terjetheteacher.github.io/some-jokes/jokes.json";


// Henter elementene fra HTML

const forsteVits =
    document.getElementById("forsteVits");

const alleVitser =
    document.getElementById("alleVitser");

const tilfeldigVits =
    document.getElementById("tilfeldigVits");

const tilfeldigKnapp =
    document.getElementById("tilfeldigKnapp");

const sok =
    document.getElementById("sok");

const antall =
    document.getElementById("antall");


// Her lagrer vi alle vitsene

let vitser = [];


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