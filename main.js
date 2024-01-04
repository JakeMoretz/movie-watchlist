// const apiKey = 10016d75
const movieInput = document.querySelector('#input');
const searchBtn = document.querySelector('.btn');

searchBtn.addEventListener('click', () => {
    fetch(`http://www.omdbapi.com/?apikey=10016d75&s=${movieInput.value}&y&plot=short`)
        .then((res) => res.json())
        .then((data) => {

            console.log(data)
            console.log(data.Plot)
            console.log(data.Runtime)
            console.log(data.imdbRating)

            displaySearchResults(data);

            // loop through the data
            // create card elements
            // display card elements

            // try to make functions do one thing

            // build a mock up card to get the styles set
        });
});



function displaySearchResults(dataResults) {
    fetch(`http://www.omdbapi.com/?apikey=10016d75&t=${movieInput.value}&y&plot=short`)
        .then(res => res.json())
        .then(data => {

            data.map((item) => {
                const mainSection = document.querySelector('.main-section');
        
                console.log(item);
                // movie card div
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';
        
                mainSection.appendChild(movieCard);
                //movie image div
                const movieImg = document.createElement('img');
                movieImg.className = 'movie-img';
                movieImg.src = item.Poster;
        
                movieCard.appendChild(movieImg);
            });

        })
    

   
}
