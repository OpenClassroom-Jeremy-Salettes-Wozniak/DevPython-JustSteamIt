let mainDocument = document.querySelector('main');

let meuilleurFilm = async () => {
    // Slection de la section MeuilleurFilm
    const bestFilm = document.querySelector('.meuilleurFilm');
    // Création du titre MeuilleurFilm
    meuilleurFilm.innerHTML = "<h2 class='meuilleurFilm_title meuilleurFilm_title_h2'>Meuilleur film</h2>";

    // Affichage du meilleur film avec appel de l'API
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1");
        const data = await response.json();
        try {
            if (data.results[0]) {
                bestFilm.innerHTML += "<div class='meuilleurFilm_container'></div>";
                const bestFilmContainer = document.querySelector('.meuilleurFilm_container');
                
                bestFilmContainer.innerHTML += "<img class='meuilleurFilm_image' src='" + data.results[0].image_url + "' alt='Image du film " + data.results[0].title + "'>";
                bestFilmContainer.innerHTML += "<h3 class='meuilleurFilm_title meuilleurFilm_title_h3'>" + data.results[0].title + "</h3>";
                bestFilmContainer.innerHTML += "<div class='meuilleurFilm_btn'><button type='button'>Voir le film</button></div>";
        }
        }
        catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}

let affichageFilm = async (i, j, data) => {
    // Affichage des meilleurs films avec appel de l'API
    try {

        // FILMS
        let divFilm = document.querySelector('.LesMeuilleursFilms_container_film');
        

        // Affichage des films en fonction de i et j
        divFilm.innerHTML = "";
        for(i ; i < j; i++){
            film = "<a href='http://localhost:8000/film/" + data[i].id + "'><img src='" + data[i].image_url + "' alt='Image du film " + data[i].title + "'></a>";
            divFilm.innerHTML += film;
        }        

    }

    catch (error) {
        console.log(error);
    }
}

let LesMeuilleursFilms = async (i, j) => {
    

    let LesMeuilleursFilms = document.querySelector('.LesMeuilleursFilms');

    // Création du titre LesMeuilleursFilms
    let h2 = document.createElement('h2');
    h2.classList.add('LesMeuilleursFilms_title', 'LesMeuilleursFilms_title_h2');
    h2.innerHTML = "Les meuilleurs films";
    LesMeuilleursFilms.appendChild(h2);

    // Div container 
    let divContainer = document.createElement('div');
    divContainer.classList.add('LesMeuilleursFilms_container');
    LesMeuilleursFilms.appendChild(divContainer);
    

    // Affichage des meilleurs films avec appel de l'API
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=50");
        const data = await response.json();
        if (data.results){

            // FILMS
                let divFilm = document.createElement('div');
                divFilm.classList.add('LesMeuilleursFilms_container_film');
                divContainer.appendChild(divFilm);

            if(data.results.length > 1){
                // PRECEDENTS
                let precedent = document.createElement('button');
                precedent.id = "LesMeuilleursFilms_btn_precedent";
                precedent.type = "button";
                precedent.innerHTML = "<span>Précédent</span>";
                divContainer.insertBefore(precedent, divContainer.firstChild);
                // SUIVANTS
                let suivant = document.createElement('button');
                suivant.id = "LesMeuilleursFilms_btn_suivant";
                suivant.type = "button";
                suivant.innerHTML = "<span>Suivant</span>";
                divContainer.appendChild(suivant, divContainer.firstChild);

                affichageFilm(i, j, data.results);

                precedent.addEventListener('click', function(e){
                    e.preventDefault();
                    if(i == 0){
                        i = i;
                        j = j;
                        affichageFilm(i, j, data.results);
                    }
                    else{
                        i = i - 1;
                        j = j - 1;
                        affichageFilm(i, j, data.results);
                    }
                });

                suivant.addEventListener('click', function(e){
                    e.preventDefault();
                    if(j == data.results.length){
                        soustraction = data.results.length - i;
                        i = data.results.length - soustraction;
                        j = data.results.length;
                        affichageFilm(i, j, data.results);
                    
                    }
                    else{
                        i = i + 1;
                        j = j + 1;
                        affichageFilm(i, j, data.results);
                    }
                });
            }
            else{
                affichageFilm(i, j, data.results);
            }
        }
    }
    catch (error) {
        console.log(error);
    }

};

let affichageFilmCategorie = async (i, j, data) => {
    console.log(i, j, data);
    // Affichage des meilleurs films avec appel de l'API
    try {
        // selection categories_container_film
        let divFilm = document.querySelector('.categories_container_film');
        console.log(divFilm);

        // Affichage des films en fonction de i et j
        for(i ; i < j; i++){
            film = "<a href='http://localhost:8000/film/" + data[i].id + "'><img src='" + data[i].image_url + "' alt='Image du film " + data[i].title + "'></a>";
            divFilm.innerHTML += film;
        }

    }
    catch (error) {
        console.log(error);
    }
}


let categories = async (i, j) => {
    try {
        // On recupère les 7 premiere catégories, changez la valeur de page_size pour en avoir plus
        const response = await fetch("http://localhost:8000/api/v1/genres/?page_size=7");
        const data = await response.json();

        // On récupère la div categories
        categories = document.querySelector('.categories');

        // Pour chaque catégorie on affiche le titre de la catégorie
        for(let s = 0 ; s < data.results.length ; s++){
            categorie = "<h2 class='categories_title categories_title_h2'><a href='http://localhost:8000/categorie/" + data.results[s].id + "'>" + data.results[s].name + "</a></h2>";
            categories.innerHTML += categorie;

            // On créer un container pour les films
            categorie_container = document.createElement('div');
            categorie_container.classList.add('categories_container');
            categories.appendChild(categorie_container);

            // On créer les boutons précédents et suivants
            // PRECEDENTS
            let precedent = document.createElement('button');
            precedent.id = "categories_btn_precedent";
            precedent.type = "button";
            precedent.innerHTML = "<span>Précédent</span>";
            categorie_container.insertBefore(precedent, categorie_container.firstChild);
            // SUIVANTS
            let suivant = document.createElement('button');
            suivant.id = "categories_btn_suivant";
            suivant.type = "button";
            suivant.innerHTML = "<span>Suivant</span>";
            categorie_container.appendChild(suivant, categorie_container.firstChild);

            // On créer un container pour les films
            categorie_container_film = document.createElement('div');
            categorie_container_film.classList.add('categories_container_film');
            categorie_container.appendChild(categorie_container_film);
        }
    }
    catch (error) {
        console.log(error);
    }


    //         categorie_container = document.createElement('div');
    //         categorie_container.classList.add('categories_container');
    //         categories.appendChild(categorie_container);

    //         categorie_container_film = document.createElement('div');
    //         categorie_container_film.classList.add('categories_container_film');
    //         categorie_container.appendChild(categorie_container_film);

            
    //         // PRECEDENTS
    //         let precedent = document.createElement('button');
    //         precedent.id = "categories_btn_precedent";
    //         precedent.type = "button";
    //         precedent.innerHTML = "<span>Précédent</span>";
    //         categorie_container.insertBefore(precedent, categorie_container.firstChild);
    //         // SUIVANTS
    //         let suivant = document.createElement('button');
    //         suivant.id = "categories_btn_suivant";
    //         suivant.type = "button";
    //         suivant.innerHTML = "<span>Suivant</span>";
    //         categorie_container.appendChild(suivant, categorie_container.firstChild);


    //         // Affichage des films par catégories avec appel de l'API
    //         const response_film = await fetch("http://localhost:8000/api/v1/titles/?genre=" + data.results[i].name + "&sort_by=-imdb_score&page_size=50");
    //         const data_film = await response_film.json();
    //         categoriesFilm(i, j, data_film.results);
    //     }
    // }
    // catch (error) {
    //     console.log(error);
    // }
}

// let categoriesFilm = async (i, j, data) => {
//     // Affichage des films en fonction de i et j
//     try {
//         let categorie_container_film = document.querySelector('.categories_container_film');
//         console.log(data);
//         if (data.length > 1) {
//             let suivant_category_film = document.querySelector('.categories_btn_suivant');
//             let precedent_category_film = document.querySelector('.categories_btn_precedent');

//             suivant_category_film.addEventListener('click', function(e){
//                 e.preventDefault();
//                 if(j == data.length){
//                     soustraction = data.length - i;
//                     i = data.length - soustraction;
//                     j = data.length;
//                     affichageFilm(i, j, data);
                
//                 }
//                 else{
//                     i = i + 1;
//                     j = j + 1;
//                     affichageFilm(i, j, data);
//                 }
//             }
//             );
        
//             precedent_category_film.addEventListener('click', function(e){
//                 e.preventDefault();
//                 if(i == 0){
//                     i = i;
//                     j = j;
//                     affichageFilm(i, j, data);
//                 }
//                 else{
//                     i = i - 1;
//                     j = j - 1;
//                     affichageFilm(i, j, data);
//                 }
//             }
//             );

//             for (let k = i; k < j; k++) {
//                 let film = "<div class='categories_container_film_film'><a href='http://localhost:8000/film/" + data[k].id + "'><img src='" + data[k].image_url + "' alt=''></a></div>";
//                 categorie_container_film.innerHTML += film;
//             }
//         }

//     }
//     catch (error) {
//         console.log(error);
//     }
// }


let main = async() => {
    // Création de la section MeuilleurFilm
    window.addEventListener('resize', () => {
        window.location.reload();
    })

    meuilleurFilm();


    // Création de la section LesMeuilleursFilms
    if (window.innerWidth < 768) {
        LesMeuilleursFilms(0, 1);
        categories(0, 1);

    }
    else if (window.innerWidth < 1024) {
        LesMeuilleursFilms(0, 4);
        categories(0, 4);
    }
    else {
        LesMeuilleursFilms(0, 6);
        categories(0, 6);
    }
}


main();