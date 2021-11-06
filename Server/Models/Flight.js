const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    FlightNumber: {
      type: String,
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
    BusinessSeats: {
      type: Number,
      default: 15,
    },
    FirstSeats: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

/*flightSchema.pre("save", function (next) {
  this.FlightNumber = this.FlightNumber
    ? this.FlightNumber
    : "EZ " + Math.floor(Math.random() * 10000);

  this.ArrivalDate = this.ArrivalDate ? this.arrivalDate : this.DepartureDate;
  next();
});*/

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
