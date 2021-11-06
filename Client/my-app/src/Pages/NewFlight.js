import React, { Component } from "react";

import "../Pages/NewFlight.module.css";
import Card from "../Components/UI/Card";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { createFlight } from "../lib/api";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function NewFlight(props) {
    const formik = useFormik({
        initialValues: {
          flight_number: "",
          from: "",
          to: "",
          departure_date: "",
          arrival_date: "",
          economy_seats: "",
          business_seats: "",
          first_seats: "",
        },
        validationSchema: Yup.object({
          flight_number: Yup.string().min(3, "min 3 characters").required("Required"),
          from: Yup.string().min(2, "min 3 characters").required("Required"),
          to: Yup.string().min(2, "min 3 characters").required("Required"),
          departure_date: Yup.date().required("Required"),
          arrival_date: Yup.date().required("Required"),
          economy_seats: Yup.number().min(0, "min 0"),
          business_seats: Yup.number().min(0, "min 0"),
          first_seats: Yup.number().min(0, "min 0"),
        }),
        onSubmit: async(values)=>{
            const newflight = {
                FlightNumber: formik.values.flight_number,
                From: formik.values.from,
                To: formik.values.to,
                DepartureDate: formik.values.departure_date,
                ArrivalDate: formik.values.arrival_date,
                EconomySeats: formik.values.economy_seats,
                BusinessSeats: formik.values.business_seats,
                FirstSeats: formik.values.first_seats,
              };
              const responce = await fetch(
                "http://localhost:5000/api/flights/createFlight",
                {
                  method: "POST",
                  body: JSON.stringify(newflight), // convert movie from JS object => JSON
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(("working"))
        }
    })
    const flightnumberclasses= formik.touched.flight_number &&formik.errors.flight_number? "error":""
    const fromclasses= formik.touched.from &&formik.errors.from? "error":""
    const toclasses= formik.touched.to &&formik.errors.to? "error":""
    const departuredateclasses= formik.touched.departure_date &&formik.errors.departure_date? "error":""
    const arrivaldateclasses= formik.touched.arrival_date &&formik.errors.arrival_date? "error":""
    const businessseatsclasses= formik.touched.business_seats &&formik.errors.business_seats? "error":""
    const economyseatsclasses= formik.touched.economy_seats &&formik.errors.economy_seats? "error":""
    const firstseatsclasses= formik.touched.first_seats &&formik.errors.first_seats? "error":""

    return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Create Flight</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="flight_number">
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
                {formik.touched.flight_number &&formik.errors.flight_number ? (
                  <p>{formik.errors.flight_number} </p>
                ) : null}
              </div>
              <div className="from">
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
                {formik.touched.from &&formik.errors.from}
              </div>
  
              <div className="to">
                <label htmlFor="to">To </label>
                <input
                  type="text"
                  name="to"
                  value={formik.values.to}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={toclasses}

                  placeholder="to"
                />
                {formik.touched.to &&formik.errors.to ? <p>{formik.errors.to} </p> : null}
              </div>
  
              <div className="departure_date">
                <label htmlFor="departure_date">Departure date </label>
                <input
                  type="datetime-local"
                  name="departure_date"
                  value={formik.values.departure_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={departuredateclasses}

                  placeholder="departure date"
                />
                {formik.touched.departure_date &&formik.errors.departure_date ? (
                  <p>{formik.errors.departure_date} </p>
                ) : null}
              </div>
              <div className="arrival_date">
                <label htmlFor="arrival_date">Arrival date </label>
                <input
                  type="datetime-local"
                  name="arrival_date"
                  value={formik.values.arrival_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={arrivaldateclasses}

                  placeholder="Arrival date"
                />
                {formik.touched.arrival_date &&formik.errors.arrival_date ? (
                  <p>{formik.errors.arrival_date} </p>
                ) : null}
              </div>
  
              <div className="business_seats">
                <label htmlFor="business_seats">Business seats</label>
                <input
                  type="number"
                  name="business_seats"
                  value={formik.values.business_seats}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={businessseatsclasses}

                  placeholder="business seats"
                />
                {formik.touched.business_seats &&formik.errors.business_seats ? (
                  <p>{formik.errors.business_seats} </p>
                ) : null}
              </div>
  
              <div className="economy_seats">
                <label htmlFor="economy_seats">Economy seats </label>
                <input
                  type="number"
                  name="economy_seats"
                  value={formik.values.economy_seats}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={economyseatsclasses}

                  placeholder="economy seats"
                />
                {formik.touched.economy_seats &&formik.errors.economy_seats ? (
                  <p>{formik.errors.economy_seats} </p>
                ) : null}
              </div>
              <div className="first_seats">
                <label htmlFor="first_seats">First seats </label>
                <input
                  type="number"
                  name="first_seats"
                  value={formik.values.first_seats}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={firstseatsclasses}

                  placeholder="first seats"
                />
                {formik.touched.first_seats && formik.errors.first_seats ? (
                  <p>{formik.errors.first_seats} </p>
                ) : null}
              </div>
              <div className="Create">
                <button type="submit">Create Flight</button>
              </div>
            </form>
          </div>
        </div>
      );
}

