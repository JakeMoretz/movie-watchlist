// const apiKey = 10016d75
const movieInput = document.querySelector('#input')
const searchBtn = document.querySelector('.btn')

searchBtn.addEventListener('click', () => {
    fetch(`http://www.omdbapi.com/?apikey=10016d75&s=${movieInput.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        // loop through the data
        // create card elements
        // display card elements 

        // try to make functions do one thing

        // build a mock up card to get the styles set


    })
})

