const movieController = require("../controllers/movie.controller")

const route = (app) => {
    app.post("/mba/api/v1/movies" , movieController.createMovie)
}

module.exports = route