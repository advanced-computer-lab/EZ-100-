import React, { useEffect, useState } from "react";

import LoadingSpinner from "../Components/UI/LoadingSpinner";
import Modal from "../Components/UI/Modal";
import { FlightInfo } from "../Components/Flights/FlightInfo";
import { UpdateFlight } from "../Components/Flights/UpdateFlight";

import useHttp from "../hooks/use-http";
import { getSingleFlight } from "../lib/api";

import { useParams } from "react-router-dom";

export const FlightDetails = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

  const showUpdateFormHandler = () => {
    setShowUpdateModal((state) => !state);
  };

  if (status === "completed" && loadedFlight) {
    return (
      <>
        {showUpdateModal ? (
          <Modal onClose={showUpdateFormHandler}>
            <UpdateFlight></UpdateFlight>
          </Modal>
        ) : null}
        <FlightInfo
          flight={loadedFlight}
          onUpdateButtonClicked={showUpdateFormHandler}
        />
      </>
    );
  } else {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
};
