import React, { useState } from "react";

import { MdEventSeat } from "react-icons/md";
import { IconContext } from "react-icons";

export const SeatBtn = (props) => {
  const { reserved } = props;
  let initialColor = reserved ? "red" : "green";

  const [color, setColor] = useState(initialColor);

  const clickHandler = () => {
    if (reserved) {
      return;
    }

    if (color === "orange") {
      setColor("green");
    } else if (color === "green") {
      setColor("orange");
    }
  };

  return (
    <IconContext.Provider value={{ color: color, size: "30px" }}>
      <div onClick={clickHandler}>
        <MdEventSeat />
      </div>
    </IconContext.Provider>
  );
};
