import React from "react";
import classes from "./FlightItem.module.css";

import { Link } from "react-router-dom";

export const FlightItem = (props) => {
  const flight = props.flight;
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{flight.title}</p>
        </blockquote>
        <figcaption>{flight.body}</figcaption>
      </figure>

      <Link to={`/flights/${flight.id}`} className="btn">
        Flight Details
      </Link>
    </li>
  );
};
