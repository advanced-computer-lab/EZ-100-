import React from "react";
import classes from "./FlightInfo.module.css";

export const FlightInfo = (props) => {
  const { flight } = props;
  return (
    <figure className={classes.flight}>
      <p>{flight.FlightNumber}</p>
      <div>
        {flight.From} - {flight.To}
      </div>
    </figure>
  );
};
