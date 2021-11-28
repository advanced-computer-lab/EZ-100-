const express = require("express");

const reservationController = require("../Controllers/reservationControllers");

const router = express.Router();

router.post("/createReservation", reservationController.createReservation);
router.get("/viewReservation", reservationController.viewReservation);

module.exports = router;
