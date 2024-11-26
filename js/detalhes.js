const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const media = params.get('media');
//console.log("id: ", id, " - Midia: ", media);

document.addEventListener("DOMContentLoaded", async () => {
    await getMovie();
});

async function getMovie() {
    let movie;
    let baseUrl = 'https://api.themoviedb.org/3/';
    await fetch(`${baseUrl}${media}/${id}?language=pt-br`, options)
        .then(res => res.json())
        .then(res => movie = res)
        .catch(err => console.log('Erro ao carregar filme ', err));

    //console.log(movie);

    //poster
    document.querySelector('.poster').src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

    //detalhes do filme
    let detalhes = document.getElementById('detalhes');
    detalhes.innerHTML = `<h1>${movie.title ?? movie.name}</h1>
        <h5 class='mb-4'>Título Original: ${movie.original_title ?? movie.original_name}</h5>
        <p class='mb-1'>Data de Estreia: ${movie.release_data}</p>
        <p class='mb-1'>País de Origem: ${movie.origin_country}</p>
        <p class='mb-1'>Popularidade: ${movie.popularity.toFixed(1)}</p>
        <p class='mb-1'>Status: ${movie.status}</p>
        <p>${movie.overview}</p>`;

    movie.genres.forEach(genre => {
        detalhes.innerHTML +=
            `<button class='btn btn-lg btn-outline-light me-2'>
        ${genre.name}</button>`
    });


    // buscar o trailer

    let trailer;
    await fetch(`${baseUrl}${media}/${id}/videos?language=pt-br`, options)
        .then(res => res.json())
        .then(res => trailer = res.results)
        .catch(err => console.log('Erro ao carregar trailers ', err));
    // console.log(trailer)

    if (trailer.length > 0) {
        document.querySelector('iframe').src = `https://www.youtube.com/embed/${trailer[0].key}`
    } else {
        document.querySelector('#trailer').style.display = 'none';
    }

    // buscar elenco
    let elenco;
    await fetch(`${baseUrl}${media}/${id}/credits?language=pt-br`, options)
        .then(res => res.json())
        .then(res => elenco = res.cast)
        .catch(err => console.log('Erro ao carregar elencos ', err));
    //console.log(elenco);

    let elencoContainer = document.querySelector('#elenco');
    elencoContainer.innerHTML = '';
    for (let i = 0; i < elenco.length; i++) {

        let foto = elenco[i].profile_path ? `https://image.tmdb.org/t/p/original/${elenco[i].profile_path}` : `img/no-photo-cast.png`;
        elencoContainer.innerHTML +=
            `<div class="col-lg-4 col-sm-6"> 
                <div class="row">
                    <div class="col-lg-3 mb-3">
                        <img class="w-100 rouded-3" src="${foto}" > 
                    </div>
                    <div class="col-lg-9 mb-3">
                        <h4 class="">${elenco[i].original_name}</h4>
                        <p>${elenco[i].character}</p>
                    </div>
                </div>
            </div>`;
    }
}