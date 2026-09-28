// URL-er til JSON-filene

const justJokesURL =
    "https://terjetheteacher.github.io/some-jokes/justJokes.json";

const jokesURL =
    "https://terjetheteacher.github.io/some-jokes/jokes.json";


// Henter elementene fra HTML

const antall = document.getElementById("antall");
const forste = document.getElementById("forste");
const siste = document.getElementById("siste");

const justJokesElement =
    document.getElementById("justJokes");

const jokesElement =
    document.getElementById("jokes");


// Henter justJokes.json

async function hentJustJokes() {

    const response = await fetch(justJokesURL);

    const data = await response.json();


    // Finner alle nøklene
    const ids = Object.keys(data);


    // Antall vitser
    antall.textContent = ids.length;


    // Første vits
    forste.textContent = data[ids[0]];


    // Siste vits
    siste.textContent = data[ids[ids.length - 1]];


    // Viser alle vitser

    ids.forEach(id => {

        const p = document.createElement("p");

        p.textContent =
            `${id}: ${data[id]}`;

        justJokesElement.appendChild(p);

    });
}


// Henter jokes.json

async function hentJokes() {

    const response = await fetch(jokesURL);

    const data = await response.json();


    // Går gjennom jokes-listen

    data.jokes.forEach(vits => {

        const div = document.createElement("div");

        div.className = "vits";

        div.innerHTML = `
            <strong>ID: ${vits.id}</strong>
            <p>${vits.joke}</p>
        `;

        jokesElement.appendChild(div);

    });
}


// Starter funksjonene

hentJustJokes();

hentJokes();