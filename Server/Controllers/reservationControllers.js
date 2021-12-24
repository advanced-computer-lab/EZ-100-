const Reservation = require("../Models/Reservation");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const Flight = require("../Models/Flight");
const User = require("../Models/User");
const sendEmail = require("../utils/sendEmail");

exports.createReservation = asyncHandler(async (req, res) => {
  let r = {
    ...req.body,
    departureCabin: req.body.cabin,
    arrivalCabin: req.body.cabin,
  };
  const reservation = await Reservation.create(r);

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

  query = Reservation.findById(req.params.reservationId)
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
exports.emailReservation = asyncHandler(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.reservationId);
  const user = await User.findById(reservation.user);

  let message = `${reservation._id} summary ... From LAX To JFK (Round trip) .....`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Reservation ${reservation._id}`,
      text: message,
    });
    res.status(200).json({ success: true, message: "Email sent", data: null });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Email could not be send", 500));
  }

  //res.status(200).json({ success: true, data: reservation });
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

exports.editReservation = asyncHandler(async (req, res, next) => {
  const {
    newDepartureFlightId,
    newDepartureCabin,
    newDepartureSeats,
    newArrivalSeats,
    newArrivalFlightId,
    newArrivalCabin,
    newTotalPrice,
  } = req.body;

  console.log(req.body);
  var reservation = await Reservation.findById(req.params.reservationId);

  if (reservation) {
    let depSeatsCount;
    let arrSeatsCount;

    if (newDepartureSeats) {
      depSeatsCount = reservation.departureSeats.length;

      for (let i = 0; i < depSeatsCount; i++) {
        if (reservation.departureCabin === "Economy") {
          let seat = reservation.departureSeats[i];
          let up = await Flight.updateOne(
            { _id: reservation.departureFlight },
            { $set: { [`EconomySeatsAvailable.${seat}`]: false } }
          );
        } else if (reservation.departureCabin === "Business") {
          let seat = reservation.departureSeats[i];
          await Flight.updateOne(
            { _id: reservation.departureFlight },
            { $set: { [`BusinessSeatsAvailable.${seat}`]: false } }
          );
        } else if (reservation.departureCabin === "First") {
          let seat = reservation.departureSeats[i];
          await Flight.updateOne(
            { _id: reservation.departureFlight },
            { $set: { [`FirstSeatsAvailable.${seat}`]: false } }
          );
        }
      }
    }

    if (newArrivalSeats) {
      arrSeatsCount = reservation.arrivalSeats.length;

      for (let i = 0; i < arrSeatsCount; i++) {
        if (reservation.arrivalCabin === "Economy") {
          let seat = reservation.arrivalSeats[i];
          await Flight.updateOne(
            { _id: reservation.arrivalFlight },
            { $set: { [`EconomySeatsAvailable.${seat}`]: false } }
          );
          console.log(reservation.arrivalFlight);
        } else if (reservation.arrivalCabin === "Business") {
          let seat = reservation.arrivalSeats[i];
          await Flight.updateOne(
            { _id: reservation.arrivalFlight },
            { $set: { [`BusinessSeatsAvailable.${seat}`]: false } }
          );
        } else if (reservation.arrivalCabin === "First") {
          let seat = reservation.arrivalSeats[i];
          await Flight.updateOne(
            { _id: reservation.arrivalFlight },
            { $set: { [`FirstSeatsAvailable.${seat}`]: false } }
          );
        }
      }
    }

    if (newDepartureFlightId) {
      await Reservation.updateOne(
        { _id: req.params.reservationId },
        {
          $set: {
            departureFlight: newDepartureFlightId,
            departureSeats: newDepartureSeats,
            departureCabin: newDepartureCabin,
          },
        }
      );

      let newDepSeatsCount;
      newDepSeatsCount = newDepartureSeats.length;

      for (let i = 0; i < newDepSeatsCount; i++) {
        if (newDepartureCabin === "Economy") {
          let seat = newDepartureSeats[i];
          let up = await Flight.updateOne(
            { _id: newDepartureFlightId },
            { $set: { [`EconomySeatsAvailable.${seat}`]: true } }
          );
        } else if (newDepartureCabin === "Business") {
          let seat = newDepartureSeats[i];
          await Flight.updateOne(
            { _id: newDepartureFlightId },
            { $set: { [`BusinessSeatsAvailable.${seat}`]: true } }
          );
        } else if (newDepartureCabin === "First") {
          let seat = newDepartureSeats[i];
          await Flight.updateOne(
            { _id: newDepartureFlightId },
            { $set: { [`FirstSeatsAvailable.${seat}`]: true } }
          );
        }
      }
    }

    if (newArrivalFlightId) {
      let up = await Reservation.updateOne(
        { _id: req.params.reservationId },
        {
          $set: {
            arrivalFlight: newArrivalFlightId,
            arrivalSeats: newArrivalSeats,
            arrivalCabin: newArrivalCabin,
          },
        }
      );

      let newArrSeatsCount;
      newArrSeatsCount = newArrivalSeats.length;

      for (let i = 0; i < newArrSeatsCount; i++) {
        if (newArrivalCabin === "Economy") {
          let seat = newArrivalSeats[i];
          let up = await Flight.updateOne(
            { _id: newArrivalFlightId },
            { $set: { [`EconomySeatsAvailable.${seat}`]: true } }
          );
        } else if (newArrivalCabin === "Business") {
          let seat = newArrivalSeats[i];
          await Flight.updateOne(
            { _id: newArrivalFlightId },
            { $set: { [`BusinessSeatsAvailable.${seat}`]: true } }
          );
        } else if (newArrivalCabin === "First") {
          let seat = newArrivalSeats[i];
          await Flight.updateOne(
            { _id: newArrivalFlightId },
            { $set: { [`FirstSeatsAvailable.${seat}`]: true } }
          );
        }
      }
    }

    if (newTotalPrice) {
      await Reservation.updateOne(
        { _id: req.params.reservationId },
        { $set: { totalPrice: newTotalPrice } }
      );
    }

    var newRes = await Reservation.findById(req.params.reservationId);
  }
  res.status(200).json({ success: true, data: newRes });
});
