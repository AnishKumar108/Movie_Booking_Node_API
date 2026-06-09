const userService = require("../services/auth.service");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody");
const jwt = require("jsonwebtoken")


const signUp = async(req,res) => {
    try{
        const response = await userService.createUser(req.body);
        successResponseBody.data = response
        successResponseBody.message = "Successfully created a new User";
        return res.status(201).json(successResponseBody)
    }
    catch(error){
        if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        return res.status(500).json(errorResponseBody)
    }
}

const signIn = async(req,res) => {
    try{
        const user = await userService.getUserByEmail(req.body.email)
        const isValidPassword = await user.isValidPassword(req.body.password);
        if(!isValidPassword){
            throw {err:"Invalid Passoword,Please enter your password again",code:401}
        }
        successResponseBody.message = "Successfully Logged In";
        
        const token = jwt.sign({id:user._id,email:user.email},process.env.AUTH_KEY,{expiresIn:"1h"})

        console.log(jwt.verify(token,process.env.AUTH_KEY))
        successResponseBody.data = {
            email:user.email,
            Role:user.userRole,
            status:user.userStatus,
            token
        }
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        return res.status(500).json(errorResponseBody)
    }
}


module.exports = {signUp,signIn}