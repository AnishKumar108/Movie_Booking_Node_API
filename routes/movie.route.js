const movieController = require("../controllers/movie.controller")
const movieMiddleware = require("../middlewares/movie.middleware")

const route = (app) => {
    app.post("/mba/api/v1/movies" ,movieMiddleware.checkCreateMovieRequest, movieController.createMovie)

    app.delete("/mba/api/v1/movies/:movieId" , movieController.deleteMovie)

    app.get("/mba/api/v1/movies/:id" , movieController.getMovieById)

    app.put("/mba/api/v1/movies/:id", movieController.updateMovie)

    app.patch("/mba/api/v1/movies/:id", movieController.updateMovie)

    app.get("/mba/api/v1/movies",movieController.getMovies)

}

module.exports = route