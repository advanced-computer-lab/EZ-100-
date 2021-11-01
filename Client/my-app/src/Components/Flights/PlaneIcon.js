import React from "react";
import { FaPlane } from "react-icons/fa";
import { IconContext } from "react-icons";

export const PlaneIcon = () => {
  return (
    <IconContext.Provider value={{ color: "black", size: "25px" }}>
      <div>
        <FaPlane />
      </div>
    </IconContext.Provider>
  );
};
