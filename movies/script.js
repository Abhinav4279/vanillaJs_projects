const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const searchEl = document.getElementById('search');

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showList(respData);
}

function showList(movies) {
    mainEl.innerHTML = '';

    movies.results.forEach(movieData => {
        const movie = document.createElement('div');
        movie.className = "movie";

        movie.innerHTML = `
            <img src="${IMGPATH + movieData.poster_path}" alt="${movieData.title}">
            <div class="movie-info">
                <h3>${movieData.title}</h3>
                <span>${movieData.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${movieData.overview}
            </div>
        `;

        mainEl.appendChild(movie);
    });
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchEl.value;

    getMovies(SEARCHAPI + searchTerm);
    searchEl.value = '';
});