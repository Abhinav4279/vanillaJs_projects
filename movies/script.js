const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const mainEl = document.querySelector('main');

async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    respData.results.forEach(movieData => {
        const movie = document.createElement('div');
        movie.className = "movie";

        movie.innerHTML = `
            <img src="${IMGPATH + movieData.poster_path}" alt="${movieData.title}">
            <div class="movie-info">
                <h3>${movieData.title}</h3>
                <span>${movieData.vote_average}</span>
            </div>
        `;

        mainEl.appendChild(movie);
    });


    return respData;
}
getMovies();