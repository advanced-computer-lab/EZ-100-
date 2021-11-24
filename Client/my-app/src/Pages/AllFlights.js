import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Card from "../Components/UI/Card";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";

import useHttp from "../hooks/use-http";
import { getAllFlights } from "../lib/api";
import { FlightsList } from "../Components/Flights/FlightsList";
import { FlightsFilter } from "../Components/Flights/FlightsFilter";

export const AllFlights = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(1);

  const [showDelNotification, setShowDelNotification] = useState(false);

  // let historyState;
  // if (history.location.state) {
  //   historyState = history.location.state;
  // }
  const historyState = history.location.state;
  useEffect(() => {
    let timer;
    if (historyState) {
      setShowDelNotification(true);

      timer = setTimeout(() => {
        setShowDelNotification(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [historyState]);

  const { sendRequest, status, error, data } = useHttp(getAllFlights, true);

  let loadedFlights;
  let flightsCount = 0;
  if (data) {
    loadedFlights = data.flights;
    flightsCount = data.count;
  }

  useEffect(() => {
    if (!location.search) {
      sendRequest("?limit=5&page=1");
      console.log("AllFlights fetched Flights");
    }
  }, [sendRequest, location]);

  let pagesCount = 0;
  pagesCount = Math.ceil(flightsCount / 5); // Pagnition 5 items per page

  const applyFilterHandler = (filter) => {
    let query = "?limit=5&page=1";
    if (filter.from) {
      query += `&From=${filter.from}`;
    }

    // if (filter.terminal) {
    //   query += `&TerminalNumber=${filter.terminal}`;
    // }

    if (filter.to) {
      query += `&To=${filter.to}`;
    }

    if (filter.flightNumber) {
      query += `&FlightNumber=${filter.flightNumber}`;
    }

    if (filter.departure) {
      const nextDay = new Date(filter.departure);
      nextDay.setDate(nextDay.getDate() + 1);
      query += `&DepartureDate[$gte]=${
        filter.departure
      }&DepartureDate[$lt]=${nextDay.toISOString().substring(0, 10)}`;
      // query += `&DepartureDate=${filter.departure}`;
    }

    if (filter.arrive) {
      const nextDay = new Date(filter.arrive);
      nextDay.setDate(nextDay.getDate() + 1);
      query += `&ArrivalDate[$gte]=${filter.arrive}&ArrivalDate[$lt]=${nextDay
        .toISOString()
        .substring(0, 10)}`;
      // query += `&ArrivalDate=${filter.arrive}`;
    }

    history.push(query);
    sendRequest(query);
  };

  const paginationChangeHandler = (event, value) => {
    if (page !== value) {
      setPage(value);

      if (!location.search) {
        sendRequest(`?limit=5&page=${value}`);
      } else {
        sendRequest(location.search + `&limit=5&page=${value}`);
      }
    }
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
      <div className="centered">
        <Card>
          <FlightsFilter
            onFilter={applyFilterHandler}
            allFlights={props.allFlights}
          />
          <div className="mui-notification">
            <Alert severity="info">No flights available to display!</Alert>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="centered">
      <Card>
        <FlightsFilter
          onFilter={applyFilterHandler}
          allFlights={props.allFlights}
        />

        {showDelNotification && historyState.notification && (
          <Alert severity="success">{historyState.notification}</Alert>
        )}

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
