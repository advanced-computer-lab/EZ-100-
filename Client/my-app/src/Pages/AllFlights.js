import React, { useEffect, useState } from "react";
// import { useRouteMatch } from "react-router-dom";

import Card from "../Components/UI/Card";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";

import useHttp from "../hooks/use-http";
import { getAllFlights } from "../lib/api";
import { FlightsList } from "../Components/Flights/FlightsList";
import { FlightsFilter } from "../Components/Flights/FlightsFilter";

export const AllFlights = () => {
  // const match = useRouteMatch();
  // console.log(match);
  const [page, setPage] = useState(1);

  const {
    sendRequest,
    status,
    error,
    data: loadedFlights,
  } = useHttp(getAllFlights, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let pagesCount = 0;
  if (loadedFlights) {
    pagesCount = Math.ceil(loadedFlights.length / 5); // Pagnition 5 items per page
  }

  const paginationChangeHandler = (event, value) => {
    setPage(value);
    // sendRequest("?limit=5");
  };

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
        <FlightsFilter flights={loadedFlights} />
        <FlightsList flights={loadedFlights}></FlightsList>
        <div className="centered">
          <Pagination
            count={pagesCount}
            onChange={paginationChangeHandler}
            page={page}
          />
        </div>
      </Card>
    </div>
  );
};
