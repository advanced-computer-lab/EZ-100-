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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

flightSchema.pre("save", function (next) {
  if (this.ArrivalDate < this.DepartureDate) {
    return next(
      new ErrorResponse("Arrival Date is before Departure Date", 400)
    );
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

flightSchema.virtual("departureReservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "departureFlight",
  justOne: false,
});

flightSchema.virtual("returnReservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "arrivalFlight",
  justOne: false,
});

// BootcampSchema.virtual('courses', {
//   ref: 'Course', // Model
//   localField: '_id',
//   foreignField: 'bootcamp', // What field in Course is used to Join
//   justOne: false // To have all courses
// })

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
