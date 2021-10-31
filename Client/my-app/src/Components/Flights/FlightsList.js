import React from "react";
import classes from "./FlightsList.module.css";

import { FlightItem } from "./FlightItem";

export const FlightsList = (props) => {
  const loadedFlights = props.flights;
  return (
    <ul className={classes.list}>
      {loadedFlights.map((flight) => (
        <FlightItem key={flight._id} flight={flight} />
      ))}
    </ul>
  );
};
