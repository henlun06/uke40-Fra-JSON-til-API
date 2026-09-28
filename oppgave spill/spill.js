const favorittMat = [
    "Pizza",
    "Taco",
    "Burger",
    "Pasta",
    "Sushi"
];


// Første element
console.log("Første element:", favorittMat[0]);


// Siste element
console.log(
    "Siste element:",
    favorittMat[favorittMat.length - 1]
);


// Antall elementer
console.log(
    "Antall elementer:",
    favorittMat.length
);


// Legger til et nytt element
favorittMat.push("Kebab");

console.log("Etter at jeg la til Kebab:", favorittMat);


// Fjerner et element
favorittMat.splice(1, 1);

console.log("Etter at jeg fjernet Taco:", favorittMat);


// Skriver ut alle elementene med en løkke
console.log("Alle elementene:");

for (const mat of favorittMat) {
    console.log(mat);
}