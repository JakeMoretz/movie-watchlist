import { savedMovies, searchBtn, saveToLocalStorage } from './main.js';

let removeFromWatchlist;

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
                displayResults(data);

                removeFromWatchlist.addEventListener('click', () => {
                    const indexToRemove = savedMovies.findIndex(
                        (movie) => movie === data.imdbID
                    );

                    if (indexToRemove !== -1) {
                        savedMovies.splice(indexToRemove, 1);
                    }

                    const movieCardToRemove = document.querySelector(
                        `.movie-container[data-id="${data.imdbID}"]`
                    );

                    if (movieCardToRemove) {
                        movieCardToRemove.remove();
                    }

                    saveToLocalStorage('savedMovies', savedMovies);
                });
            });
    });
}

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
    removeFromWatchlist.id = 'remove-from-watchlist';
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
    hr.className = 'line';

    mainSection.appendChild(hr);

    const hrDiv = document.createElement('div');
    hrDiv.className = 'hr-div';

    const movieContainer = document.createElement('div');
    movieContainer.className = 'movie-container';
    movieContainer.setAttribute('data-id', dataResults.imdbID);

    movieContainer.appendChild(movieCard);

    mainSection.appendChild(movieContainer);

    movieContainer.appendChild(hrDiv);

    hrDiv.appendChild(hr);
}

function defaultDisplay() {
    const movieContainer = document.querySelector('.movie-container')
    const movieCard = document.querySelector('.movie-card')

    if (!movieContainer) {
        console.log('ahhh')

        // work on this
       
    }

    
}

defaultDisplay()

displaySavedMovies();
