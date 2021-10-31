import React from "react";
import classes from "./FlightItem.module.css";

import { Link } from "react-router-dom";

export const FlightItem = (props) => {
  const flight = props.flight;

  let departureDate = new Date(flight.DepartureDate);
  let arrivalDate = new Date(
    new Date(flight.ArrivalDate).getTime() + 270 * 60000
  );

  const departure = {
    date: departureDate.toLocaleDateString(),
    time: departureDate.toLocaleTimeString(),
  };

  const arrival = {
    date: arrivalDate.toLocaleDateString(),
    time: arrivalDate.toLocaleTimeString(),
  };
  return (
    <li className={classes.item}>
      <div className={classes.information}>
        <div className={classes.title}>
          <p>Flight {flight.FlightNumber}</p>
        </div>
        <div className={classes.description}>
          <p>
            <b>Departure:</b> {flight.From} on {departure.date} at{" "}
            {departure.time}
          </p>
          <p>
            <b>Arrival:</b> {flight.To} on {arrival.date} at {arrival.time}
          </p>
        </div>
      </div>

      <Link to={`/flights/${flight._id}`} className="btn">
        Flight Details
      </Link>
    </li>
  );
};
