const authController = require("../controllers/auth.controller");
const {checkSignupRequest,checkSignInRequest,isAuthenticated} = require("../middlewares/auth.middleware")


const route = (app) => {
    app.post("/mba/api/v1/auth/signup",checkSignupRequest,authController.signUp);
    app.post("/mba/api/v1/auth/signin",checkSignInRequest,authController.signIn);
    app.patch("/mba/api/v1/auth/reset",isAuthenticated,authController.resetPassword);
    
}

 

module.exports = route