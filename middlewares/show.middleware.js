const {STATUS} = require("../utils/constants");
const {errorResponseBody} = require("../utils/responseBody")
const ObjectId = require("mongoose").Types.ObjectId

const validCreateShowRequest = (req,res,next) => {
    if(!req.body.theatreId){
        errorResponseBody.error = "No theatre id Provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    };

    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.error = "Invalid theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!req.body.movieId){
        errorResponseBody.error = "No movieId id Provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    };

    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.error = "Invalid movie id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!req.body.timing){
        errorResponseBody.error = "No timing for show is provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!req.body.noOfSeats){
        errorResponseBody.error = "noOfSeats are not provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    };

    if(!req.body.price){
        errorResponseBody.error = "No price provied for the show";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    next()

}

const validateUpdateShowRequest = async(req,res,next) => {
    if(req.body.theatreId || req.body.movieId){
        errorResponseBody.error = "You cannot update theatre or movie of already created show";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    next();
}

module.exports = {validCreateShowRequest,validateUpdateShowRequest}