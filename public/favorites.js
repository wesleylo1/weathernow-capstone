const form = document.querySelector('form')
const ul = document.querySelector('ul')
const main = document.querySelector('main')
let clearIMG = 'url("./images/clear.jpeg")'
let cloudIMG = 'url("./images/clouds.jpeg")'
let drizzleIMG = 'url("./images/drizzle.jpeg")'
let rainIMG = 'url("./images/rain.jpeg")'
let snowIMG = 'url("./images/snow.jpeg")'
let thunderstormIMG = 'url("./images/thunderstorm.jpg")'
let mistIMG = 'url("./images/mist.jpeg")'
let smokeIMG = 'url("./images/smoke.jpeg")'
let hazeIMG = 'url("./images/haze.jpeg")'
let dustIMG = 'url("./images/dust.jpeg")'
let fogIMG = 'url("./images/fog.jpeg")'
const baseURL = '/favorites'


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
        state: state.value.toUpperCase()
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
    favoriteItem.innerHTML = `<span class="id-${favorites.id}">${favorites.city}, ${favorites.state}</span><button class="delete" onclick="deleteFavorite(${favorites.id})">X</button`

    ul.appendChild(favoriteItem)

    // get city info

    let city = `${favorites.city}`
    let state = `${favorites.state}`


    let cityObj = {
        cityName: city,
        stateName: state
        }

    const getFavWeather = () => axios.get(`${baseURL}/weather`, {params:cityObj})
    .then(res => {
        document.querySelector('h1').textContent = res.data[0]

        document.querySelector('#description').textContent = `${res.data[1]}`
        let temperature = Math.round(res.data[2])
        document.querySelector('#temperature').textContent = `${temperature}\u00B0`
        let feel = Math.round(res.data[3])
        document.querySelector('#feel').textContent = `${feel}\u00B0`
        let minTemp = Math.round(res.data[4])
        document.querySelector('#min-temp').textContent = `${minTemp}\u00B0`
        let maxTemp = Math.round(res.data[5])
        document.querySelector('#max-temp').textContent = `${maxTemp}\u00B0`

        document.querySelector('#humidity').textContent = `${res.data[6]}%`

        let condition = res.data[7]

        if (condition === 'Thunderstorm') {
            main.style.backgroundImage = thunderstormIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Drizzle') {
            main.style.backgroundImage = drizzleIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Rain') {
            main.style.backgroundImage = rainIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Snow') {
            main.style.backgroundImage = snowIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Clear') {
            main.style.backgroundImage = clearIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Clouds') {
            main.style.backgroundImage = cloudIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Mist') {
            main.style.backgroundImage = mistIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Smoke') {
            main.style.backgroundImage = smokeIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Haze') {
            main.style.backgroundImage = hazeIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Dust') {
            main.style.backgroundImage = dustIMG
            main.style.backgroundSize = "cover"
        } else if (condition === 'Fog') {
            main.style.backgroundImage = fogIMG
            main.style.backgroundSize = "cover"
        }

    })
    .catch(errCallback)

    let span = document.querySelector(`.id-${favorites.id}`)
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