const {errorResponseBody} = require("../utils/responseBody")
const jwt = require("jsonwebtoken")
const authService = require("../services/auth.service");
const {STATUS} = require("../utils/constants")

const checkSignupRequest = async(req,res,next) => {
    if(!req.body.name){
        errorResponseBody.error = "Name field is not present in req body";
        return res.status(400).json(errorResponseBody)
    }
    if(!req.body.email){
        errorResponseBody.error = "Email field is not present in req body";
        return res.status(400).json(errorResponseBody)
    }
    if(!req.body.password){
        errorResponseBody.error = "Password field is not present in req body";
        return res.status(400).json(errorResponseBody)
    }

    next()
}

const checkSignInRequest = async(req,res,next) => {
    if(!req.body.email){
        errorResponseBody.error = "No email provided in request body"
        return res.status(400).json(errorResponseBody)
    }
    if(!req.body.password){
        errorResponseBody.error = "No password provided in request body"
        return res.status(400).json(errorResponseBody)
    }
    next()
}

const isAuthenticated = async(req,res,next) => {
    try{
        const token = req.headers["x-access-token"];
        if(!token){
            errorResponseBody.error = "No token provided";
            return res.status(STATUS.FORBIDDEN).json(errorResponseBody)
        }
        const response = jwt.verify(token,process.env.AUTH_KEY);
        if(!response){
            errorResponseBody.error = "Token not verified";
            return res.status(STATUS.UNAUTHORISED).json(errorResponseBody)
        }
        const user = await authService.getuserbyId(response.id);
        req.user = user.id;
        next()


    }
    catch(error){
        if(error.name == "JsonWebTokenError"){
            errorResponseBody.error = error.message;
            return res.status(STATUS.UNAUTHORISED).json(errorResponseBody)
        }
        if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        console.log(error);
        errorResponseBody.error = error
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const validateResetPasswordRequest = (req,res,next) => {
    if(!req.body.oldPassword){
        errorResponseBody.error = "No old password given in user request";
        return res.status(400).json(errorResponseBody)
    }
    if(!req.body.newPassword){
        errorResponseBody.error = "No new password given in user request";
        return res.status(400).json(errorResponseBody)
    }
    next()
}

const isAdmin = async(req,res,next) => {
    const user = await authService.getuserbyId(req.user);
    if(user.userRole !== "ADMIN"){
        errorResponseBody.error = "Invalid userRole, only admin is allowed";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody)
    }
    next()

}

const isClient = async(req,res,next) => {
    const user = await authService.getuserbyId(req.user);
    if(user.userRole !== "CLIENT"){
        errorResponseBody.error = "Invalid userRole, only client is allowed";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody)
    }
    next()
}

const isAdminOrClient = async (req,res,next) => {
    const user = await authService.getuserbyId(req.user);
    if(user.userRole !== "ADMIN" && user.userRole !== "CLIENT"){
        errorResponseBody.error = "Invalid userRole, only client or admin is allowed";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody)
    }
    next();
}



module.exports = {checkSignupRequest,checkSignInRequest,isAuthenticated,validateResetPasswordRequest,isAdmin,isClient,isAdminOrClient};