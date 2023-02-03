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
        console.log(i)
        console.log(j)
        console.log(data) // data.results est un tableau contentant les 50 films

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

            console.log(data.results.length);
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

let main = async() => {
    // Création de la section MeuilleurFilm
    window.addEventListener('resize', () => {
        window.location.reload();
    })

    meuilleurFilm();


    // Création de la section LesMeuilleursFilms
    if (window.innerWidth < 768) {
        LesMeuilleursFilms(0, 1);

    }
    else if (window.innerWidth < 1024) {
        LesMeuilleursFilms(0, 4);

    }
    else {
        LesMeuilleursFilms(0, 6);
    }

}


main();