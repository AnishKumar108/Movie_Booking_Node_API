const authController = require("../controllers/auth.controller");
const {checkSignupRequest} = require("../middlewares/auth.middleware")

const route = (app) => {
    app.post("/mba/api/v1/auth/signup",checkSignupRequest,authController.signUp)
}

module.exports = route