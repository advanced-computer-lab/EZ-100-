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
const updateFlight = async (req,res) => {
  apiRequest = JSON.parse(req.body);
  params.append('From', req.body.From);
  params.append('To',req.body.To);
  params.append('DepartureDate',req.body.DepartureDate);
  params.append('ArrivalDate',req.body.ArrivalDate);
  params.append('EconomySeats',req.body.EconomySeats);
  params.append('BusinessSeats',req.body.BusinessSeats);
  params.append('FirstSeats',req.body.FirstSeats);

  try {
    const flight = await Flight.updateOne({'FlightNumber':req.params.FlightNumber},{$set:
      {
      'From':req.param.From,
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

module.exports = { createFlight, viewFlights, updateFlight, deleteFlight };




