const authController = require("../controllers/auth.controller");
const {checkSignupRequest} = require("../middlewares/auth.middleware")

const route = (app) => {
    app.post("/mba/api/v1/auth/signup",checkSignupRequest,authController.signUp);
    app.post("/mba/api/v1/auth/signin",authController.signIn)
}

 

module.exports = route