const express = require("express");

const flightController = require("../Controllers/flightControllers");

const router = express.Router();

//da3k

router.post("/createFlight", flightController.createFlight);

module.exports = router;
