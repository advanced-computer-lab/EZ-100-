const Reservation = require("../Models/Reservation");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const Flight = require("../Models/Flight");

exports.createReservation = asyncHandler(async (req,res) =>{
    const reservation = await Reservation.create(req.body);

    if(reservation){
        let depSeatsCount;
        let arrSeatsCount;
        
        depSeatsCount = req.body.departureSeats.length;
        arrSeatsCount = req.body.arrivalSeats.length;

        const depFlight = await Flight.findById(req.body.departueFlight);
        const arrFlight = await Flight.findById(req.body.arrivalFlight);


        

    }
    res.status(201).json({ success: true, data: reservation });
});

exports.viewReservation = asyncHandler(async (req,res,next) => {
    let query;

    query = Reservation.findById(req.params.reservationId).populate({
        path: 'departueFlight', 
        select: 'flightNumber departureDate arrivalDate terminalNumber'
    }).populate({
        path: 'arrivalFlight',
        select: 'flightNumber departureDate arrivalDate terminalNumber'
    });

    const reservation = await query;

    if(! reservation)
        return next(new ErrorResponse('no reservations with this ${req.params.reservationId} ID', 404))
        
    res.status(200).json({ success: true, data: reservation });
});