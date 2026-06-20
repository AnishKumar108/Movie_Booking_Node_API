const {errorResponseBody} = require("../utils/responseBody");
const {STATUS} = require("../utils/constants");
const ObjectId = require("mongoose").Types.ObjectId

const verifyCreatePaymentRequest = async(req,res,next) => {
    if(!req.body.bookingId){
        errorResponseBody.error = "No booking id provided,cannot proceed";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!ObjectId.isValid(req.body.bookingId)){
        errorResponseBody.error = "Invalid booking id , cannot proceed";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!req.body.amount){
        errorResponseBody.error = "Pls provide amount to be paid !!";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    };

    next()
}

module.exports = {verifyCreatePaymentRequest}