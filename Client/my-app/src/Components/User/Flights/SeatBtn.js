import React, { useState } from "react";

import { MdEventSeat } from "react-icons/md";
import { IconContext } from "react-icons";

export const SeatBtn = (props) => {
  const { reserved } = props;
  let initialColor = reserved ? "red" : "green";

  const [color, setColor] = useState(initialColor);

  const clickHandler = () => {
    if (
      reserved ||
      (props.counter === props.max && color === "green") ||
      props.isGray
    ) {
      return;
    }

    if (color === "orange") {
      setColor("green");
      props.onRemoveSeat(props.id);
    } else if (color === "green") {
      setColor("orange");
      props.onAddSeat(props.id);
    }
  };

  return (
    <IconContext.Provider
      value={{ color: !props.isGray ? color : "gray", size: "30px" }}
    >
      <div onClick={clickHandler}>
        <MdEventSeat />
      </div>
    </IconContext.Provider>
  );
};
