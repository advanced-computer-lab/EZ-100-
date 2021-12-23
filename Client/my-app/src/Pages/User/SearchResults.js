import React, { useEffect, useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import ReservationContext from "../../store/reservation-context";

import { ReservationNav } from "../../Components/User/Flights/ReservationNav";
import { UserFlights } from "../../Components/User/Flights/UserFlights";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";
import { ItemHeader } from "../../Components/User/Flights/ItemHeader";

import { SeatPicker } from "../../Components/User/Flights/SeatPicker";
import { Summary } from "../../Components/User/Flights/Summary";

import useHttp from "../../hooks/use-http";
import { getRoundTrip } from "../../lib/api";

export const SearchResults = () => {
  const [selector, setSelector] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const historyState = history.location.state.data;
  const searchState = history.location.state.searchState;
  // console.log(searchState);

  const reservationCtx = useContext(ReservationContext);

  const { sendRequest, status, data } = useHttp(getRoundTrip, true);

  let departureFlights;
  let returnFlights;
  if (data) {
    departureFlights = data.departureFlights;
    returnFlights = data.returnFlights;
    // console.log(data);
  }

  useEffect(() => {
    sendRequest(historyState);
  }, [sendRequest, historyState]);

  const departureSeatsHandler = (seats) => {
    console.log("Departure seats = " + seats);
    reservationCtx.setDepartureSeats(seats);
  };

  const returnSeatsHandler = (seats) => {
    console.log("Return seats = " + seats);
    reservationCtx.setReturnSeats(seats);
  };

  const onPreviousHandler = () => {
    if (selector > 1) {
      setSelector((state) => state - 1);
    }
  };

  const onContinueHandler = () => {
    if (selector === 1 && searchState) {
      if (searchState.isDepartureFlight && !reservationCtx.departureFlight) {
        setErrorMessage("Please select a flight");
        return;
      } else {
        setErrorMessage("");
      }

      if (!searchState.isDepartureFlight && !reservationCtx.returnFlight) {
        setErrorMessage("Please select a flight");
        return;
      } else {
        setErrorMessage("");
      }
    }

    if (
      selector === 1 &&
      !searchState &&
      (!reservationCtx.departureFlight || !reservationCtx.returnFlight)
    ) {
      setErrorMessage("Please select a departure flight and a return flight*");
      return;
    }

    if (
      selector === 1 &&
      reservationCtx.departureFlight &&
      reservationCtx.returnFlight
    ) {
      setErrorMessage("");
    }

    if (selector === 2) {
      const seatsNumber =
        parseInt(historyState.adultsNum) + parseInt(historyState.childrenNum);

      if (searchState) {
        if (
          searchState.isDepartureFlight &&
          seatsNumber !== reservationCtx.departureSeats.length
        ) {
          setErrorMessage(`Please pick ${seatsNumber} seat(s).*`);
          return;
        }
        if (
          !searchState.isDepartureFlight &&
          seatsNumber !== reservationCtx.returnSeats.length
        ) {
          setErrorMessage(`Please pick ${seatsNumber} seat(s).*`);
          return;
        } else {
          setErrorMessage("");
        }
      } else if (
        (!searchState &&
          seatsNumber !== reservationCtx.departureSeats.length) ||
        seatsNumber !== reservationCtx.returnSeats.length
      ) {
        setErrorMessage(`Please pick ${seatsNumber} seat(s) in BOTH flights *`);
        return;
      } else {
        setErrorMessage("");
      }
    }

    if (selector < 3) {
      setSelector((state) => state + 1);
    }
  };

  let content;
  if (selector === 1) {
    if (searchState) {
      if (searchState.isDepartureFlight) {
        content = (
          <>
            <div
              style={{ marginBottom: "-2rem", marginTop: "-2rem" }}
              className="centered"
            >
              <ItemHeader
                from={historyState.fromValue}
                to={historyState.toValue}
              />
            </div>
            <div className="centered">
              <UserFlights flights={departureFlights}></UserFlights>
            </div>
          </>
        );
      } else {
        content = (
          <>
            <div style={{ marginBottom: "-2rem" }} className="centered">
              <ItemHeader
                from={historyState.toValue}
                to={historyState.fromValue}
              />
            </div>
            <div className="centered">
              <UserFlights flights={returnFlights}></UserFlights>
            </div>
          </>
        );
      }
    } else {
      content = (
        <>
          <div
            style={{ marginBottom: "-2rem", marginTop: "-2rem" }}
            className="centered"
          >
            <ItemHeader
              from={historyState.fromValue}
              to={historyState.toValue}
            />
          </div>
          <div className="centered">
            <UserFlights flights={departureFlights}></UserFlights>
          </div>
          <hr></hr>
          <div style={{ marginBottom: "-2rem" }} className="centered">
            <ItemHeader
              from={historyState.toValue}
              to={historyState.fromValue}
            />
          </div>
          <div className="centered">
            <UserFlights flights={returnFlights}></UserFlights>
          </div>
        </>
      );
    }
  }

  if (selector === 2) {
    const seatsNumber =
      parseInt(historyState.adultsNum) + parseInt(historyState.childrenNum);

    if (searchState) {
      if (searchState.isDepartureFlight) {
        content = (
          <div className="centered">
            <div className="centered-half">
              <h3>
                Choose your {seatsNumber} seat(s) in the departure flight:
              </h3>
              <SeatPicker
                trip={historyState}
                flight={reservationCtx.departureFlight}
                max={seatsNumber}
                onSeatsChange={departureSeatsHandler}
              />
            </div>
          </div>
        );
      } else {
        content = (
          <div className="centered">
            <div className="centered-half">
              <h3>Choose your {seatsNumber} seat(s) in the return flight:</h3>
              <SeatPicker
                trip={historyState}
                flight={reservationCtx.returnFlight}
                max={seatsNumber}
                onSeatsChange={returnSeatsHandler}
              />
            </div>
          </div>
        );
      }
    } else {
      content = (
        <div className="centered">
          <div className="centered-half">
            <h3>Choose your {seatsNumber} seat(s) in the departure flight:</h3>
            <SeatPicker
              trip={historyState}
              flight={reservationCtx.departureFlight}
              max={seatsNumber}
              onSeatsChange={departureSeatsHandler}
            />
          </div>
          <div className="centered-half">
            <h3>Choose your {seatsNumber} seat(s) in the return flight:</h3>
            <SeatPicker
              trip={historyState}
              flight={reservationCtx.returnFlight}
              max={seatsNumber}
              onSeatsChange={returnSeatsHandler}
            />
          </div>
        </div>
      );
    }
  }

  if (selector === 3) {
    content = <Summary trip={historyState} searchState={searchState}></Summary>;
  }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="centered">
        <ReservationNav
          errorMessage={errorMessage}
          onPreviousHandler={onPreviousHandler}
          onContinueClicked={onContinueHandler}
          selector={selector}
        ></ReservationNav>
      </div>
      {content}
    </>
  );
};
