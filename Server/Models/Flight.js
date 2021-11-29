const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ErrorResponse = require("../utils/ErrorResponse");

const flightSchema = new Schema(
  //baggage allowance, 3 prices , array of seats (Taken or not taken)
  {
    FlightNumber: {
      type: String,
      unique: true,
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
      default: 10,
    },
    EconomySeatsAvailable: {
      type: [Boolean],
      default: [],
    },
    BusinessSeatsAvailable: {
      type: [Boolean],
      default: [],
    },
    FirstSeatsAvailable: {
      type: [Boolean],
      default: [],
    },
  },
  { timestamps: true }
);

flightSchema.pre("save", function (next) {
  if (this.ArrivalDate < this.DepartureDate) {
    return next(
      new ErrorResponse("Arrival Date is before Departure Date", 400)
    );
  }

  if (this.SeatsAvailable.length === 0) {
    const length = this.FirstSeats + this.BusinessSeats + this.EconomySeats;
    let seats = [];

    for (let i = 0; i < length; i++) {
      seats.push(false);
    }

    this.SeatsAvailable = seats;
  }

  for (let i = 0; i < this.EconomySeats; i++) {
    this.EconomySeatsAvailable[i] = false;
  }

  for (let i = 0; i < this.BusinessSeats; i++) {
    this.BusinessSeatsAvailable[i] = false;
  }

  for (let i = 0; i < this.FirstSeats; i++) {
    this.FirstSeatsAvailable[i] = false;
  }
  next();
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
