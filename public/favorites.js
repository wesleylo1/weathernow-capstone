const form = document.querySelector('form')
const ul = document.querySelector('ul')
const baseURL = 'http://localhost:5050/favorites'

const favoriteCallback = ({ data: favorites }) => displayFavorites(favorites)

const errCallback = err => console.log(err)

// get
const getAllFavorites = () => axios.get(baseURL).then(favoriteCallback).catch(errCallback)

// post
const createFavoriteItem = body => axios.post(baseURL, body).then(favoriteCallback).catch(errCallback)

// delete
const deleteFavorite = id => axios.delete(`${baseURL}/${id}`).then(favoriteCallback).catch(errCallback)

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
    favoriteItem.innerHTML = `<span>${favorites.city}, ${favorites.state}</span><button class="delete" onclick="deleteFavorite(${favorites.id})">X</button`

    ul.appendChild(favoriteItem)

    // get city info

    let id = favorites.id

    let city = `${favorites.city}`
        let state = `${favorites.state}`
        let cityObj = {
            cityName: city,
            stateName: state
        }

    const getFavWeather = () => axios.get(`${baseURL}/weather`, {params:cityObj})
    .then(res => {
        document.querySelector('h2').textContent = res.data[0]

        document.querySelector('#description').textContent = `Description: ${res.data[1]}`

        document.querySelector('#temperature').textContent = `Temperature: ${res.data[2]}`

        document.querySelector('#feel').textContent = `Feels like: ${res.data[3]}`

        document.querySelector('#min-temp').textContent = `Minimum Temperature: ${res.data[4]}`

        document.querySelector('#max-temp').textContent = `Maximum Temperature: ${res.data[5]}`

        document.querySelector('#humidity').textContent = `Humidity: ${res.data[6]}%`

    })
    .catch(errCallback)

    let span = document.querySelector('span')
    span.addEventListener('click', getFavWeather)

}



// display list of favorites

function displayFavorites(arr) {
    ul.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        createFavorite(arr[i])
    }
}





getAllFavorites()