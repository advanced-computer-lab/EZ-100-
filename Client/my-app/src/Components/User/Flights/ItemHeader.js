import React from "react";
import classes from "./ItemHeader.module.css";

import { PlaneIcon } from "../../Flights/PlaneIcon";

export const ItemHeader = (props) => {
  const { from, to } = props;
  return (
    <div className={classes.centered}>
      <div className={classes.row}>
        <h2 className={classes.airport}>{from}</h2> <PlaneIcon />{" "}
        <h2 className={classes.airport}>{to}</h2>
      </div>
    </div>
  );
};
