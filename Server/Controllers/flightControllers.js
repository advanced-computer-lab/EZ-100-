const Flight = require("../Models/Flight");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");

const createFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.create(req.body);
  res.status(201).json({ success: true, count: flight.length, data: flight });
});

const viewFlights = asyncHandler(async (req, res) => {
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ["sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  //Query and filters
  query = Flight.find(JSON.parse(queryStr));

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("DepartureDate");
  }

  //Pagination
  const total = await Flight.countDocuments();
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || total;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  query = query.skip(startIndex).limit(limit);

  const flights = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  // If a query was passed
  if (queryStr.length > 2) {
    return res
      .status(200)
      .json({ success: true, data: flights, count: flights.length });
  }

  res.status(200).json({
    success: true,
    count: total,
    pagination,
    data: flights,
  });
});

const viewFlight = asyncHandler(async (req, res, next) => {
  const flight = await Flight.findById(req.params.id)
    .populate("departureReservations")
    .populate("returnReservations");

  if (!flight) {
    return next(new ErrorResponse("No flight with that Id", 404));
  }

  res.status(200).json({ success: true, count: flight.length, data: flight });
});

const updateFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, count: flight.length, data: flight });
});

const deleteFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, count: flight.length, data: flight });
});

module.exports = {
  createFlight,
  viewFlights,
  viewFlight,
  updateFlight,
  deleteFlight,
};
