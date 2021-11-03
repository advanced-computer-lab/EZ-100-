const Flight = require("../Models/Flight");
const asyncHandler = require("../middleware/async");

const createFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.create(req.body);
  res.status(201).json({ success: true, count: flight.length, data: flight });
});

const viewFlights = asyncHandler(async (req, res) => {
  let query; 

  const reqQuery = {...req.query};

  const removeFields = ['sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  
  //Query and filters
  query = Flight.find(JSON.parse(queryStr));

  //Sort
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }else{
    query = query.sort('DepartureDate');
  }

  //Pagination
  const page = parseInt(req.query.pagem, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 6;
  const startIndex = (page - 1) * limit;

  const flight = await query;


  res.status(200).json({ success: true,count: flight.length, data: flight });
});

const viewFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  res.status(200).json({ success: true,count: flight.length, data: flight });
});

const updateFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true,count: flight.length, data: flight });
});

const deleteFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true,count: flight.length, data: flight });
});

module.exports = {
  createFlight,
  viewFlights,
  viewFlight,
  updateFlight,
  deleteFlight,
};
