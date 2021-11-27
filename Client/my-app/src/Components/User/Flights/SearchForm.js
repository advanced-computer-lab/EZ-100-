import React, { useState } from "react";
import classes from "./SearchForm.module.css";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import Card from "../../UI/Card";
import { FilterInput } from "../../UI/FilterInput";

export const SearchForm = (props) => {
  let today = new Date();
  today = today.toISOString().substring(0, 10);

  let todayP5 = new Date();
  todayP5.setDate(todayP5.getDate() + 5);
  todayP5 = todayP5.toISOString().substring(0, 10);

  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [departureDate, setDepartureDate] = useState(today);
  const [returnDate, setReturnDate] = useState(todayP5);
  const [adultsNum, setAdultesNum] = useState(1);
  const [childrenNum, setChildrenNum] = useState(0);
  const [cabin, setCabin] = useState("Economy");
  const [isFlexible, setIsFlexible] = useState(true);

  const [fromHasError, setFromHasError] = useState(false);
  const [toHasError, setToHasError] = useState(false);

  const options = { from: [], to: [] };
  props.allFlights.forEach((flight) => {
    if (!options.from.includes(flight.From)) {
      options.from.push(flight.From);
    }
    if (!options.to.includes(flight.To)) {
      options.to.push(flight.To);
    }
  });

  const fromChangeHandler = (event, value) => {
    if (fromHasError) {
      setFromHasError(false);
    }
    setFromValue(value);
  };

  const toChangeHandler = (event, value) => {
    if (toHasError) {
      setToHasError(false);
    }
    setToValue(value);
  };

  const departureChangeHandler = (event) => {
    setDepartureDate(event.target.value);
  };

  const returnChangeHandler = (event) => {
    setReturnDate(event.target.value);
  };

  const adultNumChangeHandler = (event) => {
    setAdultesNum(event.target.value);
  };

  const childrenNumChangeHandler = (event) => {
    setChildrenNum(event.target.value);
  };

  const cabinChangeHandler = (event) => {
    setCabin(event.target.value);
  };

  const flexibleSearchHandler = (event) => {
    setIsFlexible((state) => !state);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (fromValue && toValue) {
      const data = {
        fromValue,
        toValue,
        departureDate,
        returnDate,
        adultsNum,
        childrenNum,
        cabin,
        isFlexible,
      };

      props.onFormSubmission(data);
    }

    if (!fromValue) {
      setFromHasError(true);
    }

    if (!toValue) {
      setToHasError(true);
    }
  };

  return (
    <div className="centered">
      <Card>
        <h3>Book your trip !</h3>
        <hr />
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <div className={classes["row"]}>
            <div
              style={{ marginLeft: "-20px" }}
              className={classes["form-control"]}
            >
              <FilterInput
                hasError={fromHasError}
                width={250}
                label="From"
                options={options.from}
                onChange={fromChangeHandler}
              />
            </div>

            <div
              style={{ marginLeft: "-20px" }}
              className={classes["form-control"]}
            >
              <FilterInput
                hasError={toHasError}
                width={250}
                label="To"
                options={options.to}
                onChange={toChangeHandler}
              />
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes["form-control"]}>
              <InputLabel>Departure date</InputLabel>
              <input
                type="date"
                value={departureDate}
                onChange={departureChangeHandler}
              ></input>
            </div>

            <div className={classes["form-control"]}>
              <InputLabel>Return date</InputLabel>
              <input
                type="date"
                value={returnDate}
                onChange={returnChangeHandler}
              ></input>
            </div>
          </div>

          <div
            style={{ marginTop: "-20px" }}
            className={classes["form-control"]}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Flexible dates (For better options)"
              onChange={flexibleSearchHandler}
            />
          </div>
          <div className={classes.row}>
            <div className={classes["form-control"]}>
              <InputLabel>Adult(s)</InputLabel>
              <input
                type="number"
                min="1"
                value={adultsNum}
                onChange={adultNumChangeHandler}
              ></input>
            </div>

            <div className={classes["form-control"]}>
              <InputLabel>Children</InputLabel>
              <input
                type="number"
                min="0"
                value={childrenNum}
                onChange={childrenNumChangeHandler}
              ></input>
            </div>
          </div>

          <div className={classes["last-row"]}>
            <InputLabel>Cabin</InputLabel>
            <div style={{ textAlign: "left" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cabin}
                label="Age"
                onChange={cabinChangeHandler}
              >
                <MenuItem value="Economy">Economy</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="First class">First class</MenuItem>
              </Select>
            </div>
          </div>

          {fromHasError && (
            <p style={{ color: "red", textAlign: "left" }}>
              From field cannot be empty *
            </p>
          )}

          {toHasError && (
            <p style={{ color: "red", textAlign: "left", marginTop: "-12px" }}>
              To field cannot be empty *
            </p>
          )}

          <button type="submit" className="btn">
            Search
          </button>
        </form>
      </Card>
    </div>
  );
};
