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
  const { trip, searchState } = props;
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
    if (searchState) {
      if (searchState.isDepartureFlight) {
        departurePrice = departureFlight.EconomyPrice;
      } else {
        returnPrice = returnFlight.EconomyPrice;
      }
    } else {
      departurePrice = departureFlight.EconomyPrice;
      returnPrice = returnFlight.EconomyPrice;
    }
  } else if (trip.cabin === "Business") {
    if (searchState) {
      if (searchState.isDepartureFlight) {
        departurePrice = departureFlight.BusinessPrice;
      } else {
        returnPrice = returnFlight.BusinessPrice;
      }
    } else {
      departurePrice = departureFlight.BusinessPrice;
      returnPrice = returnFlight.BusinessPrice;
    }
  } else {
    if (searchState) {
      if (searchState.isDepartureFlight) {
        departurePrice = departureFlight.FirstPrice;
      } else {
        returnPrice = returnFlight.FirstPrice;
      }
    } else {
      departurePrice = departureFlight.FirstPrice;
      returnPrice = returnFlight.FirstPrice;
    }
  }

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let departureDate = new Date();
  let returnDate = new Date();
  // console.log(searchState);
  if (searchState) {
    if (searchState.isDepartureFlight) {
      departureDate = new Date(departureFlight.DepartureDate);
      departureDate = {
        time: departureDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        longDate: departureDate.toLocaleDateString("en-US", options),
      };
    } else {
      returnDate = new Date(returnFlight.DepartureDate);
      returnDate = {
        longDate: returnDate.toLocaleDateString("en-US", options),
        time: returnDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    }
  } else {
    departureDate = new Date(departureFlight.DepartureDate);
    departureDate = {
      time: departureDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      longDate: departureDate.toLocaleDateString("en-US", options),
    };

    returnDate = new Date(returnFlight.DepartureDate);
    returnDate = {
      longDate: returnDate.toLocaleDateString("en-US", options),
      time: returnDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  let totalPrice = 0;
  if (searchState) {
    if (searchState.isDepartureFlight) {
      totalPrice = seatsNumber * departurePrice;
    } else {
      totalPrice = seatsNumber * returnPrice;
    }
  } else {
    totalPrice = seatsNumber * departurePrice + seatsNumber * returnPrice;
  }

  useEffect(() => {
    if (status === "completed" && !error) {
      history.push("/reservation");
    }
  }, [status, error, history]);

  const onCreateHandler = (event) => {
    event.preventDefault();

    if (authCtx.isLoggedIn) {
      if (searchState) {
        console.log(searchState.reservation);
        console.log(reservationCtx.departureFlight);
        console.log(reservationCtx.returnFlight);
      } else {
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
      }
    } else {
      setShowLogin(true);
    }
  };

  let departureSummary = null;
  let returnSummary = null;

  if (searchState) {
    if (searchState.isDepartureFlight) {
      departureSummary = (
        <div className={classes["cart-item"]}>
          <h2 style={{ alignSelf: "center" }}>
            {departureFlight.FlightNumber}
          </h2>
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
      );
    } else {
      returnSummary = (
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
      );
    }
  } else {
    departureSummary = (
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
    );

    returnSummary = (
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
    );
  }

  let cartItems;
  cartItems = (
    <div className={classes["cart-items"]}>
      <div
        style={{ justifyContent: "center" }}
        className={classes["cart-item"]}
      >
        <h2>Your reservation summary</h2>
      </div>
      {departureSummary}
      {returnSummary}
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
          <LoginPage inModal={true} hideModal={toggleLoginHandler}></LoginPage>
          {/* <Login onHideModal={toggleLoginHandler}></Login> */}
        </Modal>
      )}
      <div className={classes.container}>
        <div style={{ width: "100%" }}>
          {cartItems}
          <div className={classes.total}>
            <span>Total price = ${totalPrice}</span>

            <button onClick={onCreateHandler} type="button" className="btn">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
