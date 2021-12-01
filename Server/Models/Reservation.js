const mongoose = require("mongoose");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("./User");
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({

  name: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  }
});

const reservationSchema = new Schema(
  //user , 2 flights, info (either array of objects or 1 object), 2 arrays seats (arrival, departure), total price, cabin
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    departureFlight: {
      type: mongoose.Schema.ObjectId,
      ref: "Flight",
      required: true,
    },

    arrivalFlight: {
      type: mongoose.Schema.ObjectId,
      ref: "Flight",
      required: true,
    },

    userInfo: {
      type: [userInfoSchema],
      required: true,
    },

    departureSeats: {
      type: [Number],
    },

    arrivalSeats: {
      type: [Number],
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    cabin: {
      type: String,
      enum: ["Economy", "Business", "First"],
    },
  },
  { timestamps: true }
);

/*reservationSchema.post("save",(async(next) =>{
  user = await User.findById(this.user);
  console.log(this.user);
  if(!user){
    return next(new ErrorResponse(`No user with this ${this.user} ID so the reservation could not be done`, 404));
  }
  else{
    this.userInfo.name = user.name;
    this.userInfo.dateOfBirth = user.dateOfBirth;
    this.userInfo.gender = user.gender;
  }
  next();
}));*/

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
