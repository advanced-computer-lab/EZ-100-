import React from "react";

const ReservationContext = React.createContext({
  departureFlight: undefined,
  returnFlight: undefined,
  setDepartureFlight: (flight) => {},
  setReturnFlight: (flight) => {},
});

export default ReservationContext;
