require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
let { defaultWeather, getWeather, getFavorites, addFavorite, deleteFavorite, favoriteWeather } = require('./controller')
let { SERVER_PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Dallas weather default

app.get(`/api/coordinates`, defaultWeather)

// User choice weather

app.get('/api/weather', getWeather)

// display favorites on default

app.get('/favorites', getFavorites)

// submit new favorite

app.post('/favorites', addFavorite)

// delete favorite

app.delete('/favorites/:id', deleteFavorite)

// info on favorite city

app.get('/favorites/weather', favoriteWeather)





const port = process.env.PORT
app.listen(port,() => console.log(`Server running on port ${port}`))
