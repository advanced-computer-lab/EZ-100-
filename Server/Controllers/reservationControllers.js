const Reservation = require("../Models/Reservation");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const Flight = require("../Models/Flight");
const User = require("../Models/User");
const sendEmail = require("../utils/sendEmail");

exports.createReservation = asyncHandler(async (req, res) => {
  let r = req.body;
  const reservation = await Reservation.create(req.body);

  if (reservation) {
    let depSeatsCount;
    let arrSeatsCount;

    depSeatsCount = req.body.departureSeats.length;
    arrSeatsCount = req.body.arrivalSeats.length;

    for (let i = 0; i < depSeatsCount; i++) {
      if (req.body.cabin === "Economy") {
        let seat = req.body.departureSeats[i];
        let up = await Flight.updateOne(
          { _id: req.body.departureFlight },
          { $set: { [`EconomySeatsAvailable.${seat}`]: true } }
        );
      } else if (req.body.cabin === "Business") {
        let seat = req.body.departureSeats[i];
        await Flight.updateOne(
          { _id: req.body.departureFlight },
          { $set: { [`BusinessSeatsAvailable.${seat}`]: true } }
        );
      } else if (req.body.cabin === "First") {
        let seat = req.body.departureSeats[i];
        await Flight.updateOne(
          { _id: req.body.departureFlight },
          { $set: { [`FirstSeatsAvailable.${seat}`]: true } }
        );
      }
    }

    for (let i = 0; i < arrSeatsCount; i++) {
      if (req.body.cabin === "Economy") {
        let seat = req.body.arrivalSeats[i];
        await Flight.updateOne(
          { _id: req.body.arrivalFlight },
          { $set: { [`EconomySeatsAvailable.${seat}`]: true } }
        );
        console.log(req.body.arrivalFlight);
      } else if (req.body.cabin === "Business") {
        let seat = req.body.arrivalSeats[i];
        await Flight.updateOne(
          { _id: req.body.arrivalFlight },
          { $set: { [`BusinessSeatsAvailable.${seat}`]: true } }
        );
      } else if (req.body.cabin === "First") {
        let seat = req.body.arrivalSeats[i];
        await Flight.updateOne(
          { _id: req.body.arrivalFlight },
          { $set: { [`FirstSeatsAvailable.${seat}`]: true } }
        );
      }
    }
  }
  res.status(201).json({ success: true, data: reservation });
});

exports.getReservations = asyncHandler(async (req, res, next) => {
  const reservation = await Reservation.find({ user: req.params.id })
    .sort({ createdAt: -1 })
    .populate({
      path: "departureFlight",
    })
    .populate({
      path: "arrivalFlight",
    });

  if (!reservation) {
    return next(new ErrorResponse("No reservation with that Id", 404));
  }

  res.status(200).json({ success: true, data: reservation });
});

exports.viewReservation = asyncHandler(async (req, res, next) => {
  let query;

  query = Reservation.find(req.params.reservationId)
    .populate({
      path: "departureFlight",
      select: "FlightNumber DepartureDate ArrivalDate TerminalNumber",
    })
    .populate({
      path: "arrivalFlight",
      select: "FlightNumber DepartureDate ArrivalDate TerminalNumber",
    });

  const reservation = await query;

  if (!reservation)
    return next(
      new ErrorResponse(
        `no reservations with this ${req.params.reservationId} ID`,
        404
      )
    );

  res.status(200).json({ success: true, data: reservation });
});

exports.deleteReservation = asyncHandler(async (req, res, next) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);

  if (reservation) {
    let depSeatsCount;
    let arrSeatsCount;

    depSeatsCount = reservation.departureSeats.length;
    arrSeatsCount = reservation.arrivalSeats.length;

    for (let i = 0; i < depSeatsCount; i++) {
      if (reservation.cabin === "Economy") {
        let seat = reservation.departureSeats[i];
        let up = await Flight.updateOne(
          { _id: reservation.departureFlight },
          { $set: { [`EconomySeatsAvailable.${seat}`]: false } }
        );
      } else if (reservation.cabin === "Business") {
        let seat = reservation.departureSeats[i];
        await Flight.updateOne(
          { _id: reservation.departureFlight },
          { $set: { [`BusinessSeatsAvailable.${seat}`]: false } }
        );
      } else if (reservation.cabin === "First") {
        let seat = reservation.departureSeats[i];
        await Flight.updateOne(
          { _id: reservation.departureFlight },
          { $set: { [`FirstSeatsAvailable.${seat}`]: false } }
        );
      }
    }

    for (let i = 0; i < arrSeatsCount; i++) {
      if (reservation.cabin === "Economy") {
        let seat = reservation.arrivalSeats[i];
        await Flight.updateOne(
          { _id: reservation.arrivalFlight },
          { $set: { [`EconomySeatsAvailable.${seat}`]: false } }
        );
        console.log(reservation.arrivalFlight);
      } else if (reservation.cabin === "Business") {
        let seat = reservation.arrivalSeats[i];
        await Flight.updateOne(
          { _id: reservation.arrivalFlight },
          { $set: { [`BusinessSeatsAvailable.${seat}`]: false } }
        );
      } else if (reservation.cabin === "First") {
        let seat = reservation.arrivalSeats[i];
        await Flight.updateOne(
          { _id: reservation.arrivalFlight },
          { $set: { [`FirstSeatsAvailable.${seat}`]: false } }
        );
      }
    }
  }

  const user = await User.findById(reservation.user);

  let message = `This email to confirm that u have cancelled your reservation with a 
    reservation number: ${reservation._id} and your account will be 
    debited with an amount of ${reservation.totalPrice} `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Reservation ${reservation._id} cancellation`,
      text: message,
    });
    res.status(200).json({ success: true, message: "Email sent", data: null });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Email could not be send", 500));
  }
});
