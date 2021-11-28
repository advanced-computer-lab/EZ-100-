const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ErrorResponse = require("../utils/ErrorResponse");


const flightSchema = new Schema(
  //baggage allowance, 3 prices , array of seats (Taken or not taken)
  {
    flightNumber: {
      type: String,
      unique: true
    },
    from: {
      type: String,
      required: [true, "A flight must have a [From] field"],
    },
    to: {
      type: String,
      required: [true, "A flight must have a [To] field"],
    },
    departureDate: {
      type: Date,
      required: [true, "A flight must have a [DepartureDate] field"],
    },
    arrivalDate: {
      type: Date,
    },
    economySeats: {
      type: Number,
      default: 80,
    },
    economyPrice: {
      type: Number,
      default: 80,
    },
    businessSeats: {
      type: Number,
      default: 15,
    },
    businessPrice: {
      type: Number,
      default: 100,
    },
    firstSeats: {
      type: Number,
      default: 5,
    },
    firstPrice: {
      type: Number,
      default: 150,
    },
    terminalNumber: {
      type: Number,
      default: 3,
    },
    baggageAllowance: {
      type: Number, 
      default: 10
    },
    seatsAvailable: {
      type: [Boolean],
    }
  },
  { timestamps: true }
);

flightSchema.pre("save", function (next) {
  if(this.ArrivalDate < this.DepartureDate){
    return next(new ErrorResponse("Arrival Date is before Departure Date", 400));
  }
  next();
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
