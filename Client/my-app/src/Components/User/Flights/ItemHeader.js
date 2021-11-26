import React from "react";
import classes from "./ItemHeader.module.css";

export const ItemHeader = (props) => {
  const { from, to, title } = props;
  return (
    <div className={classes.centered}>
      <h2>
        {title} flights: {from} to {to}
      </h2>
    </div>
  );
};
