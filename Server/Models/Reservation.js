const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userInfoSchema = new Schema(
    {
        title: {
            type: String, 
            enum: ["Mr" , "Ms", "Mrs"]
        },

        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        dateOfBirth: {
            type: Date,
            required: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true
        }
    }
  )

const reservationSchema = new Schema(
    //user , 2 flights, info (either array of objects or 1 object), 2 arrays seats (arrival, departure), total price, cabin 
    {
      user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true
      },

      departureFlight: {
          type: mongoose.Schema.ObjectId,
          ref: 'Flight',
          required: true
      },

      arrivalFlight: {
        type: mongoose.Schema.ObjectId,
        ref: 'Flight',
        required: true
      },

      userInfo: {
          type: [userInfoSchema],
          required: true
      },

      departureSeats: {
          type: [Number]
      },

      arrivalSeats: {
          type: [Number]
      },

      totalPrice: {
          type: Number,
          default: 0
      },

      cabin: {
          type: String,
          enum: ["Economy" , "Business", "First"]
      }


    },
    { timestamps: true }
  );

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
