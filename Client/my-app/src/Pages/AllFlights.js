import React, { useEffect } from "react";
// import { useRouteMatch } from "react-router-dom";

import Card from "../Components/UI/Card";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import Alert from "@mui/material/Alert";

import useHttp from "../hooks/use-http";
import { getAllFlights } from "../lib/api";
import { FlightsList } from "../Components/Flights/FlightsList";

export const AllFlights = () => {
  // const match = useRouteMatch();
  // console.log(match);

  const {
    sendRequest,
    status,
    error,
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

  if (error) {
    return (
      <div className="mui-notification">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  if (
    status === "completed" &&
    (!loadedFlights || loadedFlights.length === 0)
  ) {
    return (
      <div className="mui-notification">
        <Alert severity="info">No flights available to display!</Alert>
      </div>
    );
  }

  return (
    <div className="centered">
      <Card>
        <FlightsList flights={loadedFlights}></FlightsList>
      </Card>
    </div>
  );
};
