import React from "react";
import { UserFlightItem } from "./UserFlightItem";
import Alert from "@mui/material/Alert";

import classes from "./UserFlights.module.css";

export const UserFlights = (props) => {
  const flights = props.flights;

  if (flights.length === 0) {
    return (
      <Alert severity="info">
        No flights available that matches your search.
      </Alert>
    );
  }

  return (
    <ul className={classes.list}>
      {flights.map((flight) => (
        <UserFlightItem key={flight._id} flight={flight} />
      ))}
    </ul>
  );
};
