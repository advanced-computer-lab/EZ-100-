const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ErrorResponse = require("../utils/ErrorResponse");


const flightSchema = new Schema(
  //baggage allowance, 3 prices , array of seats (Taken or not taken)
  {
    FlightNumber: {
      type: String,
      unique: true
    },
    From: {
      type: String,
      required: [true, "A flight must have a [From] field"],
    },
    To: {
      type: String,
      required: [true, "A flight must have a [To] field"],
    },
    DepartureDate: {
      type: Date,
      required: [true, "A flight must have a [DepartureDate] field"],
    },
    ArrivalDate: {
      type: Date,
    },
    EconomySeats: {
      type: Number,
      default: 80,
    },
    EconomyPrice: {
      type: Number,
      default: 80,
    },
    BusinessSeats: {
      type: Number,
      default: 15,
    },
    BusinessPrice: {
      type: Number,
      default: 100,
    },
    FirstSeats: {
      type: Number,
      default: 5,
    },
    FirstPrice: {
      type: Number,
      default: 150,
    },
    TerminalNumber: {
      type: Number,
      default: 3,
    },
    BaggageAllowance: {
      type: Number, 
      default: 10
    },
    SeatsAvailable: {
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
