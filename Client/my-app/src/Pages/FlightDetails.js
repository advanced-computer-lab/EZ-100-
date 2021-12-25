import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../store/auth-context";

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
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const {
    sendRequest,
    status,
    data: loadedFlight,
  } = useHttp(getSingleFlight, true);

  const {
    status: deleteStatus,
    sendRequest: sendDeleteRequest,
    data: deletedFlight,
  } = useHttp(deleteFlight);

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
    sendDeleteRequest({ flightId, token });
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (deleteStatus === "completed") {
      history.replace({
        pathname: "/flights",
        state: { notification: `Flight deleted successfully !` },
      });

      const deleteReservation = async (id) => {
        await fetch(
          `http://localhost:5000/api/reservations/deleteReservation/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      };
      // console.log(deletedFlight);
      let reservations = deletedFlight.departureReservations;
      for (let i = 0; i < deletedFlight.returnReservations; i++) {
        let found = false;
        for (let reservation of reservations) {
          if (reservation._id === deletedFlight.returnReservations[i]._id) {
            found = true;
            break;
          }
        }

        if (!found) {
          reservations.push(deletedFlight.returnReservations[i]);
        }
      }

      for (const reservation of reservations) {
        deleteReservation(reservation._id);
      }
    }
  }, [deleteStatus, deletedFlight, history, token]);

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
            <div style={{ padding: "1rem" }}>
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
