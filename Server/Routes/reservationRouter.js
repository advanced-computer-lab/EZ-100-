const express = require("express");

const reservationController = require("../Controllers/reservationControllers");

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post("/createReservation", protect, reservationController.createReservation);
router.get(
  "/viewReservation/:reservationId", protect, 
  reservationController.viewReservation
);
router.get("/email_me/:reservationId", protect, reservationController.emailReservation);
router.get("/userReservations/:id", protect, reservationController.getReservations);
router.delete(
  "/deleteReservation/:id", protect, 
  reservationController.deleteReservation
);
router.put(
  "/editReservation/:reservationId", protect,
  reservationController.editReservation
);

module.exports = router;
