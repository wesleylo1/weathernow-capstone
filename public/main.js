let weatherBtn = document.querySelector('.weather-button')
let body = document.querySelector('body')
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


//--------------------------default weather--------------------------

function displayDallasWeather() {
    axios.get(`/api/coordinates`)
    .then(res => {
        document.querySelector('.city-name').textContent = res.data[0]
        let current = Math.round(res.data[1])
        let h3 = document.querySelector('h3')
        h3.textContent = current + '\u00B0'
        Math.floor(h3.textContent)
        let weatherText = document.querySelector('.weather-paragraph')
        let minTemp = Math.round(res.data[2])
        let maxTemp = Math.round(res.data[3])
        let condition = res.data[4]
        weatherText.textContent = `${condition}. Low of ${minTemp}\u00B0. High of ${maxTemp}\u00B0.`

        if (condition === 'Thunderstorm') {
            body.style.backgroundImage = thunderstormIMG
        } else if (condition === 'Drizzle') {
            body.style.backgroundImage = drizzleIMG
        } else if (condition === 'Rain') {
            body.style.backgroundImage = rainIMG
        } else if (condition === 'Snow') {
            body.style.backgroundImage = snowIMG
        } else if (condition === 'Clear') {
            body.style.backgroundImage = clearIMG
        } else if (condition === 'Clouds') {
            body.style.backgroundImage = cloudIMG
        } else if (condition === 'Mist') {
            body.style.backgroundImage = mistIMG
        } else if (condition === 'Smoke') {
            body.style.backgroundImage = smokeIMG
        } else if (condition === 'Haze') {
            body.style.backgroundImage = hazeIMG
        } else if (condition === 'Dust') {
            body.style.backgroundImage = dustIMG
        } else if (condition === 'Fog') {
            body.style.backgroundImage = fogIMG
        }

        body.style.backgroundRepeat = "no-repeat"
    })
    .catch(err => console.log(err))
}

displayDallasWeather()

//--------------------------submitting city for weather--------------------------
function getCoordinates(evt) {
    evt.preventDefault()

    let input = document.querySelector('.weather-city')
    let splitInput = input.value.split(',')
    let city = splitInput[0]
    let state = splitInput[1]
    state.trim()
    let cityObj = {
        cityName: city,
        stateName: state
    }
    axios.get('/api/weather', {params:cityObj})
         .then(res => {
            document.querySelector('.city-name').textContent = res.data[0]
            let current = Math.round(res.data[1])
            let h3 = document.querySelector('h3')
            h3.textContent = current + '\u00B0'
            Math.floor(h3.textContent)
            let weatherText = document.querySelector('.weather-paragraph')
            let minTemp = Math.round(res.data[2])
            let maxTemp = Math.round(res.data[3])
            let condition = res.data[4]
            weatherText.textContent = `${condition}. Low of ${minTemp}\u00B0. High of ${maxTemp}\u00B0.`
            input.value = ''

            if (condition === 'Thunderstorm') {
                body.style.backgroundImage = thunderstormIMG
            } else if (condition === 'Drizzle') {
                body.style.backgroundImage = drizzleIMG
            } else if (condition === 'Rain') {
                body.style.backgroundImage = rainIMG
            } else if (condition === 'Snow') {
                body.style.backgroundImage = snowIMG
            } else if (condition === 'Clear') {
                body.style.backgroundImage = clearIMG
            } else if (condition === 'Clouds') {
                body.style.backgroundImage = cloudIMG
            } else if (condition === 'Mist') {
                body.style.backgroundImage = mistIMG
            } else if (condition === 'Smoke') {
                body.style.backgroundImage = smokeIMG
            } else if (condition === 'Haze') {
                body.style.backgroundImage = hazeIMG
            } else if (condition === 'Dust') {
                body.style.backgroundImage = dustIMG
            } else if (condition === 'Fog') {
                body.style.backgroundImage = fogIMG
            }
        })
         .catch(err => console.log(err))
}

weatherBtn.addEventListener('click',getCoordinates)

//--------------------------adding a note--------------------------
let noteForm = document.querySelector('.enter-note')

function addNote(evt) {
    evt.preventDefault()

    let input = document.querySelector('.new-note')
    let span = document.createElement('span')
    let ul = document.querySelector('ul')
    let list = document.createElement('li')
    span.textContent = input.value
    list.appendChild(span)
    ul.appendChild(list)
    
    var deleteBtn = document.createElement('button')
    deleteBtn.className += "delete-button";
    deleteBtn.style.width = '20px';
    deleteBtn.style.height = '20px';
    deleteBtn.style.borderRadius = '50%';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.color = 'white';
    deleteBtn.style.backgroundColor = 'black';
    
    deleteBtn.addEventListener('click', deleteNote)
    list.appendChild(deleteBtn)
    deleteBtn.textContent = 'x'

    input.value = ''
}

noteForm.addEventListener('submit',addNote)

//--------------------------delete note--------------------------

function deleteNote(event) {
    event.target.parentNode.remove()
}

//--------------------------background image--------------------------