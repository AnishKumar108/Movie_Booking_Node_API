const {errorResponseBody} = require("../utils/responseBody")

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

module.exports = {checkSignupRequest,checkSignInRequest}