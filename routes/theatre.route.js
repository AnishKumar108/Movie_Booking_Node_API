const {checkCreateTheatreRequest,checkUpdateMoviesRequest} = require("../middlewares/theatre.middleware")
const theatreController = require("../controllers/theatre.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const routes = (app) => {
    app.post("/mba/api/v1/theatres",checkCreateTheatreRequest,theatreController.create);
    app.delete("/mba/api/v1/theatres/:id",authMiddleware.isAuthenticated,theatreController.destroy);
    app.get("/mba/api/v1/theatres/:id",theatreController.getTheatre);
    app.get("/mba/api/v1/theatres",theatreController.getTheatres)
    app.patch("/mba/api/v1/theatres/:id",theatreController.update)
    app.put("/mba/api/v1/theatres/:id",theatreController.update)
    app.patch("/mba/api/v1/theatres/:id/movies" ,checkUpdateMoviesRequest, theatreController.updateMoviesInTheatre)
    app.get("/mba/api/v1/theatres/:id/movies",theatreController.getMovies)
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",theatreController.checkMovie)
}

module.exports = routes