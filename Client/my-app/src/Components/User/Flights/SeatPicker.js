import React, { useState } from "react";
import { SeatBtn } from "./SeatBtn";
import classes from "./SeatPicker.module.css";

export const SeatPicker = (props) => {
  const { flight, trip } = props;
  const [counter, setCounter] = useState(0);
  const [chosenSeats, setChosenSeats] = useState([]);
  // const seats = flight.SeatsAvailable;

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
                max={props.max}
                counter={counter}
                onAddSeat={addSeatsHandler}
                onRemoveSeat={removeSeatHandler}
                id={"F" + index}
                reserved={seat}
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
                max={props.max}
                counter={counter}
                onAddSeat={addSeatsHandler}
                onRemoveSeat={removeSeatHandler}
                id={"B" + index}
                reserved={seat}
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
                max={props.max}
                counter={counter}
                onAddSeat={addSeatsHandler}
                onRemoveSeat={removeSeatHandler}
                id={"E" + index}
                reserved={seat}
              ></SeatBtn>
            </div>
          );
        })}
      </div>
    </div>
  );

  // return (
  //   <div className={classes.row}>
  //     {seats.map((seat, index) => {
  //       let isGray;
  //       if (
  //         trip.cabin === "Economy" &&
  //         index + 1 < flight.FirstSeats + flight.BusinessSeats
  //       ) {
  //         isGray = true;
  //       } else if (
  //         trip.cabin === "Business" &&
  //         (index < flight.EconomySeats ||
  //           index + 1 > flight.EconomySeats + flight.BusinessSeats)
  //       ) {
  //         isGray = true;
  //       } else if (
  //         trip.cabin === "First class" &&
  //         index + 1 > flight.FirstSeats
  //       ) {
  //         isGray = true;
  //       }
  //       return (
  //         <div key={index} className={classes["row-item"]}>
  //           <p>{index}</p>
  //           <SeatBtn
  //             isGray={isGray}
  //             max={props.max}
  //             counter={counter}
  //             onAddSeat={addSeatsHandler}
  //             onRemoveSeat={removeSeatHandler}
  //             id={index}
  //             reserved={seat}
  //           ></SeatBtn>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};
