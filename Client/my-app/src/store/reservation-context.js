import React from "react";

const ReservationContext = React.createContext({
  departureFlight: undefined,
  returnFlight: undefined,
  departureSeats: undefined,
  returnSeats: undefined,
  setDepartureFlight: (flight) => {},
  setReturnFlight: (flight) => {},
  setDepartureSeats: (seats) => {},
  setReturnSeats: (seats) => {},
});

export default ReservationContext;
