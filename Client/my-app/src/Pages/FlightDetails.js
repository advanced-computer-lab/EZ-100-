import React, { useEffect, useState } from "react";

import LoadingSpinner from "../Components/UI/LoadingSpinner";
import Modal from "../Components/UI/Modal";
import { FlightInfo } from "../Components/Flights/FlightInfo";
import { UpdateFlight } from "../Components/Flights/UpdateFlight";

import useHttp from "../hooks/use-http";
import { getSingleFlight, deleteFlight } from "../lib/api";

import { useParams, useHistory } from "react-router-dom";

export const FlightDetails = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const params = useParams();
  const history = useHistory();
  const flightId = params.flightId;

  const {
    sendRequest,
    status,
    data: loadedFlight,
  } = useHttp(getSingleFlight, true);

  const { status: deleteStatus, sendRequest: sendDeleteRequest } =
    useHttp(deleteFlight);

  useEffect(() => {
    sendRequest(flightId);
  }, [sendRequest, flightId]);

  const showUpdateFormHandler = () => {
    setShowUpdateModal((state) => !state);
  };

  const showDeleteModalhandler = () => {
    setShowDeleteModal((state) => !state);
  };

  const confirmDeleteHandler = (event) => {
    event.preventDefault();
    sendDeleteRequest(flightId);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (deleteStatus === "completed") {
      history.replace("/flights");
    }
  }, [deleteStatus, history]);

  if (deleteStatus === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedFlight) {
    return (
      <>
        {showUpdateModal ? (
          <Modal onClose={showUpdateFormHandler}>
            <UpdateFlight flight={loadedFlight}></UpdateFlight>
          </Modal>
        ) : null}

        {showDeleteModal ? (
          <Modal onClose={showDeleteModalhandler}>
            <div>
              <h2>
                Are you sure you want to delete flight{" "}
                {loadedFlight.FlightNumber} ?
              </h2>
              <button onClick={showDeleteModalhandler} className="btn--flat">
                Cancel
              </button>
              <button
                className="del-btn"
                style={{ margin: "10px", fontSize: "1rem" }}
                onClick={confirmDeleteHandler}
              >
                Yes
              </button>
            </div>
          </Modal>
        ) : null}

        <FlightInfo
          flight={loadedFlight}
          onUpdateButtonClicked={showUpdateFormHandler}
          onDeleteButtonClicked={showDeleteModalhandler}
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
