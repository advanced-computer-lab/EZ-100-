const Reservation = require("../Models/Reservation");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const Flight = require("../Models/Flight");


exports.createReservation = asyncHandler(async (req,res) =>{
    let r = req.body;
    const reservation = await Reservation.create(req.body);

    if(reservation){
        let depSeatsCount;
        let arrSeatsCount;

        depSeatsCount = req.body.departureSeats.length;
        arrSeatsCount = req.body.arrivalSeats.length;

        for (let i = 0; i < depSeatsCount; i++) {
            if (req.body.cabin === "Economy"){
                let seat = req.body.departureSeats[i];
                let up = await Flight.updateOne(
                    {id : req.body.departureFlight},
                     {$set:  {[`EconomySeatsAvailable.${seat}`]  : true}});
                //let f = await Flight.findOne({ id : req.body.departureFlight});
                console.log(up);
                }
                
            else if (req.body.cabin === "Business"){
                let seat = req.body.departureSeats[i];
                await Flight.updateOne(
                    {id : req.body.departureFlight},
                        {$set:  {[`BusinessSeatsAvailable.${seat}`]  : true}});
                }
            else if (req.body.cabin === "First"){
                let seat = req.body.departureSeats[i];
                await Flight.updateOne(
                    {id : req.body.departureFlight},
                        {$set:  {[`FirstSeatsAvailable.${seat}`]  : true}});
                }  
        }

        for (let i = 0; i < arrSeatsCount; i++) {
            if (req.body.cabin === "Economy"){
                let seat = req.body.arrivalSeats[i];
                let up = await Flight.updateOne(
                    {id : req.body.arrivalFlight},
                     {$set:  {[`EconomySeatsAvailable.${seat}`]  : true}});
                     console.log(up);
                }
                
            else if (req.body.cabin === "Business"){
                let seat = req.body.arrivalSeats[i];
                await Flight.updateOne(
                    {id : req.body.arrivalFlight},
                        {$set:  {[`BusinessSeatsAvailable.${seat}`]  : true}});
                }
            else if (req.body.cabin === "First"){
                let seat = req.body.arrivalSeats[i];
                await Flight.updateOne(
                    {id : req.body.arrivalFlight},
                        {$set:  {[`FirstSeatsAvailable.${seat}`]  : true}});
                }  
        }

        /*let depPrice;
        let arrPrice;
        let totalPrice;
        
        if(req.body.cabin === "Economy"){
            var query = await Flight.findById(req.body.departueFlight).select('EconomyPrice');
            var query2 = await Flight.findById(req.body.arrivalFlight).select('EconomyPrice');
            console.log(query);
            depPrice = depSeatsCount * query.EconomyPrice;
            arrPrice = arrSeatsCount * query2.EconomyPrice;
        }

        if(req.body.cabin === "Business"){
            var query = await Flight.findById(req.body.departueFlight).select('BusinessPrice');
            var query2 = await Flight.findById(req.body.arrivalFlight).select('BusinessPrice');
            console.log(query);
            depPrice = depSeatsCount * query.BusinessPrice;
            arrPrice = arrSeatsCount * query2.BusinessPrice;
        }

        if(req.body.cabin === "First"){
            var query = await Flight.findById(req.body.departueFlight).select('FirstPrice');
            var query2 = await Flight.findById(req.body.arrivalFlight).select('FirstPrice');
            console.log(query);
            depPrice = depSeatsCount * query.FirstPrice;
            arrPrice = arrSeatsCount * query2.FirstPrice;
        }

        totalPrice = depPrice + arrPrice;
        var updateRes = await Reservation.findOneAndUpdate({ r }, {$set : {'totalPrice': totalPrice}});*/


    }
    res.status(201).json({ success: true, data: reservation });
});

exports.viewReservation = asyncHandler(async (req,res,next) => {
    let query;

    query = Reservation.findById(req.params.reservationId).populate({
        path: 'departueFlight', 
        select: 'FlightNumber DepartureDate ArrivalDate TerminalNumber'
    }).populate({
        path: 'arrivalFlight',
        select: 'FlightNumber DepartureDate ArrivalDate TerminalNumber'
    });

    const reservation = await query;

    if(! reservation)
        return next(new ErrorResponse('no reservations with this ${req.params.reservationId} ID', 404))
        
    res.status(200).json({ success: true, data: reservation });
});
