import React, { useReducer } from "react";
import ReservationContext from "./reservation-context";

const defaultState = {
  departureFlight: undefined,
  returnFlight: undefined,
  departureSeats: [],
  returnSeats: [],
};

const reducerFn = (state, action) => {
  if (action.type === "SET_DEPARTURE") {
    console.log("Setting departure flight");
    return { ...state, departureFlight: action.flight };
  }

  if (action.type === "SET_RETURN") {
    console.log("Setting return flight");
    return { ...state, returnFlight: action.flight };
  }

  if (action.type === "SET_D_SEATS") {
    return { ...state, departureSeats: action.seats };
  }

  if (action.type === "SET_R_SEATS") {
    return { ...state, returnSeats: action.seats };
  }

  return state;
};

const ReservationProvider = (props) => {
  const [reservationState, dispatch] = useReducer(reducerFn, defaultState);

  const setDepartureFlight = (flight) => {
    dispatch({ type: "SET_DEPARTURE", flight });
  };

  const setDepartureSeats = (seats) => {
    dispatch({ type: "SET_D_SEATS", seats });
  };

  const setReturnFlight = (flight) => {
    dispatch({ type: "SET_RETURN", flight });
  };

  const setReturnSeats = (seats) => {
    dispatch({ type: "SET_R_SEATS", seats });
  };

  const reservationContext = {
    departureFlight: reservationState.departureFlight,
    returnFlight: reservationState.returnFlight,
    departureSeats: reservationState.departureSeats,
    returnSeats: reservationState.returnSeats,
    setDepartureFlight,
    setReturnFlight,
    setDepartureSeats,
    setReturnSeats,
  };

  return (
    <ReservationContext.Provider value={reservationContext}>
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
