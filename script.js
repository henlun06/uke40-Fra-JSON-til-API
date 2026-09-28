import data from "./artists.json" with { type: "json" };

const artister = document.getElementById("artister");

for (const artist of data.artists) {
    artister.innerHTML += `
        <div>
            <h2>${artist.name}</h2>
            <p>Sjanger: ${artist.genre}</p>
            <p>Land: ${artist.country}</p>
            <p>Populær sang: ${artist.music.popularSong}</p>
        </div>
    `;
}