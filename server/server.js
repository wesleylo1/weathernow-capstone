require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
let { defaultWeather, getWeather } = require('./controller')
let { SERVER_PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
    a
})

// Dallas weather default

app.get(`/api/coordinates`, defaultWeather)

// User choice weather

app.get('/api/weather', getWeather)













const port = process.env.PORT || SERVER_PORT
app.listen(port,() => console.log(`Server running on port ${port}`))
