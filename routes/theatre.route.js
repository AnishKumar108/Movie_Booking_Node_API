const {checkCreateTheatreRequest,checkUpdateMoviesRequest} = require("../middlewares/theatre.middleware")
const theatreController = require("../controllers/theatre.controller")

const routes = (app) => {
    app.post("/mba/api/v1/theatres",checkCreateTheatreRequest,theatreController.create);
    app.delete("/mba/api/v1/theatres/:id",theatreController.destroy);
    app.get("/mba/api/v1/theatres/:id",theatreController.getTheatre);
    app.get("/mba/api/v1/theatres",theatreController.getTheatres)
    app.patch("/mba/api/v1/theatres/:id/movies" ,checkUpdateMoviesRequest, theatreController.updateMoviesInTheatre)
}

module.exports = routes