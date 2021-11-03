import React from "react";
import { FilterInput } from "../UI/FilterInput";

import classes from "./FlightsFilter.module.css";

export const FlightsFilter = (props) => {
  const { flights } = props;
  let options = {
    from: [],
    to: [],
    flightNumber: [],
    departureTimes: [],
    departureDates: [],
    arrivalTimes: [],
    arrivalDates: [],
  };

  flights.forEach((flight) => {
    if (!options.from.includes(flight.From)) {
      options.from.push(flight.From);
    }

    if (!options.to.includes(flight.To)) {
      options.to.push(flight.To);
    }

    if (!options.flightNumber.includes(flight.FlightNumber)) {
      options.flightNumber.push(flight.FlightNumber);
    }
  });

  return (
    <div className={classes.items}>
      <FilterInput label="From" options={options.from}></FilterInput>
      <FilterInput label="To" options={options.to}></FilterInput>
      <FilterInput label="Flight Number" options={options.flightNumber} />
      <div className={classes.date}>
        <label>Departure date</label>
        <div>
          <input type="date"></input>
        </div>
      </div>

      <div className={classes.date}>
        <label>Arrival date</label>
        <div>
          <input type="date"></input>
        </div>
      </div>

      <button className="btn--flat">Filter</button>
    </div>
  );
};
