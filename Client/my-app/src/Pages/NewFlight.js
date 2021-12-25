import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";

import classes from "./NewFlight.module.css";
import { useFormik } from "formik";

import * as Yup from "yup";

export default function NewFlight(props) {
  const [error, setError] = useState("");
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const formik = useFormik({
    initialValues: {
      flight_number: "",
      from: "",
      to: "",
      departure_date: "",
      arrival_date: "",
      economy_seats: "",
      economy_price: "",
      business_seats: "",
      business_price: "",
      first_seats: "",
      first_price: "",
      baggage_allowance: "",
      terminal: "",
    },
    validationSchema: Yup.object({
      flight_number: Yup.string()
        .min(3, "min 3 characters")
        .required("Required"),
      from: Yup.string().min(2, "min 3 characters").required("Required"),
      to: Yup.string().min(2, "min 3 characters").required("Required"),
      departure_date: Yup.date().required("Required"),
      arrival_date: Yup.date().required("Required"),
      economy_seats: Yup.number().min(0, "min 0").required(),
      economy_price: Yup.number().min(0, "min 0").required(),
      business_price: Yup.number().min(0, "min 0").required(),
      business_seats: Yup.number().min(0, "min 0").required(),
      first_seats: Yup.number().min(0, "min 0").required(),
      first_price: Yup.number().min(0, "min 0").required(),
      baggage_allowance: Yup.number().min(0, "min 0").required(),

      terminal: Yup.number().min(0, "min 0").required("Required"),
    }),
    onSubmit: async (values) => {
      const newflight = {
        FlightNumber: formik.values.flight_number,
        From: formik.values.from,
        To: formik.values.to,
        DepartureDate: formik.values.departure_date,
        ArrivalDate: formik.values.arrival_date,
        EconomySeats: formik.values.economy_seats,
        BusinessSeats: formik.values.business_seats,
        FirstSeats: formik.values.first_seats,
        TerminalNumber: formik.values.terminal,
        FirstPrice: formik.values.first_price,
        BaggageAllowance: formik.values.baggage_allowance,
        BusinessPrice: formik.values.business_price,
        EconomyPrice: formik.values.economy_price,
      };
      const response = await fetch(
        "http://localhost:5000/api/flights/createFlight",
        {
          method: "POST",
          body: JSON.stringify(newflight), // convert movie from JS object => JSON
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setError("");
        history.push("/flights");
      } else {
        setError("A flight with that number already exists!");
      }
    },
  });
  const flightnumberclasses =
    formik.touched.flight_number && formik.errors.flight_number
      ? classes.error
      : "";

  const fromclasses =
    formik.touched.from && formik.errors.from ? classes.error : "";
  const toclasses = formik.touched.to && formik.errors.to ? classes.error : "";
  const departureclasses =
    formik.touched.departure_date && formik.errors.departure_date
      ? classes.error
      : "";
  const arrivalclasses =
    formik.touched.arrival_date && formik.errors.arrival_date
      ? classes.error
      : "";
  const terminalclasses =
    formik.touched.terminal && formik.errors.terminal ? classes.error : "";

  const economySeatsClasses =
    formik.touched.economy_seats && formik.errors.economy_seats
      ? classes.error
      : "";
  const economyPriceClasses =
    formik.touched.economy_price && formik.errors.economy_price
      ? classes.error
      : "";
  const businessSeatsClasses =
    formik.touched.business_seats && formik.errors.business_seats
      ? classes.error
      : "";
  const businessPriceClasses =
    formik.touched.business_price && formik.errors.business_price
      ? classes.error
      : "";

  const firstSeatsClasses =
    formik.touched.first_seats && formik.errors.first_seats
      ? classes.error
      : "";
  const firstPriceClasses =
    formik.touched.first_price && formik.errors.first_price
      ? classes.error
      : "";

  return (
    <div className={classes.wrapper}>
      <div className={classes["form-wrapper"]}>
        <h1>Create Flight</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes["flight_number"]}>
            <label htmlFor="flight_number">Flight Number</label>
            <input
              type="text"
              name="flight_number"
              className={flightnumberclasses}
              value={formik.values.flight_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="flight number"
            />
          </div>
          <div className={classes["from"]}>
            <label htmlFor="from">From </label>
            <input
              type="text"
              name="from"
              className={fromclasses}
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="from"
            />
          </div>

          <div className={classes["to"]}>
            <label htmlFor="to">To </label>
            <input
              type="text"
              name="to"
              className={toclasses}
              value={formik.values.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="to"
            />
          </div>

          <div className={classes["departure_date"]}>
            <label htmlFor="departure_date">Departure date </label>
            <input
              type="datetime-local"
              name="departure_date"
              className={departureclasses}
              value={formik.values.departure_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="departure date"
            />
          </div>
          <div className={classes["arrival_date"]}>
            <label htmlFor="arrival_date">Arrival date </label>
            <input
              type="datetime-local"
              name="arrival_date"
              className={arrivalclasses}
              value={formik.values.arrival_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Arrival date"
            />
          </div>

          <div className={classes["business_seats"]}>
            <label htmlFor="business_seats">Business seats</label>
            <input
              className={businessSeatsClasses}
              type="number"
              min="1"
              name="business_seats"
              value={formik.values.business_seats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="business seats"
            />
          </div>
          <div className={classes["business_price"]}>
            <label htmlFor="business_price">Business price</label>
            <input
              className={businessPriceClasses}
              type="number"
              min="1"
              name="business_price"
              value={formik.values.business_price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="business price"
            />
          </div>

          <div className={classes["economy_seats"]}>
            <label htmlFor="economy_seats">Economy seats </label>
            <input
              className={economySeatsClasses}
              type="number"
              min="1"
              name="economy_seats"
              value={formik.values.economy_seats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="economy seats"
            />
          </div>
          <div className={classes["economy_price"]}>
            <label htmlFor="economy_price">Economy price </label>
            <input
              className={economyPriceClasses}
              type="number"
              min="1"
              name="economy_price"
              value={formik.values.economy_price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="economy price"
            />
          </div>

          <div className={classes["first_seats"]}>
            <label htmlFor="first_seats">First seats </label>
            <input
              className={firstSeatsClasses}
              type="number"
              min="1"
              name="first_seats"
              value={formik.values.first_seats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="first seats"
            />
          </div>
          <div className={classes["first_price"]}>
            <label htmlFor="first_price">First price </label>
            <input
              className={firstPriceClasses}
              type="number"
              min="1"
              name="first_price"
              value={formik.values.first_price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="first price"
            />
          </div>
          <div className={classes["baggage_allowance"]}>
            <label htmlFor="baggage_allowance">Baggage allowance</label>
            <input
              type="number"
              min="1"
              name="baggage_allowance"
              className={terminalclasses}
              value={formik.values.baggage_allowance}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="baggage allowance"
            />
          </div>
          <div className={classes["terminal"]}>
            <label htmlFor="terminal">terminal </label>
            <input
              type="number"
              min="1"
              max="3"
              name="terminal"
              className={terminalclasses}
              value={formik.values.terminal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="terminal"
            />
          </div>

          <div className={classes["Create"]}>
            <button type="submit">Create Flight</button>
          </div>

          <div style={{ color: "red" }}>{error}</div>
        </form>
      </div>
    </div>
  );
}
