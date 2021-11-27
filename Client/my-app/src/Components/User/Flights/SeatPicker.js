import React from "react";
import { SeatBtn } from "./SeatBtn";
import classes from "./SeatPicker.module.css";

export const SeatPicker = () => {
  const seats = [
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
  ];
  return (
    <div className={classes.row}>
      {seats.map((seat, index) => {
        return (
          <div key={index} className={classes["row-item"]}>
            <p>{index}</p>
            <SeatBtn reserved={seat}></SeatBtn>
          </div>
        );
      })}
    </div>
  );
};
