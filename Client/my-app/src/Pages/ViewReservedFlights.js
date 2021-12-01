import Modal from "../Components/UI/Modal";
import { useState, useEffect } from "react";

import { ReservationItem } from "../Components/User/Flights/ReservationItem";
export const ViewReservedFlights = () => {
  const [deleteId, setDeleteId] = useState("");
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [reservations, setReservations] = useState([]);

  function onCancelHandler(id) {
    setDeleteId(id);
    setModalIsOpen(true);
  }

  async function deleteHandler() {
    await fetch(
      `http://localhost:5000/api/reservations/deleteReservation/${deleteId}`,
      {
        method: "DELETE",
      }
    );
    setModalIsOpen(false);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/reservations/userReservations/61a4ff997630339cd3b786ae`
      );

      const data = await response.json();

      setReservations(data.data);
    };

    fetchData();
  }, []);

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

  return (
    <div>
      {ModalIsOpen ? (
        <Modal>
          <h2>Are you sure you want to Cancel this reservation?</h2>
          <button onClick={closeModalHandler}>Cancel</button>
          <button
            style={{ margin: "10px", fontSize: "1rem" }}
            onClick={deleteHandler}
          >
            Yes
          </button>
        </Modal>
      ) : null}

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
