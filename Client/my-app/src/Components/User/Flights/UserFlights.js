import React from "react";
import { UserFlightItem } from "./UserFlightItem";

import classes from "./UserFlights.module.css";

export const UserFlights = (props) => {
  const flights = props.flights;
  return (
    <ul className={classes.list}>
      {flights.map((flight) => (
        <UserFlightItem key={flight._id} flight={flight} />
      ))}
    </ul>
  );
};
