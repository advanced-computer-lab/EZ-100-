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
  // console.log(props.searchState);
  const { searchState } = props;

  let today = new Date();
  today = today.toISOString().substring(0, 10);

  let todayP5 = new Date();
  todayP5.setDate(todayP5.getDate() + 5);
  todayP5 = todayP5.toISOString().substring(0, 10);

  let departureDisable = false;
  let returnDisable = false;
  let disableDestinations = false;

  let fromLabel = "From";
  let toLabel = "To";
  let intitialFromVal = "";
  let initialToVal = "";
  let intitialAdultSeats = 1;

  if (searchState) {
    disableDestinations = true;

    intitialAdultSeats = searchState.reservation.departureSeats.length;

    if (searchState.isDepartureFlight) {
      today = searchState.flightToChange.DepartureDate.substring(0, 10);
      todayP5 = searchState.otherFlightDate.substring(0, 10);
      returnDisable = true;
      fromLabel = searchState.flightToChange.From;
      toLabel = searchState.flightToChange.To;
    } else {
      today = searchState.otherFlightDate.substring(0, 10);
      todayP5 = searchState.flightToChange.DepartureDate.substring(0, 10);
      departureDisable = true;
      fromLabel = searchState.flightToChange.To;
      toLabel = searchState.flightToChange.From;
    }

    intitialFromVal = fromLabel;
    initialToVal = toLabel;
  }

  const [fromValue, setFromValue] = useState(intitialFromVal);
  const [toValue, setToValue] = useState(initialToVal);
  const [departureDate, setDepartureDate] = useState(today);
  const [returnDate, setReturnDate] = useState(todayP5);
  const [adultsNum, setAdultesNum] = useState(intitialAdultSeats);
  const [childrenNum, setChildrenNum] = useState(0);
  const [cabin, setCabin] = useState("Economy");
  const [isFlexible, setIsFlexible] = useState(true);

  const [fromHasError, setFromHasError] = useState(false);
  const [toHasError, setToHasError] = useState(false);
  const [datesError, setDatesError] = useState(false);

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
    if (datesError) {
      if (new Date(returnDate) > new Date(event.target.value)) {
        setDatesError(false);
      }
    }
    setDepartureDate(event.target.value);
  };

  const returnChangeHandler = (event) => {
    if (datesError) {
      if (new Date(departureDate) < new Date(event.target.value)) {
        setDatesError(false);
      }
    }
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

    if (new Date(departureDate) > new Date(returnDate)) {
      console.log("dates error");
      setDatesError(true);
      return;
    }

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
    <div style={{ margin: "0 0" }} className="centered">
      <div style={{ marginTop: "2rem" }}>
        <Card>
          <h3>Your next adventure starts here!</h3>
          <hr />
          <form onSubmit={formSubmitHandler} className={classes.form}>
            <div className={classes["row"]}>
              <div
                style={{ marginLeft: "-20px" }}
                className={classes["form-control"]}
              >
                <FilterInput
                  disabled={disableDestinations}
                  hasError={fromHasError}
                  width={200}
                  label={fromLabel}
                  options={options.from}
                  onChange={fromChangeHandler}
                />
              </div>

              <div
                style={{ marginLeft: "-20px" }}
                className={classes["form-control"]}
              >
                <FilterInput
                  disabled={disableDestinations}
                  hasError={toHasError}
                  width={200}
                  label={toLabel}
                  options={options.to}
                  onChange={toChangeHandler}
                />
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes["form-control"]}>
                <InputLabel>Departure date</InputLabel>
                <input
                  disabled={departureDisable}
                  type="date"
                  value={departureDate}
                  onChange={departureChangeHandler}
                ></input>
              </div>

              <div className={classes["form-control"]}>
                <InputLabel>Return date</InputLabel>
                <input
                  disabled={returnDisable}
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
                  disabled={disableDestinations}
                  type="number"
                  min="1"
                  value={adultsNum}
                  onChange={adultNumChangeHandler}
                ></input>
              </div>

              <div className={classes["form-control"]}>
                <InputLabel>Children</InputLabel>
                <input
                  disabled={disableDestinations}
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
              <p
                style={{ color: "red", textAlign: "left", marginTop: "-10px" }}
              >
                From field cannot be empty *
              </p>
            )}

            {toHasError && (
              <p
                style={{ color: "red", textAlign: "left", marginTop: "-10px" }}
              >
                To field cannot be empty *
              </p>
            )}

            {datesError && (
              <p
                style={{ color: "red", textAlign: "left", marginTop: "-10px" }}
              >
                Departure date cannot be before return date *
              </p>
            )}

            <button type="submit" className="btn">
              Search
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};
