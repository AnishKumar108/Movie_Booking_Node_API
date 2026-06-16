const {errorResponseBody} = require("../utils/responseBody");
const {STATUS,USER_ROLE,BOOKING_STATUS} = require("../utils/constants");
const ObjectId = require("mongoose").Types.ObjectId;
const theatreService = require("../services/theatre.service")
const userService = require("../services/auth.service")

const validateCreateBookingRequest = async(req,res,next) => {
    if(!req.body.theatreId){
        errorResponseBody.error = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    };
     
    //Check the format of theatre id
    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.error = "Invalid theatre id given";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    const theatre = await theatreService.getTheatre(req.body.theatreId)

    if(!theatre){
        errorResponseBody.error = "No theatre found for given id";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody)
    }

    if(!req.body.movieId){
        errorResponseBody.error = "No movie id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.error = "Invalid movie id given";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(theatre.movies.indexOf(req.body.movieId) == -1){
        errorResponseBody.error = "Given movie is not present in the theatre";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody)
    }

    if(!req.body.timings){
        errorResponseBody.error = "No timing provided for booking";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!req.body.noOfSeats){
        errorResponseBody.error = "No. of seats is not provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }
    
    next()

}

const checkChangeStatusRequest = async(req,res,next) => {
    const user = await userService.getuserbyId(req.user);

    if(user.userRole === USER_ROLE.customer  && req.body.status && req.body.status !== BOOKING_STATUS.cancelled ){
        errorResponseBody.error = "You are not allowed to change the booking status"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next()

}

module.exports = {validateCreateBookingRequest,checkChangeStatusRequest}