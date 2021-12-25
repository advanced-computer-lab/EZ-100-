import React, { useState } from "react";
import { SeatBtn } from "./SeatBtn";
import classes from "./SeatPicker.module.css";

export const SeatPicker = (props) => {
  const { flight, trip, editingMode, reservedSeats } = props;

  let temp = 0;
  if (reservedSeats) {
    temp = reservedSeats.length;
  }
  const [counter, setCounter] = useState(temp);
  const [chosenSeats, setChosenSeats] = useState([]);
  // const seats = flight.SeatsAvailable;

  let resSeats = [];
  let maximumSeats = props.max;
  if (editingMode) {
    resSeats = reservedSeats;
    maximumSeats = reservedSeats.length;
  }

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

  const economySeats = flight.EconomySeatsAvailable;
  const businessSeats = flight.BusinessSeatsAvailable;
  const firstSeats = flight.FirstSeatsAvailable;

  return (
    <div className={classes.col}>
      <div className={classes.row}>
        {firstSeats.map((seat, index) => {
          const isGray = trip.cabin !== "First class";
          return (
            <div key={index} className={classes["row-item"]}>
              <p>F{index}</p>
              <SeatBtn
                isGray={isGray}
                max={maximumSeats}
                counter={counter}
                onAddSeat={addSeatsHandler}
                onRemoveSeat={removeSeatHandler}
                id={"F" + index}
                reserved={seat}
                reservedSeats={resSeats}
              ></SeatBtn>
            </div>
          );
        })}
      </div>
      <div className={classes.row}>
        {businessSeats.map((seat, index) => {
          const isGray = trip.cabin !== "Business";
          return (
            <div key={index} className={classes["row-item"]}>
              <p>B{index}</p>
              <SeatBtn
                isGray={isGray}
                max={maximumSeats}
                counter={counter}
                onAddSeat={addSeatsHandler}
                onRemoveSeat={removeSeatHandler}
                id={"B" + index}
                reserved={seat}
                reservedSeats={resSeats}
              ></SeatBtn>
            </div>
          );
        })}
      </div>
      <div className={classes.row}>
        {economySeats.map((seat, index) => {
          const isGray = trip.cabin !== "Economy";
          return (
            <div key={index} className={classes["row-item"]}>
              <p>E{index}</p>
              <SeatBtn
                isGray={isGray}
                max={maximumSeats}
                counter={counter}
                onAddSeat={addSeatsHandler}
                onRemoveSeat={removeSeatHandler}
                id={"E" + index}
                reserved={seat}
                reservedSeats={resSeats}
              ></SeatBtn>
            </div>
          );
        })}
      </div>
    </div>
  );
};
