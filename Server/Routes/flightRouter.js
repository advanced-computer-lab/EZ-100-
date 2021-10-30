const express = require("express");

const flightController = require("../Controllers/flightControllers");

const router = express.Router();

//da3k

router.post("/createFlight", flightController.createFlight);
router.put("/updateFlight/:FlightNumber", flightController.updateFlight);

module.exports = router;
