let main = document.querySelector('main');

let meuilleurFilm = async (k=0, j=1) => {
    // Création de la section MeuilleurFilm
    let meuilleurFilm = document.querySelector('.meuilleurFilm');

    // Création du titre MeuilleurFilm
    meuilleurFilm.innerHTML = "<h2 class='meuilleurFilm_title meuilleurFilm_title_h2'>Meuilleur film</h2>";

    // Affichage du meilleur film avec appel de l'API
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1");
        const data = await response.json();
        console.log(data);
        const bestFilm = document.querySelector('.meuilleurFilm');
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
meuilleurFilm();

let LesMeuilleursFilms = async () => {
    // Création de la section LesMeuilleursFilms
    let LesMeuilleursFilms = document.querySelector('.LesMeuilleursFilms');

    // Création du titre LesMeuilleursFilms
    LesMeuilleursFilms.innerHTML = "<h2 class='LesMeuilleursFilms_title LesMeuilleursFilms_title_h2'>Les meuilleurs films</h2>";

    // Affichage des meilleurs films avec appel de l'API
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=50");
        const data = await response.json();
        console.log(data);
        if (data.results){
            LesMeuilleursFilms.innerHTML += "<div class='LesMeuilleursFilms_container'></div>";
            const LesMeuilleursFilmsContainer = document.querySelector('.LesMeuilleursFilms_container');

            // Si la taile de l'écran est inférieur à 768px 
            if (window.innerWidth < 768) {
                k = 0;
                j = 1;
            }
            // Si la taile de l'écran est inférieur à 1024px
            else if (window.innerWidth < 1024) {
                k = 0;
                j = 3;
            }
            // Si la taile de l'écran est supérieur à 1024px
            else {
                k = 0;
                j = 5;
            }
            
            // PRECEDENTS
            LesMeuilleursFilmsContainer.innerHTML += "<button class='LesMeuilleursFilms_btn' type='button'><span>Précédents</span></button>";

            // FILMS
            LesMeuilleursFilmsContainer.innerHTML += "<div class='LesMeuilleursFilms_container_film'></div>";
            const LesMeuilleursFilmsContainerFilm = document.querySelectorAll('.LesMeuilleursFilms_container_film');

            for (i = k; i < j; i++) {
                let film = document.createElement('img');
                film.setAttribute('class', 'LesMeuilleursFilms_image');
                film.setAttribute('src', data.results[i].image_url);
                LesMeuilleursFilmsContainerFilm[0].appendChild(film);
            }

            // SUIVANTS
            LesMeuilleursFilmsContainer.innerHTML += "<button class='LesMeuilleursFilms_btn' type='button'><span>Suivants<span></button>"; 

            
        }

    } catch (error) {
        console.log(error);
    }
}
LesMeuilleursFilms();
