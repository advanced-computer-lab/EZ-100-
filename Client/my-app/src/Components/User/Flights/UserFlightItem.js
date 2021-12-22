import React, { useContext } from "react";
import ReservationContext from "../../../store/reservation-context";

import { useHistory } from "react-router-dom";

import classes from "./UserFlightItem.module.css";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import {
  MdEventSeat,
  MdOutlinePriceChange,
  MdOutlineDoneOutline,
} from "react-icons/md";
import { IoBagSharp } from "react-icons/io5";

export const UserFlightItem = (props) => {
  const { flight } = props;
  const history = useHistory();
  const trip = history.location.state.data;

  const reservationCtx = useContext(ReservationContext);

  let departureDate = new Date(flight.DepartureDate);
  let arrivalDate = new Date(flight.ArrivalDate);

  let duration = Math.abs(arrivalDate - departureDate) / 36e5;
  duration = duration.toFixed(1);

  let price;
  if (trip.cabin === "Economy") {
    price = flight.EconomyPrice;
  } else if (trip.cabin === "Business") {
    price = flight.BusinessPrice;
  } else {
    price = flight.FirstPrice;
  }

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const departure = {
    time: departureDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    longDate: departureDate.toLocaleDateString("en-US", options),
  };

  const arrival = {
    longDate: arrivalDate.toLocaleDateString("en-US", options),
    time: arrivalDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const btnClasses =
    reservationCtx.departureFlight === flight ||
    reservationCtx.returnFlight === flight
      ? classes.selectedBtn
      : classes.btn;

  const btnContent =
    reservationCtx.departureFlight === flight ||
    reservationCtx.returnFlight === flight ? (
      <MdOutlineDoneOutline />
    ) : (
      "Book"
    );

  const onClickHandler = (event) => {
    event.preventDefault();

    if (trip.fromValue === flight.From) {
      reservationCtx.setDepartureFlight(flight);
    } else {
      reservationCtx.setReturnFlight(flight);
    }
  };

  return (
    <li className={classes.item}>
      <div className={classes.container}>
        <div className={classes.title}>
          <p>{flight.FlightNumber}</p>
        </div>

        <div className={classes.description}>
          <div className={classes["row-item"]}>
            <label>
              Depart <FaPlaneDeparture />
            </label>
            <div className={classes.content}>{departure.time}</div>
            <div>{departure.longDate}</div>
          </div>

          <div className={classes["row-item"]}>
            <label>
              Arrive <FaPlaneArrival />
            </label>
            <div className={classes.content}>{arrival.time}</div>
            <div>{departure.longDate}</div>
          </div>

          <div className={classes["row-item"]}>
            <label>
              Duration <GiSandsOfTime />
            </label>
            <div className={classes.content}>{duration} Hrs</div>
          </div>

          <div className={classes["row-item"]}>
            <label>
              Cabin <MdEventSeat />
            </label>
            <div className={classes.content}>{trip.cabin}</div>
          </div>

          <div className={classes["row-item"]}>
            <label>
              Baggage allowance <IoBagSharp />
            </label>
            <div className={classes.content}>{flight.BaggageAllowance} kg</div>
          </div>

          <div className={classes["row-item"]}>
            <label>
              Price <MdOutlinePriceChange />
            </label>
            <div className={classes.content}>${price}</div>
          </div>
        </div>
      </div>

      <button type="button" onClick={onClickHandler} className={btnClasses}>
        {btnContent}
      </button>
    </li>
  );
};
