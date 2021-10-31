import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import Card from "../Components/UI/Card";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { getAllFlights } from "../lib/api";
import { FlightsList } from "../Components/Flights/FlightsList";

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
        <Card>
          <FlightsList flights={loadedFlights}></FlightsList>
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
