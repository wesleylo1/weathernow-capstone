const axios = require('axios')
const favorites = require('./db.json')
let { API_KEY } = process.env
let baseURL = 'http://api.openweathermap.org'
let idCounter = 3



module.exports = {
    defaultWeather: (req,res) => {
        axios(`${baseURL}/data/2.5/weather?lat=32.7762719&lon=-96.7968559&units=imperial&appid=${API_KEY}`)
         .then(response => {
             let tempArray = [
                response.data.name,
                response.data.main.temp,
                response.data.main.temp_min,
                response.data.main.temp_max,
                response.data.weather[0].main
            ]
            res.send(tempArray)
        })
    },

    getWeather: (req, res) => {
        let { cityName,stateName } = req.query
        axios
            .get(`${baseURL}/geo/1.0/direct?q=${cityName},${stateName},US&limit=1&appid=${API_KEY}`)
            .then(response => {
                let lat = response.data[0].lat
                let lon = response.data[0].lon
                axios.get(`${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
                     .then(responses => {
                         let tempArray = [
                             responses.data.name,
                             responses.data.main.temp,
                             responses.data.main.temp_min,
                             responses.data.main.temp_max,
                             responses.data.weather[0].main
                         ]
                         res.send(tempArray)
                     })
            })
    },

    getFavorites: (req,res) => {
        res.status(200).send(favorites)
    },

    addFavorite: (req,res) => {
        let { id, city, state } = req.body
        let newFavorite = {
            id: idCounter,
            city: city,
            state: state
        }
        favorites.push(newFavorite)
        res.status(200).send(favorites)
        idCounter++
    }
}