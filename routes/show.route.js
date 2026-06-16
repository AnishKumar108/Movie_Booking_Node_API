const showController = require("../controllers/show.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const showMiddleware = require("../middlewares/show.middleware")

const route = (app) => {
    app.post("/mba/api/v1/show",authMiddleware.isAuthenticated,authMiddleware.isAdminOrClient,showMiddleware.validCreateShowRequest,showController.create);

    app.get("/mba/api/v1/shows",showController.getShows)
}

module.exports = route