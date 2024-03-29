const axios = require("axios");
const favorites = require("./db.json");
const cityState = require("./cityStateDB.json");
let { API_KEY } = process.env;
let baseURL = "http://api.openweathermap.org";
let idCounter = 2;

module.exports = {
    defaultWeather: (req, res) => {
        axios(
            `${baseURL}/data/2.5/weather?lat=32.7762719&lon=-96.7968559&units=imperial&appid=${API_KEY}`
        ).then((response) => {
            let tempArray = [
                response.data.name,
                response.data.main.temp,
                response.data.main.temp_min,
                response.data.main.temp_max,
                response.data.weather[0].main
            ];
            res.send(tempArray);
        });
    },

    getWeather: (req, res) => {
        let { cityName, stateName } = req.query;

        for (let i = 0; i < cityState.length; i++) {
            if (
                cityName === cityState[i].nameCity &&
                stateName === cityState[i].stateId
            ) {
                axios
                    .get(
                        `${baseURL}/geo/1.0/direct?q=${cityName},${stateName},US&limit=1&appid=${API_KEY}`
                    )
                    .then((response) => {
                        let lat = response.data[0].lat;
                        let lon = response.data[0].lon;
                        axios
                            .get(
                                `${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
                            )
                            .then((responses) => {
                                let tempArray = [
                                    responses.data.name,
                                    responses.data.main.temp,
                                    responses.data.main.temp_min,
                                    responses.data.main.temp_max,
                                    responses.data.weather[0].main
                                ];
                                res.send(tempArray);
                                return;
                            });
                        return;
                    });
                return;
            }
        }
        res.status(400).send(
            "delete favorite, and enter correct city and state id"
        );
    },

    getFavorites: (req, res) => {
        res.status(200).send(favorites);
    },

    addFavorite: (req, res) => {
        let { id, city, state } = req.body;

        let addingFavorite = () => {
            let newFavorite = {
                id: idCounter,
                city: city,
                state: state
            };
            favorites.push(newFavorite);
            res.status(200).send(favorites);
            idCounter++;
            return;
        };

        for (let i = 0; i < cityState.length; i++) {
            if (
                city === cityState[i].nameCity &&
                state === cityState[i].stateId
            ) {
                addingFavorite();
            }
        }
        res.status(400).send(
            "delete favorite, and enter correct city and state id"
        );
    },

    deleteFavorite: (req, res) => {
        let { id } = req.params;
        let index = favorites.findIndex((favorite) => +favorite.id === +id);
        favorites.splice(index, 1);
        res.status(200).send(favorites);
    },

    favoriteWeather: (req, res) => {
        let { cityName, stateName } = req.query;

        for (let i = 0; i < cityState.length; i++) {
            if (
                cityName === cityState[i].nameCity &&
                stateName === cityState[i].stateId
            ) {
                axios
                    .get(
                        `${baseURL}/geo/1.0/direct?q=${cityName},${stateName},US&limit=1&appid=${API_KEY}`
                    )
                    .then((response) => {
                        let lat = response.data[0].lat;
                        let lon = response.data[0].lon;
                        axios
                            .get(
                                `${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
                            )
                            .then((responses) => {
                                let tempArray = [
                                    responses.data.name,
                                    responses.data.weather[0].description,
                                    responses.data.main.temp,
                                    responses.data.main.feels_like,
                                    responses.data.main.temp_min,
                                    responses.data.main.temp_max,
                                    responses.data.main.humidity,
                                    responses.data.weather[0].main
                                ];
                                res.status(200).send(tempArray);
                                return;
                            });
                        return;
                    });
                return;
            }
        }
        res.status(400).send(
            "delete favorite, and enter correct city and state id"
        );
    }
};
