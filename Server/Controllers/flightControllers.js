const Flight = require("../Models/Flight");

const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ Success: true, data: flight });
  } catch (err) {
    res.status(400).json({ Success: false, error: err });
  }
};

module.exports = { createFlight };
