import * as React from "react";
import { useState } from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

import Modal from "../../UI/Modal";
import { SeatPicker } from "../Flights/SeatPicker";

import classes from "./FlightCard.module.css";

import dubaiImg from "../../../assets/dubai2.jpg";
import cairoImg from "../../../assets/cairo.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FlightCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { image, flight, cabin, seats } = props;

  let usedImg = cairoImg;
  if (image === "dubai") {
    usedImg = dubaiImg;
  }

  let departureDate = "";
  let arrivalDate = "";
  let resCabin = "First Class";
  let price = 1000;
  let totalPrice = price;
  let baggage = 20;
  let from = "CAI";
  let to = "DXB";
  let seatsNum = 1;
  let duration = "";

  if (flight) {
    from = flight.From;
    to = flight.To;
    baggage = flight.BaggageAllowance;
    departureDate = new Date(flight.DepartureDate);
    arrivalDate = new Date(flight.ArrivalDate);

    const diffTime = Math.abs(arrivalDate - departureDate);
    duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    departureDate = {
      time: departureDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      longDate: departureDate.toLocaleDateString("en-US", options),
    };

    arrivalDate = {
      longDate: arrivalDate.toLocaleDateString("en-US", options),
      time: arrivalDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    let temp;
    if (cabin === "Economy") {
      temp = "E";
      resCabin = "Economy";
      price = flight.EconomyPrice;
    } else if (cabin === "Business") {
      temp = "B";
      resCabin = "Business";
      price = flight.BusinessPrice;
    } else {
      temp = "F";
      resCabin = "First class";
      price = flight.FirstPrice;
    }
    let flightSeats = [];
    for (const seat of seats) {
      flightSeats.push(temp + seat);
    }

    seatsNum = flightSeats.length;
    totalPrice = parseInt(price) * seatsNum;
  }

  return (
    <>
      {open && (
        <Modal onClose={handleClose}>
          <SeatPicker flight={flight} trip={{ cabin: resCabin }}></SeatPicker>
        </Modal>
      )}
      <Card sx={{ width: "45%" }}>
        <CardHeader
          title={`${from} - ${to}`}
          subheader={departureDate.time + " -- " + departureDate.longDate}
        />
        <CardMedia
          component="img"
          height="170"
          image={usedImg}
          alt="Dubai image"
        />
        <CardContent>
          <div className={classes.row}>
            <p>Number of seats: {seatsNum}</p>
            <p>Duration: {duration} hr</p>
          </div>

          <div className={classes.row}>
            <p>Cabin: {resCabin}</p>
            <p>Baggage: {baggage} kg</p>
          </div>
          <div className={classes.row}>
            <p>Price (per seat): ${price}</p>
            <p>Total price: ${totalPrice}</p>
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen} size="small">
            View seats
          </Button>
          <Button size="small">Choose another flight</Button>
        </CardActions>
      </Card>
    </>
  );
}
