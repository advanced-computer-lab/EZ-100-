const express = require("express");

const flightController = require("../Controllers/flightControllers");

const router = express.Router();

//da3k

router.post("/createFlight", flightController.createFlight);
router.get("/viewFlights", flightController.viewFlights);
router.delete("/deleteFlight/:FlightNumber", flightController.deleteFlight);
router.put("/updateFlight/:FlightNumber", flightController.updateFlight);


module.exports = router;

/*
 "FlightNumber": "1",
    "From":"Egyypt",
    "DepartureDate":"2023-05-23", 
    "ArrivalDate": "2023-05-23",
    "EconomySeats": "100",
    "BusinessSeats": "20",
    "FirstSeats": "10"

*/
