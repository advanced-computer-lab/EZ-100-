const Flight = require("../Models/Flight");
const asyncHandler = require("../middleware/async");

const createFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.create(req.body);
  res.status(201).json({ Success: true, data: flight });
});

const viewFlights = asyncHandler(async (req, res) => {
  const flights = await Flight.find().sort({ DepartureDate: 1 });
  res.status(200).json({ Success: true, data: flights });
});

const viewFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  res.status(200).json({ Success: true, data: flight });
});

const updateFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ Success: true, data: flight });
});

const deleteFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findByIdAndDelete(req.params.id);
  res.status(200).json({ Success: true, data: flight });
});

module.exports = {
  createFlight,
  viewFlights,
  viewFlight,
  updateFlight,
  deleteFlight,
};
