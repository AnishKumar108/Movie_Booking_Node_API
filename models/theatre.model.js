const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
    },
    description: String,
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    movies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Movie",
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
