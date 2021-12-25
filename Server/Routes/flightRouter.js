const express = require("express");

const flightController = require("../Controllers/flightControllers");

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//da3k

router.post("/createFlight", protect, authorize('admin'), flightController.createFlight);
router.get("/viewFlights", flightController.viewFlights);
router.get("/viewFlight/:id", flightController.viewFlight);
router.delete("/deleteFlight/:id", protect, authorize('admin'), flightController.deleteFlight);
router.put("/updateFlight/:id", protect, authorize('admin'), flightController.updateFlight);

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
