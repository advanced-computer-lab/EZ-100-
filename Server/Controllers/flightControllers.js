const Flight = require("../Models/Flight");

const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ Success: true, data: flight });
  } catch (err) {
    res.status(400).json({ Success: false, error: err });
  }
};
const viewFlights = async (req, res) => {
  try {
    const flight = await Flight.find({})
      .sort({ FlightNumber: 1 })
      .exec(function (err, docs) {});
    res.status(200).json({ Success: true, data: flight });
  } catch (err) {
    res.status(400).json({ Success: false, error: err });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.deleteOne({
      FlightNumber: req.params.FlightNumber,
    });
    res.status(200).json({ Success: true, data: flight });
  } catch (err) {
    res.status(400).json({ Success: false, error: err });
  }
};

module.exports = { createFlight, viewFlights, deleteFlight };
