import Modal from "../Components/UI/Modal";
import classes from "./ViewReservedFlights.module.css";
import Card from "../Components/UI/Card";
import { useState , useEffect } from "react";
import { Backdrop } from "@mui/material";
import {ReservationItem} from "../Components/User/Flights/ReservationItem";
export const ViewReservedFlights = () => {
  const[deleteId,setDeleteId]=useState("");
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  //const reservation = ["r1", "r2", "r3"];

  function onCancelHandler(id){
    console.log(id);
    setDeleteId(id);
    setModalIsOpen(true);

  }
  async function deleteHandler(){
     await fetch(
      `http://localhost:5000/api/reservations/deleteReservation/${deleteId}`,
      {
        method: "DELETE",
      }
    );
    setModalIsOpen(false);
  }
  /*const response = await fetch(
    `${DOMAIN}/api/flights/deleteFlight/${flightId}`,
    {
      method: "DELETE",
    }
  );*/

  const [reservation, setReservation] = useState([]);





  function CancelReservationHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  useEffect( async () =>{
    const response = await fetch(
      `http://localhost:5000/api/reservations/userReservations/61a4ff997630339cd3b786ae`
    );

    const data = await response.json();

    console.log(data.data);

    setReservation(data.data);

  },[])

 

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
      <ul>
      {reservation.map((reservation) => (
        <ReservationItem key={reservation._id} reservation={reservation} onCancel={onCancelHandler}></ReservationItem>
        
      ))}
    </ul>
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