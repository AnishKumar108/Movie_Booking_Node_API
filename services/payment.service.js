const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const User = require("../models/user.model")
const {STATUS,BOOKING_STATUS,PAYMENT_STATUS, USER_ROLE} = require("../utils/constants");
const { successResponseBody } = require("../utils/responseBody");

const createPayment =  async(data) => {
    try{
        const booking = await Booking.findById(data.bookingId)
        if(!booking){
            throw {err:"No booking found for the given bookng id",code:STATUS.BAD_REQUEST}
        }
        if(booking.status === BOOKING_STATUS.successfull){
            throw{
                err:"Booking is already successfull , cannot create booking against it",code :STATUS.FORBIDDEN
            }
        }

        const bookingTime = booking.createdAt;
        const currentTime = Date.now();

        const minutes = Math.floor(((currentTime-bookingTime)/1000)/60);

        if(minutes > 5){
            booking.status = BOOKING_STATUS.expired;
            await booking.save();
            return booking
        }

        let payment = await Payment.create(data);
        if(payment.amount !==  booking.totalCost){
            payment.status == PAYMENT_STATUS.failed
        }
        if(!payment || payment.status == PAYMENT_STATUS.failed ){
            booking.status = BOOKING_STATUS.failed;
            await booking.save();
            await payment.save();
            return booking;
        }

        booking.status = BOOKING_STATUS.successfull;
        payment.status = PAYMENT_STATUS.successfull
        await booking.save();
        await payment.save();
        return booking;
    }
    catch(error){
        throw error
    }
}

const getPaymentById = async(id) => {
    try{
        const response =  await Payment.findById(id).populate("bookingId");
        if(!response){
            throw {err:"No payment record found for given payment id",code:STATUS.NOT_FOUND}
        }
        return response
    }
    catch(error){
        console.log(error);
        throw error
    }
}

const getAllPayments = async(userId) => {
    try{
        let user = await User.findById(userId);
        let filter = {}
        if(user.userRole !== USER_ROLE.admin){
            filter.userId = user.id
        }
        const bookings = await Booking.find(filter,{_id:1});
        
        const payment = await Payment.find({bookingId:{$in: bookings}});
        
        return payment;
    }
    catch(error){
        console.log(error)
        throw error;
    }
}

module.exports = {createPayment,getPaymentById,getAllPayments}
