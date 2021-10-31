const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// load Models
const Flight = require("./Models/Flight");

// Connnect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Read JSON files
const flights = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/flights.json`, "utf-8")
);

// Import data into DB
const importData = async () => {
  try {
    await Flight.create(flights);
    console.log("Data imported...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete data
const deleteData = async () => {
  try {
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
