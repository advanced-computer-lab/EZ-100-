import React, { useState } from "react";
import { SeatBtn } from "./SeatBtn";
import classes from "./SeatPicker.module.css";

export const SeatPicker = (props) => {
  const { flight } = props;
  const [counter, setCounter] = useState(0);
  const [chosenSeats, setChosenSeats] = useState([]);
  const seats = flight.SeatsAvailable;
  console.log(flight.SeatsAvailable);

  const addSeatsHandler = (id) => {
    setCounter((count) => count + 1);
    setChosenSeats([...chosenSeats, id]);
    props.onSeatsChange([...chosenSeats, id]);
  };

  const removeSeatHandler = (id) => {
    setCounter((count) => count - 1);
    const temp = chosenSeats.filter((item) => item !== id);
    setChosenSeats(temp);
    props.onSeatsChange(temp);
  };

  return (
    <div className={classes.row}>
      {seats.map((seat, index) => {
        return (
          <div key={index} className={classes["row-item"]}>
            <p>{index}</p>
            <SeatBtn
              max={props.max}
              counter={counter}
              onAddSeat={addSeatsHandler}
              onRemoveSeat={removeSeatHandler}
              id={index}
              reserved={seat}
            ></SeatBtn>
          </div>
        );
      })}
    </div>
  );
};
