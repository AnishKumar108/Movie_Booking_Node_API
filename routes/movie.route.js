const movieController = require("../controllers/movie.controller")
const movieMiddleware = require("../middlewares/movie.middleware")

const route = (app) => {
    app.post("/mba/api/v1/movies" ,movieMiddleware.checkCreateMovieRequest, movieController.createMovie)
    app.delete("/mba/api/v1/movies/:movieId" , movieController.deleteMovie)
}

module.exports = route