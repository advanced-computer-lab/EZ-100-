import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";

import useHttp from "../../../hooks/use-http";
import { editReservation } from "../../../lib/api";

// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";

import Modal from "../../UI/Modal";
import { SeatPicker } from "../Flights/SeatPicker";

import classes from "./FlightCard.module.css";

import dubaiImg from "../../../assets/dubai2.jpg";
import cairoImg from "../../../assets/cairo.jpg";

export default function FlightCard(props) {
  const [toBeEditedSeats, setToBeEditedSeats] = useState([]);
  const [editDisable, setEditDisable] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const history = useHistory();

  const { sendRequest: changeSeatsRequest, status } = useHttp(editReservation);

  const { image, flight, seats, isDeparture } = props;

  useEffect(() => {
    if (status === "completed") {
      window.location.reload(false);
    }
  }, [status]);

  let cabin = props.reservation.arrivalCabin;
  if (isDeparture) {
    cabin = props.reservation.departureCabin;
  }

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
  let reservedSeats = [];

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

    for (const seat of seats) {
      reservedSeats.push(temp + seat);
    }

    seatsNum = reservedSeats.length;
    totalPrice = parseInt(price) * seatsNum;
  }

  const compareSeatLists = (X, Y) => {
    let equal = true;
    for (const x of X) {
      if (!Y.includes(x)) {
        equal = false;
        break;
      }
    }
    // console.log(X + " " + Y + " " + equal);
    return equal;
  };

  const changeSeatsHandler = (chosenSeats) => {
    setToBeEditedSeats(chosenSeats);
    setEditDisable(compareSeatLists(reservedSeats, chosenSeats));
  };

  const onChangeSeatsHandler = async () => {
    console.log(
      `Reserved seats changed from [${reservedSeats}] to [${toBeEditedSeats}]`
    );
    // Send request to backend with new seats
    let tempSeats = [];
    for (const seat of toBeEditedSeats) {
      tempSeats.push(parseInt(seat.substring(1)));
    }

    let editedReservation;
    if (isDeparture) {
      editedReservation = {
        newDepartureCabin: cabin,
        newDepartureFlightId: flight._id,
        newDepartureSeats: tempSeats,
      };
    } else {
      editedReservation = {
        newArrivalCabin: cabin,
        newArrivalFlightId: flight._id,
        newArrivalSeats: tempSeats,
      };
    }
    console.log(editedReservation);
    changeSeatsRequest({ editedReservation, id: props.reservation._id, token });
  };

  const chooseAnotherFlightHandler = () => {
    history.push({
      pathname: "/search",
      state: {
        flightToChange: flight,
        isDepartureFlight: props.isDeparture,
        otherFlightDate: props.otherFlightDate,
        reservation: props.reservation,
      },
    });
  };

  return (
    <>
      {open && (
        <Modal onClose={handleClose}>
          {status === "pending" && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}

          {status !== "pending" && (
            <>
              <div style={{ justifyContent: "center" }} className={classes.row}>
                <p>Your {seatsNum} seat(s) reservation.</p>
                <button
                  disabled={editDisable}
                  className={classes.btn}
                  type="button"
                  onClick={onChangeSeatsHandler}
                >
                  Confirm changes
                </button>
              </div>
              <SeatPicker
                flight={flight}
                trip={{ cabin: resCabin }}
                onSeatsChange={changeSeatsHandler}
                editingMode={true}
                reservedSeats={reservedSeats}
              ></SeatPicker>
            </>
          )}
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
          <Button size="small" onClick={chooseAnotherFlightHandler}>
            Edit flight
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
