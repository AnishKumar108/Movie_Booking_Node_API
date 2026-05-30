const movieController = require("../controllers/movie.controller")

const route = (app) => {
    app.post("/mba/api/v1/movies" , movieController.createMovie)
    app.delete("/mba/api/v1/movies/:movieId" , movieController.deleteMovie)
}

module.exports = route