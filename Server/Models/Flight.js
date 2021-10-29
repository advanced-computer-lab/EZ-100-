const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FlightNumber: {
    type: String,
    required: true,
  },
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true
  },
  DepartureDate: {
    type: Date,
    required: true
  },
  ArrivalDate: {
    type: Date,
    required: true
  },
  EconomySeats: {
    type: Number,
    required: true,
  },
  BusinessSeats: {
    type: Number,
    required: true,
  },
  FirstSeats: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;