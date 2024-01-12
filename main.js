const movieInput = document.querySelector('#input');

let addToWatchlist;

export const searchBtn = document.querySelector('.btn');

export const savedMovies = getFromLocalStorage('savedMovies') || [];

movieInput.addEventListener('input', () => {
    if (movieInput.value.length > 0) {
        searchBtn.disabled = false;
    } else {
        searchBtn.disabled = true;
    }
});

searchBtn.addEventListener('click', () => {
    reload();
    searchDatabase();
    movieInput.value = '';
});

function searchDatabase() {
    fetch(`http://www.omdbapi.com/?apikey=10016d75&t&s=${movieInput.value}`)
        .then((res) => res.json())
        .then((data) => {
            data.Search.forEach((result) => {
                fetch(
                    `http://www.omdbapi.com/?apikey=10016d75&t&t=${result.Title}&y&plot=short`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        displayResults(data);

                        addToWatchlist.addEventListener('click', () => {
                            addMovie(data);
                            addTimeout(data);

                            setTimeout(removeMovieAlert, 4000);
                        });
                    });
            });
        });
}

// save movie ids that are clicked on to local storage
function addMovie(data) {
    savedMovies.push(data.imdbID);
    saveToLocalStorage('savedMovies', savedMovies);
}

// saved to local storage function
export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// get from local storage function
export function getFromLocalStorage(key) {
    const dataString = localStorage.getItem(key);
    return JSON.parse(dataString);
}

function reload() {
    const mainSection = document.querySelector('.main-section');
    mainSection.textContent = '';
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
    addToWatchlist = document.createElement('img');
    addToWatchlist.className = 'add-to-watchlist';
    addToWatchlist.src = './images/add.png';

    const label = document.createElement('label');
    label.for = 'add-to-watchlist';
    label.textContent = 'Watchlist';

    span.appendChild(addToWatchlist);
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

function defaultDisplay() {
    const mainSection = document.querySelector('.main-section');
    const movieContent = document.querySelector('.movie-content');

    if (!mainSection) {
        movieContent.style.display = 'none';
    }
}

let timeout;

function addTimeout(data) {
    let timeout = setTimeout(movieAddAlert(data), 500);
}

function removeMovieAlert() {
    const modalDiv = document.querySelector('.modal-div');
    modalDiv.style.display = 'none';
}

function movieAddAlert(data) {
    const modalDiv = document.querySelector('.modal-div');
    modalDiv.style.display = 'block';

    const modalText = document.querySelector('.modal-text');
    modalText.textContent = `You have added ${data.Title} to your watchlist!`;
}

defaultDisplay();
