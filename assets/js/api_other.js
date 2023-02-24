// Fonction qui va exécuter le code de l'API
let main = async () => {

    // Actualisation de la page au redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        window.location.reload();
    })

    let film_meuilleur_list_btn_precedent = document.getElementsByClassName("meuilleurFilm_list_btn_precedent")
    // Transformer en tableau 
    if (window.innerWidth < 768) {
        // Execute ce code
        console.log('Mobile')
        film_meuilleur_list(0, 2)
    }
    else if (window.innerWidth < 1024) {
        // Execute ce code
        console.log('Tablette')
        film_meuilleur_list(0, 4)
    }
    else {
        // Execute ce code
        console.log('Ordinateur')
        film_meuilleur_list(0, 6)
    }

    // Affiche par défaut
    film_meuilleur()
}
// Fonction qui va prendre en compte une url d'api et retourner la response
let api = async (url) => {
    let requestUrl = await fetch(url)
    let response = await requestUrl.json()
    return response
}

// Fonction qui va afficher le meuilleur film
let film_meuilleur = async () => {
    try {
        // On appelle l'API classé par note et on prend le premier film
        let response = await api("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1");
        let data_film = response.results[0]
        // On selectionne l'element html qui va contenir le meuilleur film
        let html_selector = document.querySelector('.meuilleurFilm')

        // On créer un container pour le meuilleur film
        let meuilleurFilm_container = document.createElement('div')
        meuilleurFilm_container.classList.add('meuilleurFilm_container')

        // On créer une image pour le meuilleur film
        let meuilleurFilm_img = document.createElement('img')
        meuilleurFilm_img.src = data_film.image_url
        meuilleurFilm_img.classList.add('meuilleurFilm_img')
        meuilleurFilm_container.appendChild(meuilleurFilm_img)
        

        // On créer un titre pour le meuilleur film
        let meuilleurFilm_titre = document.createElement('h3')
        meuilleurFilm_titre.innerHTML = data_film.title
        meuilleurFilm_titre.classList.add('meuilleurFilm_title')
        meuilleurFilm_titre.classList.add('meuilleurFilm_title_h3')
        meuilleurFilm_container.appendChild(meuilleurFilm_titre)

        // On créer un bouton pour le meuilleur film
        let meuilleurFilm_btn = document.createElement('button')
        meuilleurFilm_btn.innerHTML = 'Voir le film'
        meuilleurFilm_btn.classList.add('meuilleurFilm_btn')
        meuilleurFilm_container.appendChild(meuilleurFilm_btn)

        // On créer un modal du film
        modal("meuilleurFilm", data_film)

        // On ajoute le meuilleur film dans le html ! Important doit être en bas du code !
        html_selector.appendChild(meuilleurFilm_container)

        /// On créer un event pour afficher le modal du film
        let meuilleurFilm_btn_selector = document.getElementsByClassName('meuilleurFilm_btn')
        meuilleurFilm_btn_selector[0].addEventListener('click', () => {
            let meuilleurFilm_modal = document.getElementsByClassName('meuilleurFilm_modal')
            meuilleurFilm_modal[0].style.display = 'block'
        }
        )

    } catch (error) {
        // Si il y a une erreur on l'affiche dans la console
        console.log(error)
    }
}
// Fonction qui va afficher les meuilleurs films
let film_meuilleur_list = async (a, b) => {
    try {
        // On appelle l'API classé par note et on prend le premier film
        let response = await api("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=10");
        let data_film = response.results
        // On selectionne l'element html qui va contenir le meuilleur film
        let html_selector = document.querySelector('.meuilleurFilm_list')

        
        // On créer un titre de categorie
        let meuilleurFilm_list_title = document.createElement('h2')
        meuilleurFilm_list_title.innerHTML = 'Meuilleurs films'
        meuilleurFilm_list_title.classList.add('meuilleurFilm_list_title')
        meuilleurFilm_list_title.classList.add('meuilleurFilm_list_title_h2')
        html_selector.appendChild(meuilleurFilm_list_title)

        // On créer un container pour les filmes
        let meuilleurFilm_list_films_container = document.createElement('div')
        meuilleurFilm_list_films_container.classList.add('meuilleurFilm_list_films')
        html_selector.appendChild(meuilleurFilm_list_films_container)
        // console.log(a)
        // console.log(b)
        // console.log(data_film)
            
        // On créer le bouton précédent et suivant
        let meuilleurFilm_list_btn_precedent = document.createElement('button')
        meuilleurFilm_list_btn_precedent.innerHTML = 'Précédent'
        meuilleurFilm_list_btn_precedent.classList.add('meuilleurFilm_list_btn_precedent')
        meuilleurFilm_list_films_container.before(meuilleurFilm_list_btn_precedent)
        
        let meuilleurFilm_list_btn_suivant = document.createElement('button')
        meuilleurFilm_list_btn_suivant.innerHTML = 'Suivant'
        meuilleurFilm_list_btn_suivant.classList.add('meuilleurFilm_list_btn_suivant')
        meuilleurFilm_list_films_container.after(meuilleurFilm_list_btn_suivant)

        // parcoure data_film de a jusqu'a b
        for (let i = a; i < b; i++) {
            // On créer un container pour le meuilleur film
            // console.log(data_film[i])
            modal(i, "meuilleurFilm_list_films", data_film[i], data_film[i].id)
            // On créer un les href pour les filmes
            let meuilleurFilm_list_href = document.createElement('a')
            meuilleurFilm_list_href.href = '#'
            meuilleurFilm_list_href.classList.add('meuilleurFilm_list_href', 'meuilleurFilm_list_btn_' + data_film[i].id)
            meuilleurFilm_list_films_container.appendChild(meuilleurFilm_list_href)

            // On créer un les images pour les filmes
            let meuilleurFilm_list_img = document.createElement('img')
            meuilleurFilm_list_img.src = data_film[i].image_url
            meuilleurFilm_list_img.classList.add('meuilleurFilm_list_img', 'meuilleurFilm_list_img_' + data_film[i].id)
            meuilleurFilm_list_href.appendChild(meuilleurFilm_list_img)

            let meuilleurFilm_list_btn = document.getElementsByClassName('meuilleurFilm_list_btn_' + data_film[i].id)
            let meuilleurFilm_list_modal = document.getElementsByClassName('meuilleurFilm_list_films_modal_' + data_film[i].id)
            
            meuilleurFilm_list_btn[0].addEventListener('click', () => {
                alert('ok : ' + data_film[i].id)
                meuilleurFilm_list_modal[0].style.display = 'block'
            })
        }

    } catch (error) {
        // Si il y a une erreur on l'affiche dans la console
        console.log(error)
    }
}
// Fonction qui va afficher les filmes par categories

// Fonction qui va afficher les categories

// Fonction modal 
let modal = async (i, nameClass, data_film, id="", categories_names="") => {
    try {
        // On selectionne le bouton pour le meuilleur film
        let btn_selector = document.getElementsByClassName(nameClass + '_btn')
        if (id){
            btn_selector = document.getElementsByClassName(nameClass + '_btn_' + id)
        }
        if (categories_names){
            btn_selector = document.getElementsByClassName(nameClass + '_btn_' + id + '_' + categories_names)
        }
        let modal = document.createElement('a')
        modal.href = '#'
        modal.classList.add(nameClass + '_modal')
        html_selector = document.getElementsByClassName(nameClass)
        html_selector[0].appendChild(modal)
        /// Par default le modal est caché
        modal.style.display = 'none'
        modal.style.position = 'sticky'
        /// On créer le content du modal du film
        modal.classList.add(nameClass + '_modal_' + id)
        /// On créer le titre du modal du film
        let modal_title = document.createElement('h3')
        modal_title.innerHTML = data_film.title
        modal_title.classList.add(nameClass + '_modal_title')
        modal.appendChild(modal_title)
        /// On créer le bouton pour fermer le modal du film
        let modal_btn = document.createElement('button')
        modal_btn.innerHTML = 'X'
        modal_btn.classList.add(nameClass + '_modal_btn')
        modal.appendChild(modal_btn)

        let modal_btn_selector = document.getElementsByClassName(nameClass + '_modal_btn')
        modal_btn_selector[i].addEventListener('click', () => {
            modal.style.display = 'none'
        })

        /// On créer l'image du modal du film
        let modal_img = document.createElement('img')
        modal_img.src = data_film.image_url

        modal_img.classList.add(nameClass + '_modal_img')
        modal.appendChild(modal_img)

        // On ajoute le meuilleur film dans le html ! Important doit être en bas du code !
        html_selector[0].appendChild(modal)


    } 
    catch (error) {
        // Si il y a une erreur on l'affiche dans la console
        console.log(error)
    }
}

// Execute le code ! Important doit être en bas du code !
main()