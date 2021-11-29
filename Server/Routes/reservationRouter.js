const express = require("express");

const reservationController = require("../Controllers/reservationControllers");

const router = express.Router();

router.post("/createReservation", reservationController.createReservation);
router.get(
  "/viewReservation/:reservationId",
  reservationController.viewReservation
);
router.get("/userReservations/:id", reservationController.getReservations);

module.exports = router;
