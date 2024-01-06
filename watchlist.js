import { savedMovies, searchBtn } from './main.js';

console.log(savedMovies);

searchBtn.addEventListener('click', () => {
    reload();
    searchDatabase();
    movieInput.value = '';
});

// search database to find the movies with the id that is saved

// maybe import search database function?

fetch(
    `http://www.omdbapi.com/?apikey=10016d75&t&t=${savedMovies.imdbId}&y&plot=short`
)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
