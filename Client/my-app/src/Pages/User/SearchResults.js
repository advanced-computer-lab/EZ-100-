import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";

import useHttp from "../../hooks/use-http";
import { getRoundTrip } from "../../lib/api";

export const SearchResults = () => {
  const history = useHistory();
  const historyState = history.location.state;

  const { sendRequest, status, data } = useHttp(getRoundTrip, true);

  let departureFlights;
  let returnFlights;
  if (data) {
    departureFlights = data.departureFlights;
    returnFlights = data.returnFlights;
    console.log(data);
  }

  useEffect(() => {
    sendRequest(historyState);
  }, [sendRequest, historyState]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ul>
        {departureFlights.map((flight) => (
          <li key={flight._id}>{flight.FlightNumber}</li>
        ))}
      </ul>
      <hr></hr>
      <ul>
        {returnFlights.map((flight) => (
          <li key={flight._id}>{flight.FlightNumber}</li>
        ))}
      </ul>
    </>
  );
};
