const Booking = require("../models/booking.model")
const{STATUS} = require("../utils/constants")

const createBooking = async (data) => {
  try {
        const response = await Booking.create(data);
        return response;
    } 
  catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: 422 };
    }
    throw error;
  }
};

const updateBooking = async(data,bookingId) => {
  try{
    const response = await Booking.findByIdAndUpdate(bookingId,data,{new:true,runValidators:true});
    if(!response){
      throw {err:"No booking found with given id", code:STATUS.NOT_FOUND}
    }
    return response;
  }
  catch(error){
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
    }
    throw error
  };
}

module.exports = { createBooking,updateBooking };
