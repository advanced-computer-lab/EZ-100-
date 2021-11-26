const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
      user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true
      },

      flight: {
          type: mongoose.Schema.ObjectId,
          ref: 'Flight',
          required: true
      },

      economySeats: {
          type: Number
      },

      businessSeats: {
        type: Number
    },

      firstSeats: {
          type: Number
      },
    },
    { timestamps: true }
  );

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
