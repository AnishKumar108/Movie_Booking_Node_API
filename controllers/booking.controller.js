const {successResponseBody,errorResponseBody} = require("../utils/responseBody");
const {STATUS} = require("../utils/constants");
const bookingService = require("../services/booking.service")

const create = async(req,res) => {
    try{
        const userId = req.user
        const response = await bookingService.createBooking({...req.body,userId});
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the booking";
        return res.status(STATUS.CREATED).json(successResponseBody)

    }
    catch(error){
        if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        };
        errorResponseBody.error = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const update = async(req,res) => {
    try{
        const response = await bookingService.updateBooking(req.body,req.params.id);
        successResponseBody.data  = response;
        successResponseBody.message = "Successfully updated the given booking";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const Bookings = async(req,res) => {
    try{
        const response = await bookingService.getBookings({userId:req.user});
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the bookings of logged in user";
        return res.status(STATUS.OK).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const allBookings = async(req,res) => {
    try{
        const response = await bookingService.getAllBookings();
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the bookings";
        return res.status(STATUS.OK).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}
module.exports = {create,update,Bookings,allBookings}