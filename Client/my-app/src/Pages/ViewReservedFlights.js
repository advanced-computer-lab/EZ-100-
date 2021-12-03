import Modal from "../Components/UI/Modal";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

import AuthContext from "../store/auth-context";

import { useState, useEffect, useContext } from "react";

import { ReservationItem } from "../Components/User/Flights/ReservationItem";
export const ViewReservedFlights = () => {
  const [deleteId, setDeleteId] = useState("");
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [didDelete, setDidDelete] = useState(false);
  const [initialFetch, setInitialFetch] = useState(false);

  const authCtx = useContext(AuthContext);

  function onCancelHandler(id) {
    setDeleteId(id);
    setModalIsOpen(true);
  }

  async function deleteHandler() {
    setModalLoading(true);
    await fetch(
      `http://localhost:5000/api/reservations/deleteReservation/${deleteId}`,
      {
        method: "DELETE",
      }
    );

    setModalLoading(false);
    setModalIsOpen(false);
    setDidDelete(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/reservations/userReservations/${authCtx.user._id}`
        );

        const data = await response.json();

        setReservations(data.data);
        setIsLoading(false);
      };

      if (!initialFetch) {
        fetchData();
        setInitialFetch(true);
      } else if (!ModalIsOpen && didDelete) {
        fetchData();
        setDidDelete(false);
      }
    }
  }, [ModalIsOpen, didDelete, initialFetch, authCtx]);

  const listItems =
    reservations === [] ? null : (
      <ul>
        {reservations.map((reservation) => (
          <ReservationItem
            key={reservation._id}
            reservation={reservation}
            onCancel={onCancelHandler}
          ></ReservationItem>
        ))}
      </ul>
    );

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {ModalIsOpen ? (
        <Modal onClose={closeModalHandler}>
          {!modalLoading && (
            <>
              <h2>Are you sure you want to Cancel this reservation?</h2>
              <button
                style={{ margin: "10px" }}
                className="btn--flat"
                onClick={closeModalHandler}
              >
                Cancel
              </button>
              <button className="btn" onClick={deleteHandler}>
                Yes
              </button>
            </>
          )}

          {modalLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}
        </Modal>
      ) : null}

      <div style={{ marginBottom: "-10px" }} className="centered">
        <h2>Your reservations</h2>
      </div>
      <hr />
      {listItems}
    </div>
  );
};

/*{ModalIsOpen ? (
  <Modal>
    <h2>Are you sure you want to delete this flight?</h2>
    <button onClick={closeModalHandler}>Cancel</button>
    <button
      style={{ margin: "10px", fontSize: "1rem" }}
      onClick={closeModalHandler}
    >
      Yes
    </button>
  </Modal>
) : null}
{ModalIsOpen && <Backdrop onClick={closeModalHandler} />}*/
