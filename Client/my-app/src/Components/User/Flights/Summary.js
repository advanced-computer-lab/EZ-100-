import React, { useContext, useState, useEffect } from "react";
import classes from "./Summary.module.css";

import { useHistory } from "react-router-dom";

import Modal from "../../UI/Modal";
import LoadingSpinner from "../../UI/LoadingSpinner";

import { FaPlaneDeparture } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";

import ReservationContext from "../../../store/reservation-context";
import AuthContext from "../../../store/auth-context";

import useHttp from "../../../hooks/use-http";
import { createReservation } from "../../../lib/api";
// import Login from "../Account/Login";
import { LoginPage } from "../../../Pages/Auth/LoginPage";

export const Summary = (props) => {
  const { trip } = props;
  const [showLogin, setShowLogin] = useState(false);

  const { sendRequest, status, error } = useHttp(createReservation);

  const seatsNumber = parseInt(trip.adultsNum) + parseInt(trip.childrenNum);

  const authCtx = useContext(AuthContext);

  const reservationCtx = useContext(ReservationContext);
  const { departureFlight, returnFlight, departureSeats, returnSeats } =
    reservationCtx;

  const history = useHistory();

  let departurePrice;
  let returnPrice;
  if (trip.cabin === "Economy") {
    departurePrice = departureFlight.EconomyPrice;
    returnPrice = returnFlight.EconomyPrice;
  } else if (trip.cabin === "Business") {
    departurePrice = departureFlight.BusinessPrice;
    returnPrice = returnFlight.BusinessPrice;
  } else {
    departurePrice = departureFlight.FirstPrice;
    returnPrice = returnFlight.FirstPrice;
  }

  let departureDate = new Date(departureFlight.DepartureDate);
  let returnDate = new Date(returnFlight.DepartureDate);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  departureDate = {
    time: departureDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    longDate: departureDate.toLocaleDateString("en-US", options),
  };

  returnDate = {
    longDate: returnDate.toLocaleDateString("en-US", options),
    time: returnDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const totalPrice = seatsNumber * departurePrice + seatsNumber * returnPrice;

  useEffect(() => {
    if (status === "completed" && !error) {
      history.push("/reservation");
    }
  }, [status, error, history]);

  const onCreateHandler = (event) => {
    event.preventDefault();

    if (authCtx.isLoggedIn) {
      let depSeats = [];
      let arrivalSeats = [];
      for (const seat of departureSeats) {
        const temp = parseInt(seat.slice(1));
        depSeats.push(temp);
      }

      for (const seat of returnSeats) {
        const temp = parseInt(seat.slice(1));
        arrivalSeats.push(temp);
      }

      // console.log("user == " + authCtx.user._id);
      const reservation = {
        user: authCtx.user._id,
        totalPrice,
        cabin: trip.cabin !== "First class" ? trip.cabin : "First",
        departureFlight: departureFlight._id,
        arrivalFlight: returnFlight._id,
        departureSeats: depSeats,
        arrivalSeats,
      };

      sendRequest(reservation);
    } else {
      setShowLogin(true);
    }
  };

  const cartItems = (
    <div className={classes["cart-items"]}>
      <div
        style={{ justifyContent: "center" }}
        className={classes["cart-item"]}
      >
        <h2>Your reservation summary</h2>
      </div>

      <div className={classes["cart-item"]}>
        <h2 style={{ alignSelf: "center" }}>{departureFlight.FlightNumber}</h2>
        <div className={classes["content-col"]}>
          <label>
            Depart <FaPlaneDeparture />
          </label>
          <span>{departureDate.longDate}</span>
          <span>{departureDate.time}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>Cabin</label>
          <span>{trip.cabin}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>
            Chosen seats <MdEventSeat />
          </label>
          <div className={classes["wrap-row"]}>
            {departureSeats.map((seat) => (
              <span key={seat}>{seat}</span>
            ))}
          </div>
        </div>

        <div className={classes["content-col"]}>
          <label>Price</label>
          <span className={classes.price}>${departurePrice}</span>
        </div>
        <div className={classes["content-col"]}>
          <label>Amount</label>
          <span style={{ alignSelf: "center" }} className={classes.amount}>
            x{seatsNumber}
          </span>
        </div>
      </div>

      <div className={classes["cart-item"]}>
        <h2 style={{ alignSelf: "center" }}>{returnFlight.FlightNumber}</h2>
        <div className={classes["content-col"]}>
          <label>
            Depart <FaPlaneDeparture />
          </label>
          <span>{returnDate.longDate}</span>
          <span>{returnDate.time}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>Cabin</label>
          <span>{trip.cabin}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>
            Chosen seats <MdEventSeat />
          </label>
          <div className={classes["wrap-row"]}>
            {returnSeats.map((seat) => (
              <span key={seat}>{seat}</span>
            ))}
          </div>
        </div>

        <div className={classes["content-col"]}>
          <label>Price</label>
          <span className={classes.price}>${returnPrice}</span>
        </div>

        <div className={classes["content-col"]}>
          <label>Amount</label>
          <span style={{ alignSelf: "center" }} className={classes.amount}>
            x{seatsNumber}
          </span>
        </div>
      </div>
    </div>
  );

  const toggleLoginHandler = () => {
    setShowLogin(false);
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {showLogin && (
        <Modal onClose={toggleLoginHandler}>
          <LoginPage inModal={true}></LoginPage>
          {/* <Login onHideModal={toggleLoginHandler}></Login> */}
        </Modal>
      )}
      <div className={classes.container}>
        <div style={{ width: "100%" }}>
          {cartItems}
          <div className={classes.total}>
            <span>Total price = ${totalPrice}</span>

            <button onClick={onCreateHandler} type="button" className="btn">
              Book trip
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
