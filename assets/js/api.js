
// Variables globales
const leMeilleurFilme = new URL("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
let paginationDesFilms = new URL("http://localhost:8000/api/v1/titles/");
let paginationDesCategories = new URL("http://localhost:8000/api/v1/genres/");
let titreDesCategories = [];
let titreDesFilms = [];

// Fonction qui stocke les pages de l'api dans un tableau pour les filmes
let stockerPaginationDesFilms = async (urlsArrayApiFilms) => {
    let response = await fetch(urlsArrayApiFilms);
    let data = await response.json();
    titreDesFilms.push(data);
    if (data.next != null) {
        console.log(paginationDesFilms);
        paginationDesFilms = new URL(data.next);
        stockerPaginationDesFilms(paginationDesFilms);
    }
    return titreDesFilms;
}
stockerPaginationDesFilms(paginationDesFilms);


let stockerPaginationDesCategories = async (urlsArrayApiCategories) => {
    let response = await fetch(urlsArrayApiCategories);
    let data = await response.json();
    titreDesCategories.push(data);
    if (data.next != null) {
        paginationDesCategories = new URL(data.next);
        stockerPaginationDesCategories(paginationDesCategories);
    }
    return titreDesCategories;
}
stockerPaginationDesCategories(paginationDesCategories);




console.log(titreDesFilms);
console.log(paginationDesFilms);