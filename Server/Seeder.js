const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// load Models
const Flight = require("./Models/Flight");
const User = require("./Models/User");
const Reservation = require("./Models/Reservation");

// Connnect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Read JSON files
const flights = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/flights.json`, "utf-8")
);

//set Date
const setDate = (d) => {
  date = d.split("-");
  return new Date(
    date[0],
    date[1],
    date[2],
    Math.floor(Math.random() * 10) + 15,
    Math.floor(Math.random() * 10) + 51
  );
};

let transformedFlights = [];
for (let i = 0; i < flights.length - 2; i += 3) {
  const randPrice = Math.floor(Math.random() * 1500) + 400;
  const flightObj = {
    ...flights[i],
    EconomySeats: flights[i]["Seats Available on Flight"],
    BusinessSeats: flights[i + 1]["Seats Available on Flight"],
    FirstSeats: flights[i + 2]["Seats Available on Flight"],
    FlightNumber: "EZ " + Math.floor(Math.random() * 10000),
    ArrivalDate:
      new Date(flights[i]["DepartureDate"]).getTime() +
      (Math.floor(Math.random() * 600) + 100) * 60000,
    TerminalNumber: Math.floor(Math.random() * 3) + 1,
    FirstPrice: randPrice,
    EconomyPrice: randPrice - 300,
    BusinessPrice: randPrice - 100,
    BaggageAllowance: Math.floor(Math.random() * 50) + 10,
  };
  transformedFlights.push(flightObj);
}

// setDate(flights[i]["DepartureDate"]),

// Import data into DB
const importData = async () => {
  try {
    const adminstrator = {
      firstName: "Adminstrator",
      lastName: "Adminstrator",
      email: "mohamedrostom62@gmail.com",
      passportNumber: "balabizo",
      dateOfBirth: new Date(2000, 10, 8),
      gender: "Male",
      role: "admin",
      password: "123456",
    };
    await User.create(adminstrator);

    await Flight.create(transformedFlights);
    console.log("Data imported...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Flight.deleteMany();
    console.log("Data destroyed...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
