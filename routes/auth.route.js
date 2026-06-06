const authController = require("../controllers/auth.controller");

const route = (app) => {
    app.post("/mba/api/v1/auth/signup",authController.signUp)
}

module.exports = route