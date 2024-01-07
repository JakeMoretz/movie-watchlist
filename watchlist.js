import { savedMovies, searchBtn } from './main.js';

let removeFromWatchlist

searchBtn.addEventListener('click', () => {
    reload();
    searchDatabase();
    movieInput.value = '';
});


function displaySavedMovies() {
    savedMovies.forEach((result) => {
        fetch(`http://www.omdbapi.com/?apikey=10016d75&t&i=${result}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);

                displayResults(data)

                removeFromWatchlist.addEventListener('click', () => {
                    console.log("clicked")
                    removeClickedMovie()
                })
                
            });
    });
}

function removeClickedMovie(index) {
    savedMovies.slice(index, 1)
    console.log(savedMovies)
}

console.log(savedMovies)




function displayResults(dataResults) {
    //main section
    const mainSection = document.querySelector('.main-section');

    //movie card
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    mainSection.appendChild(movieCard);

    // movies poster
    const movieImg = document.createElement('img');
    movieImg.className = 'movie-img';
    movieImg.src = dataResults.Poster;

    movieCard.appendChild(movieImg);

    //movie info div
    const movieInfoDiv = document.createElement('div');
    movieInfoDiv.className = 'movie-info-div';

    movieCard.appendChild(movieInfoDiv);

    //title section
    const titleSection = document.createElement('div');
    titleSection.className = 'title-section';

    movieInfoDiv.appendChild(titleSection);

    const movieTitle = document.createElement('h2');
    movieTitle.className = 'movie-title';
    movieTitle.textContent = dataResults.Title;

    const starIcon = document.createElement('img');
    starIcon.className = 'star-icon';
    starIcon.src = './images/star.png';

    const rating = document.createElement('p');
    rating.className = 'rating';
    rating.textContent = dataResults.imdbRating;

    titleSection.appendChild(movieTitle);
    titleSection.appendChild(starIcon);
    titleSection.appendChild(rating);

    // movie length div
    const movieLengthDiv = document.createElement('div');
    movieLengthDiv.className = 'movie-length-div';

    movieInfoDiv.appendChild(movieLengthDiv);

    // append to movie length div
    const movieRuntime = document.createElement('p');
    movieRuntime.className = 'movie-time';
    movieRuntime.textContent = dataResults.Runtime;

    const movieGenre = document.createElement('p');
    movieGenre.className = 'movie-genre';
    movieGenre.textContent = dataResults.Genre;

    const span = document.createElement('span');

    movieLengthDiv.appendChild(movieRuntime);
    movieLengthDiv.appendChild(movieGenre);
    movieLengthDiv.appendChild(span);

    // append to span
    removeFromWatchlist = document.createElement('img');
    removeFromWatchlist.className = 'add-to-watchlist';
    removeFromWatchlist.id = 'remove-from-watchlist'
    removeFromWatchlist.src = './images/remove.png';

    const label = document.createElement('label');
    label.for = 'remove-from-watchlist';
    label.textContent = 'Remove';

    span.appendChild(removeFromWatchlist);
    span.appendChild(label);

    //movie description
    const movieDescriptionDiv = document.createElement('div');
    movieDescriptionDiv.className = 'movie-description';

    const moviePlot = document.createElement('p');
    moviePlot.textContent = dataResults.Plot;

    movieInfoDiv.appendChild(movieDescriptionDiv);
    movieDescriptionDiv.appendChild(moviePlot);

    const hr = document.createElement('hr');

    mainSection.appendChild(hr);
}

displaySavedMovies();