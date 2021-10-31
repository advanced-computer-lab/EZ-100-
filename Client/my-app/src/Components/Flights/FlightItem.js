import React from "react";
import classes from "./FlightItem.module.css";

import { Link } from "react-router-dom";

export const FlightItem = (props) => {
  const flight = props.flight;

  let departure = new Date(flight.DepartureDate);
  departure = {
    date: departure.toLocaleDateString(),
    time: departure.toLocaleTimeString(),
  };
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>Flight {flight.FlightNumber}</p>
        </blockquote>
        <figcaption>
          Departure from {flight.From} on {departure.date} At {departure.time}
        </figcaption>
        <figcaption>
          Arrive at {flight.To} on {departure.date} At {departure.time}
        </figcaption>
      </figure>

      <Link to={`/flights/${flight._id}`} className="btn">
        Flight Details
      </Link>
    </li>
  );
};
