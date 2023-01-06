// Faire un appel avec fetch pour récupérer les données de l'API
const best_films = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";

let paginationFilms = ["http://localhost:8000/api/v1/titles/"];

let StockerPaginationDesFilms = async () => {
    for (let i = 0; i < 4; i++) {
        try {
            const response = await fetch(paginationFilms[i]);
            const data = await response.json();
            if (data.next != null) {
                paginationFilms.push(data.next);
            }
        } catch (error) {
            console.log(error);
        }
    }
};
StockerPaginationDesFilms();


let affficherLeMeilleurFilm = async () => {
    try {
        const response = await fetch(best_films);
        const data = await response.json();
        // console.log(data);
        const bestFilm = document.getElementById("best_film");
        try {
            if (data.results[0]) {
                bestFilm.innerHTML += "<img src='" + data.results[0].image_url + "' alt='Image du film " + data.results[0].title + "'>";
                bestFilm.innerHTML += "<h3>" + data.results[0].title + "</h3>";
                bestFilm.innerHTML += "<button type='button' class='btn btn-primary'>Voir le film</button>";
        }
        }
        catch (error) {
            console.log(error);
        }
    } catch (error) {   
        console.log(error);
    }

}
affficherLeMeilleurFilm();

let affficherLesmeilleursFilms = async () => {
    try {
        console.log(paginationFilms);
        for (let i = 0; i < paginationFilms.length; i++) {
            const response = await fetch(paginationFilms[i]);
            const data = await response.json();
            const bestFilmCarrousel = document.getElementById("best_film_carrousel");
            for (let i = 0; i < data.results.length; i++) {
                try {
                    if (data.results[i]) {
                        bestFilmCarrousel.innerHTML += "<div class='best_film_carrousel_item'>";
                        bestFilmCarrousel.innerHTML += "<img src='" + data.results[i].image_url + "' alt='Image du film " + data.results[i].title + "'>";
                        bestFilmCarrousel.innerHTML += "</div>";
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
affficherLesmeilleursFilms();