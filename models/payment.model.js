const mongoose = require("mongoose");
const {PAYMENT_STATUS} = require("../utils/constants")

const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:[PAYMENT_STATUS.pending,PAYMENT_STATUS.failed,PAYMENT_STATUS.successfull]
        },
        default:PAYMENT_STATUS.pending
    }
},{timestamps:true});

const payment = mongoose.model("payment",paymentSchema);

module.exports = payment;