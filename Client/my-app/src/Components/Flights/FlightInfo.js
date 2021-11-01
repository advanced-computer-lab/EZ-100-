import React from "react";
import classes from "./FlightInfo.module.css";

export const FlightInfo = (props) => {
  const { flight } = props;

  let departureDate = new Date(flight.DepartureDate);
  let arrivalDate = new Date(
    new Date(flight.ArrivalDate).getTime() + 690 * 60000
  );

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const departure = {
    time: departureDate.toLocaleTimeString(),
    longDate: departureDate.toLocaleDateString("en-US", options),
  };

  const arrival = {
    longDate: arrivalDate.toLocaleDateString("en-US", options),
    time: arrivalDate.toLocaleTimeString(),
  };

  return (
    <div className={classes.flight}>
      <div>
        <p>
          {flight.FlightNumber} -{" "}
          <span className={classes.details}>
            {flight.From} - {flight.To}
          </span>
        </p>

        <div className={classes["timing-info"]}>
          Depart on {departure.longDate} at {departure.time}
        </div>

        <div className={classes["timing-info"]}>
          Arrive on {arrival.longDate} at {arrival.time}
        </div>
      </div>

      <div className={classes["cabin-info"]}>
        <h3>Cabin Information</h3>
        <div>First class Seats: {flight.FirstSeats} seats available.</div>
        <div>Business class Seats: {flight.BusinessSeats} seats available.</div>
        <div>Economy class Seats: {flight.EconomySeats} seats available.</div>
      </div>
    </div>
  );
};
