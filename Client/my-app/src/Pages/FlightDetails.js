import React, { useEffect } from "react";

import LoadingSpinner from "../Components/UI/LoadingSpinner";
// import Modal from "../Components/UI/Modal";
import { FlightInfo } from "../Components/Flights/FlightInfo";
// import { UpdateFlight } from "../Components/Flights/UpdateFlight";

import useHttp from "../hooks/use-http";
import { getSingleFlight } from "../lib/api";

import { useParams } from "react-router-dom";

export const FlightDetails = () => {
  const params = useParams();
  const flightId = params.flightId;

  const {
    sendRequest,
    status,
    data: loadedFlight,
  } = useHttp(getSingleFlight, true);

  useEffect(() => {
    sendRequest(flightId);
  }, [sendRequest, flightId]);

  if (status === "completed" && loadedFlight) {
    return <FlightInfo flight={loadedFlight} />;
  } else {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
};
