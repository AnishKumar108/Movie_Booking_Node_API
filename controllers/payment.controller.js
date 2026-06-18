const paymentService = require("../services/payment.service");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody");
const {STATUS,BOOKING_STATUS} = require("../utils/constants");

const create = async(req,res) => {
    try{
        const response = await paymentService.createPayment(req.body);
        if(response.status === BOOKING_STATUS.expired){
            errorResponseBody.error = "Payment take more than 5 minutes to complete,hence could not proceed , please try again";
            return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
        }
        if(response.status === BOOKING_STATUS.cancelled){
            errorResponseBody.error = "payment couldn't be done due to some internal issue , please try again";
            return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully completed the payment";
        return res.status(STATUS.OK).json(successResponseBody)

        
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

const getPaymentDetailsById = async(req,res) => {
    try{
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully get the payment details";
        return res.status(STATUS.OK).json(successResponseBody)
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

const getAllPayments = async(req,res) => {
    try{
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all payment details";
        return res.status(STATUS.OK).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}



module.exports = {create,getPaymentDetailsById,getAllPayments}