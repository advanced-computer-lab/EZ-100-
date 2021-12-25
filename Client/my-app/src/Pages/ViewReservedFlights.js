import Modal from "../Components/UI/Modal";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

import AuthContext from "../store/auth-context";

import { useState, useEffect, useContext } from "react";

// import { ReservationItem } from "../Components/User/Flights/ReservationItem";
import { AccordionItem } from "../Components/User/Reservations/AccordionItem";

export const ViewReservedFlights = () => {
  const [deleteId, setDeleteId] = useState("");
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [didDelete, setDidDelete] = useState(false);
  const [initialFetch, setInitialFetch] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
          `http://localhost:5000/api/reservations/userReservations/${authCtx.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
  }, [ModalIsOpen, didDelete, initialFetch, authCtx, token]);

  // const listItems =
  //   reservations === [] ? null : (
  //     <ul>
  //       {reservations.map((reservation) => (
  //         <ReservationItem
  //           key={reservation._id}
  //           reservation={reservation}
  //           onCancel={onCancelHandler}
  //         ></ReservationItem>
  //       ))}
  //     </ul>
  //   );

  const listItems2 =
    reservations === [] ? null : (
      <ul>
        {reservations.map((reservation) => (
          <AccordionItem
            key={reservation._id}
            reservation={reservation}
            onCancel={onCancelHandler}
          ></AccordionItem>
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
      {/* {listItems} */}
      {listItems2}
    </div>
  );
};
