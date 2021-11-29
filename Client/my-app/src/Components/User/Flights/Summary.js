import React, { useContext } from "react";
import classes from "./Summary.module.css";

import { FaPlaneDeparture } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";

import ReservationContext from "../../../store/reservation-context";

export const Summary = (props) => {
  const { trip } = props;
  const seatsNumber = parseInt(trip.adultsNum) + parseInt(trip.childrenNum);

  const reservationCtx = useContext(ReservationContext);
  const { departureFlight, returnFlight, departureSeats, returnSeats } =
    reservationCtx;

  let departurePrice;
  let returnPrice;
  if (trip.cabin === "Economy") {
    departurePrice = departureFlight.EconomyPrice;
    returnPrice = returnFlight.EconomyPrice;
  } else if (trip.cabin === "Business") {
    departurePrice = departureFlight.BusinessPrice;
    returnPrice = returnFlight.BusinessPrice;
  } else {
    departurePrice = departureFlight.FirstPrice;
    returnPrice = returnFlight.FirstPrice;
  }

  let departureDate = new Date(departureFlight.DepartureDate);
  let returnDate = new Date(returnFlight.DepartureDate);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  departureDate = {
    time: departureDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    longDate: departureDate.toLocaleDateString("en-US", options),
  };

  returnDate = {
    longDate: returnDate.toLocaleDateString("en-US", options),
    time: returnDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const totalPrice = seatsNumber * departurePrice + seatsNumber * returnPrice;

  const cartItems = (
    <div className={classes["cart-items"]}>
      <div
        style={{ justifyContent: "center" }}
        className={classes["cart-item"]}
      >
        <h2>Your reservation summary</h2>
      </div>

      <div className={classes["cart-item"]}>
        <h2 style={{ alignSelf: "center" }}>{departureFlight.FlightNumber}</h2>
        <div className={classes["content-col"]}>
          <label>
            Depart <FaPlaneDeparture />
          </label>
          <span>{departureDate.longDate}</span>
          <span>{departureDate.time}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>Cabin</label>
          <span>{trip.cabin}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>
            Chosen seats <MdEventSeat />
          </label>
          <div className={classes["wrap-row"]}>
            {departureSeats.map((seat) => (
              <span>{seat}</span>
            ))}
          </div>
        </div>

        <div className={classes["content-col"]}>
          <label>Price</label>
          <span className={classes.price}>${departurePrice}</span>
        </div>
        <span style={{ alignSelf: "center" }} className={classes.amount}>
          x{seatsNumber}
        </span>
      </div>

      <div className={classes["cart-item"]}>
        <h2 style={{ alignSelf: "center" }}>{returnFlight.FlightNumber}</h2>
        <div className={classes["content-col"]}>
          <label>
            Depart <FaPlaneDeparture />
          </label>
          <span>{returnDate.longDate}</span>
          <span>{returnDate.time}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>Cabin</label>
          <span>{trip.cabin}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>
            Chosen seats <MdEventSeat />
          </label>
          <div className={classes["wrap-row"]}>
            {returnSeats.map((seat) => (
              <span>{seat}</span>
            ))}
          </div>
        </div>

        <div className={classes["content-col"]}>
          <label>Price</label>
          <span className={classes.price}>${returnPrice}</span>
        </div>
        <span style={{ alignSelf: "center" }} className={classes.amount}>
          x{seatsNumber}
        </span>
      </div>
    </div>
  );

  return (
    <div className={classes.container}>
      <div style={{ width: "100%" }}>
        {cartItems}
        <div className={classes.total}>
          <span>Total price = ${totalPrice}</span>

          <button className="btn">Book trip</button>
        </div>
      </div>
    </div>
  );
};
