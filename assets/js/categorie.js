// Faire un appel avec fetch pour récupérer les données de l'API

let paginationCategories = ["http://localhost:8000/api/v1/genres/"];

let StockerPaginationDesPages = async () => {
    for (let i = 0; i < paginationCategories.length; i++) {
        try {
            const response = await fetch(paginationCategories[i]);
            const data = await response.json();
            if (data.next != null) {
                paginationCategories.push(data.next);
            }
        } catch (error) {
            console.log(error);
        }
    }
};
StockerPaginationDesPages();

let afficherCategories = async () => {
    for (let i = 0; i < paginationCategories.length; i++) {
        try {
            const response = await fetch(paginationCategories[i]);
            const data = await response.json();
            const categories = document.querySelector(".header_nav_categories_submenu");
            for (let i = 0; i < data.results.length; i++) {
                // Afficher en mode grid les catégories
                categories.innerHTML += "<li><a href='http://localhost:8000/Genre/" + data.results[i].name + "' class='header_categorie'>" + data.results[i].name + "</a></li>";
            }
        } catch (error) {
            console.log(error);
        }
    }
};
afficherCategories();


let afficherFilmsParCategorie = async (categoriesName) => {
    let filmsByCategorie = ["http://localhost:8000/api/v1/titles/?genre=" + categoriesName + "&sort_by=-imdb_score"];
    // Affiche que les 5 premiere page de l'api par categorie avec un classement par note soit environ 20 films
    for (let i = 0; i < 5; i++) {
        try {
            const response = await fetch(filmsByCategorie[i]);
            const data = await response.json();
            const films = document.querySelector("#" + categoriesName + "");
            if (data.next != null) {
                filmsByCategorie.push(data.next);
                console.log(filmsByCategorie);
            }
            for (let j = 0; j < data.results.length; j++) {
                // Afficher en mode carrousel les films par catégorie
                films.innerHTML += "<div class='film_carrousel_item'>";
                films.innerHTML += "<img src='" + data.results[j].image_url + "' alt='Image du film " + data.results[j].title + "'>";
                films.innerHTML += "</div>";
            }

        }
        catch (error) {
            console.log(error);
        }
    }
}

let afficherCategoriesCarrousel = async () => {
    for (let i = 0; i < paginationCategories.length; i++) {
        try {
            const response = await fetch(paginationCategories[i]);
            const data = await response.json();
            const categories = document.querySelector("#categorie_carrousel");
            for (let i = 0; i < data.results.length; i++) {
                // Afficher en mode carrousel les catégories
                categories.innerHTML += "<h2>" + data.results[i].name + "</h2>";
                categories.innerHTML += "<div class='container_carrousel'>";
                categories.innerHTML += "<div id=" + data.results[i].name + " class='categorie_carrousel_title'>";
                categories.innerHTML += "</div>";
                categories.innerHTML += "</div>";
                afficherFilmsParCategorie(data.results[i].name);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
afficherCategoriesCarrousel();

