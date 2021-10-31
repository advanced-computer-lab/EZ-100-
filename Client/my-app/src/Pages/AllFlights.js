import React, { useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Modal from "../Components/UI/Modal";
import Card from "../Components/UI/Card";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { FlightItem } from "../Components/Flights/FlightItem";

import useHttp from "../hooks/use-http";
import { getAllFlights } from "../lib/api";

export const AllFlights = () => {
  const match = useRouteMatch();
  console.log(match);

  const {
    sendRequest,
    status,
    data: loadedFlights,
  } = useHttp(getAllFlights, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (loadedFlights) {
    return (
      <div className="centered">
        <Route path="/flights/:flightId">
          <Modal />
        </Route>

        <Card>
          {loadedFlights.map((flight) => (
            <FlightItem key={flight.id} flight={flight} />
          ))}
        </Card>
      </div>
    );
  } else {
    return (
      <div className="centerd">
        <Card></Card>
      </div>
    );
  }
};
