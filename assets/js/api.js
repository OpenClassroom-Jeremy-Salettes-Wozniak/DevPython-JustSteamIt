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

//  Création de la section LesMeuilleursFilms
let LesMeuilleursFilms = async (j, k) => {
    // Création de la section LesMeuilleursFilms
    let LesMeuilleursFilms = document.querySelector('.LesMeuilleursFilms');

    // Création du titre LesMeuilleursFilms
    LesMeuilleursFilms.innerHTML = "<h2 class='LesMeuilleursFilms_title LesMeuilleursFilms_title_h2'>Les meuilleurs films</h2>";

    // Affichage des meilleurs films avec appel de l'API
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=50");
        const data = await response.json();
        if (data.results){
            let choiceMovement = ""
            LesMeuilleursFilms.innerHTML += "<div class='LesMeuilleursFilms_container'></div>";
            const LesMeuilleursFilmsContainer = document.querySelector('.LesMeuilleursFilms_container');

            // PRECEDENTS
            LesMeuilleursFilmsContainer.innerHTML += "<button id='LesMeuilleursFilms_btn_precedent' type='button'><span>Précédent</span></button>";

            // FILMS
            LesMeuilleursFilmsContainer.innerHTML += "<div class='LesMeuilleursFilms_container_film'></div>";
            
            listeFilme =[]
            data.results.forEach(element => {
                listeFilme.push(element);
            });

            console.log(k);
            console.log(j);
            
            // Affichage des 6 premiers elements de la liste 
            for (let i = j; i < k; i++)
            {
                let film = document.createElement('div');
                film.classList.add('LesMeuilleursFilms_container_film');
                let filmImage = document.createElement('img');
                filmImage.classList.add('LesMeuilleursFilms_container_film_image');
                filmImage.src = listeFilme[i].image_url;
                filmImage.alt = "Image du film " + listeFilme[i].title;
                film.appendChild(filmImage);
                LesMeuilleursFilmsContainer.appendChild(film);
            }

            // SUIVANTS
            LesMeuilleursFilmsContainer.innerHTML += "<button id='LesMeuilleursFilms_btn_suivant' type='button'><span>Suivant</span></button>";

            document.getElementById('LesMeuilleursFilms_btn_suivant').addEventListener('click', (e) => {
                e.preventDefault();
                console.log('e');
                alert('e');
                choiceMovement = "suivant";
                return choiceMovement;
            })
            document.getElementById('LesMeuilleursFilms_btn_precedent').addEventListener('click', (e) => {
                e.preventDefault();
                console.log('e');
                alert('e');
                choiceMovement = "precedent";
                return choiceMovement;
            })
            return choiceMovement;
        }
    } catch (error) {
        console.log(error);
    }
}

let main = async() => {
    // Création de la section MeuilleurFilm
    window.addEventListener('resize', () => {
        window.location.reload();
    })
    let k;
    let j;
    
    meuilleurFilm();
    // Création de la section LesMeuilleursFilms
    if (window.innerWidth < 768) {
        let k = 1;
        let j = 0;
        let responseLesMeuilleursFilms = LesMeuilleursFilms(j, k);
        console.log(responseLesMeuilleursFilms);
        if (responseLesMeuilleursFilms == "suivant") {
            j = j + 1;
            k = k + 1;
            LesMeuilleursFilms(j, k);
        }
        else if (responseLesMeuilleursFilms == "precedent") {
            j = j - 1;
            k = k - 1;
            LesMeuilleursFilms(j, k);
        }
    }
    else if (window.innerWidth < 1024) {
        let k = 3;
        let j = 0;
        LesMeuilleursFilms(j, k);
    }
    else {
        let k = 5;
        let j = 0;
        LesMeuilleursFilms(j, k);
    }

}


main();
