const knapp = document.getElementById("hentVits");
const resultat = document.getElementById("resultat");

const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?type=single&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

async function hentVits() {
    try {
        resultat.innerHTML = "<p>Henter data...</p>";

        const svar = await fetch(apiUrl);

        if (!svar.ok) {
            throw new Error("Kunne ikke hente data fra API-et.");
        }

        const data = await svar.json();

        resultat.innerHTML = `
            <h2>Vits</h2>
            <p>${data.joke}</p>

            <hr>

            <p><strong>Kategori:</strong> ${data.category}</p>
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Type:</strong> ${data.type}</p>
            <p><strong>Språk:</strong> ${data.lang}</p>
        `;

    } catch (feil) {
        resultat.innerHTML = `
            <p>Det oppstod en feil.</p>
            <p>${feil.message}</p>
        `;
    }
}

knapp.addEventListener("click", hentVits);