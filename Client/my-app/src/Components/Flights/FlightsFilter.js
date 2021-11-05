import React, { useCallback, useState, useEffect } from "react";
import { FilterInput } from "../UI/FilterInput";

import classes from "./FlightsFilter.module.css";

export const FlightsFilter = (props) => {
  // const { flights } = props;

  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [flightNumValue, setFlightNumValue] = useState();
  const [departValue, setDepartValue] = useState();
  const [arriveValue, setArriveValue] = useState();

  const [flights, setFlights] = useState([]);
  const fetchFlights = useCallback(async () => {
    const response = await fetch(
      "http://localhost:5000/api/flights/viewFlights"
    );
    const data = await response.json();
    setFlights(data.data);

    console.log("Filter fetched Flights");
  }, []);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const fromChangeHandler = (event, value) => {
    setFromValue(value);
  };

  const toChangeHandler = (event, value) => {
    setToValue(value);
  };

  const flightNumberChangeHandler = (event, value) => {
    setFlightNumValue(value);
  };

  const departChangeHandler = (event) => {
    setDepartValue(event.target.value);
  };

  const arriveChangeHandler = (event) => {
    setArriveValue(event.target.value);
  };

  const applyFilterHandler = (event) => {
    event.preventDefault();
    props.onFilter({
      from: fromValue,
      to: toValue,
      flightNumber: flightNumValue,
      departure: departValue,
      arrive: arriveValue,
    });
  };

  const formIsEmpty =
    (fromValue || toValue || flightNumValue || departValue || arriveValue) ===
    undefined;

  console.log(formIsEmpty);

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
      <FilterInput
        label="From"
        options={options.from}
        onChange={fromChangeHandler}
      />
      <FilterInput
        label="To"
        options={options.to}
        onChange={toChangeHandler}
      ></FilterInput>
      <FilterInput
        label="Flight Number"
        options={options.flightNumber}
        onChange={flightNumberChangeHandler}
      />
      <div className={classes.date}>
        <label>Departure date</label>
        <div>
          <input type="date" onChange={departChangeHandler}></input>
        </div>
      </div>

      <div className={classes.date}>
        <label>Arrival date</label>
        <div>
          <input type="date" onChange={arriveChangeHandler}></input>
        </div>
      </div>

      <button
        className="btn--flat"
        onClick={applyFilterHandler}
        disabled={formIsEmpty}
      >
        Filter
      </button>
    </div>
  );
};
