import React, { useReducer } from "react";
import ReservationContext from "./reservation-context";

const defaultState = {
  departureFlight: undefined,
  returnFlight: undefined,
};

const reducerFn = (state, action) => {
  if (action.type === "SET_DEPARTURE") {
    console.log("Setting departure flight");
    return { ...state, departureFlight: action.flight };
  } else if (action.type === "SET_RETURN") {
    console.log("Setting return flight");
    return { ...state, returnFlight: action.flight };
  } else {
    return state;
  }
};

const ReservationProvider = (props) => {
  const [reservationState, dispatch] = useReducer(reducerFn, defaultState);

  const setDepartureFlight = (flight) => {
    dispatch({ type: "SET_DEPARTURE", flight });
  };

  const setReturnFlight = (flight) => {
    dispatch({ type: "SET_RETURN", flight });
  };

  const reservationContext = {
    departureFlight: reservationState.departureFlight,
    returnFlight: reservationState.returnFlight,
    setDepartureFlight,
    setReturnFlight,
  };

  return (
    <ReservationContext.Provider value={reservationContext}>
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
