const Flight = require("../Models/Flight");

const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ Success: true, data: flight });
  } catch (err) {
    res.status(400).json({ Success: false, error: err });
  }
};

const updateFlight = async (req,res) => {
  try {
    const flight = await Flight.updateOne({'FlightNumber':req.params.FlightNumber},{$set:
      {
      'From':req.params.From,
      'To':req.params.To,
      'DepartureDate':req.params.dDate,
      'ArrivalDate':req.params.aDate,
      'EconomySeats':req.params.eSeats,
      'BusinessSeats':req.params.bSeats,
      'FirstSeats':req.params.fSeats,
    }})
    //const flight = await Flight.update({FlightNumber:req.params.FlightNumber});
    res.status(201).json({ Success: true, data: flight });
  } catch (err) {
    res.status(400).json({ Success: false, error: err });
  }
}

module.exports = { createFlight, updateFlight };
