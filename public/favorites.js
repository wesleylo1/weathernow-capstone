const form = document.querySelector('form')
const ul = document.querySelector('ul')
const baseURL = 'http://localhost:5050/favorites'

const favoriteCallback = ({ data: favorites }) => displayFavorites(favorites)

const errCallback = err => console.log(err)

// get
const getAllFavorites = () => axios.get(baseURL).then(favoriteCallback).catch(errCallback)

// post
const createFavoriteItem = body => axios.post(baseURL, body).then(favoriteCallback).catch(errCallback)

// submitting new favorite

function submitFavorite(evt) {
    evt.preventDefault()

    let city = document.querySelector('.fave-city-input')
    let state = document.querySelector('.fave-state-input')

    let favObj = {
        city: city.value,
        state: state.value
    }
    if (city.value && state.value) {
    createFavoriteItem(favObj)
    } else {
        alert('input city and state name')
    }
    city.value = ''
    state.value = ''
}

form.addEventListener('submit', submitFavorite)

// create new favorite for list

function createFavorite(favorites) {
    const favoriteItem = document.createElement('li')
    favoriteItem.innerHTML = `${favorites.city}, ${favorites.state}`

    ul.appendChild(favoriteItem)
}


// display list of favorites

function displayFavorites(arr) {
    ul.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        createFavorite(arr[i])
    }
}





getAllFavorites()