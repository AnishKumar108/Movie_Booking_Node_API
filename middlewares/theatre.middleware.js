const {errorResponseBody}  = require("../utils/responseBody");
const {STATUS} = require("../utils/constants")

const checkCreateTheatreRequest = async(req,res,next) => {
        if(!req.body.name){
            errorResponseBody.error = "Bad Request Error"
            errorResponseBody.message = "Name parameter is not present in req body"
            return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
        }
        if(!req.body.address){
            errorResponseBody.error = "Bad Request Error"
            errorResponseBody.message = "Address parameter is not present in req body"
            return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
        }
        if(!req.body.city){
            errorResponseBody.error = "Bad Request Error"
            errorResponseBody.message = "City parameter is not present in req body"
            return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
        }
        if(!req.body.pincode){
            errorResponseBody.error = "Bad Request Error"
            errorResponseBody.message = "pincode parameter is not present in req body"
            return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
        }

        next()
}

const checkUpdateMoviesRequest = async(req,res,next) => {
    if(req.body.insert === undefined){
        errorResponseBody.error = "Insert in not present in request body"
        return res.status(400).json(errorResponseBody)
    }

    if(!req.body.movieIds){
        errorResponseBody.error = "movieIds in not present in request body"
        return res.status(400).json(errorResponseBody)

    }

    if(!(req.body.movieIds instanceof Array)){
        errorResponseBody.error = "movieIds in not an array"
        return res.status(400).json(errorResponseBody)
        
    }
    if(req.body.movieIds.length === 0){
        errorResponseBody.error = "there should be some movie id in array"
        return res.status(400).json(errorResponseBody)
        
    }

    next()
}

module.exports = {checkCreateTheatreRequest,checkUpdateMoviesRequest}