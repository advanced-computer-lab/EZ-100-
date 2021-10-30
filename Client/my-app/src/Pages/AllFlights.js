import React, { useEffect } from "react";

// import Modal from "../Components/UI/Modal";
import Card from "../Components/UI/Card";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { getAllFlights } from "../lib/api";

export const AllFlights = () => {
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
          {loadedFlights.map((flight) => (
            <div key={flight.id}>{flight.name}</div>
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
