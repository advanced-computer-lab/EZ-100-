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
  const [page, setPage] = useState(1);
  const [isFlightsFetched, setIsFlightsFetched] = useState(false);
  const [allFlights, setAllFlights] = useState([]);

  const { sendRequest, status, error, data } = useHttp(getAllFlights, true);

  let loadedFlights;
  let flightsCount = 0;
  if (data) {
    loadedFlights = data.flights;
    flightsCount = data.count;
  }

  useEffect(() => {
    sendRequest("?limit=5");
  }, [sendRequest]);

  if (loadedFlights && !isFlightsFetched) {
    setIsFlightsFetched(true);
    setAllFlights([...loadedFlights]);
  }

  let pagesCount = 0;
  if (allFlights) {
    pagesCount = Math.ceil(flightsCount / 5); // Pagnition 5 items per page
  }

  const applyFilterHandler = (filter) => {
    let query = "";
    if (filter.from) {
      query += `From=${filter.from}`;
    }

    if (filter.to) {
      query += `&To=${filter.to}`;
    }

    if (filter.flightNumber) {
      query += `&FlightNumber=${filter.flightNumber}`;
    }

    if (filter.departure) {
      query += `&DepartureDate=${filter.departure}`;
    }

    if (filter.arrive) {
      query += `&ArrivalDate=${filter.arrive}`;
    }

    sendRequest("?" + query);
  };

  const paginationChangeHandler = (event, value) => {
    setPage(value);
    sendRequest(`?limit=5&page=${value}`);
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
        <FlightsFilter flights={allFlights} onFilter={applyFilterHandler} />
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
