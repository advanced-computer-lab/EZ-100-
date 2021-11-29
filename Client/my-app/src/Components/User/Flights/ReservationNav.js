import React from "react";

import classes from "./ReservationNav.module.css";

export const ReservationNav = (props) => {
  const { selector, errorMessage } = props;
  const continueClickHandler = (event) => {
    event.preventDefault();

    props.onContinueClicked();
  };

  const previousHandler = (event) => {
    event.preventDefault();

    props.onPreviousHandler();
  };

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <button type="button" className="btn" onClick={previousHandler}>
            Back
          </button>
        </li>
        <li>
          <div className={selector === 1 ? classes.active : ""}>
            1. Select flights
          </div>
        </li>

        <li>
          <div className={selector === 2 ? classes.active : ""}>
            2. Choose seats
          </div>
        </li>

        <li>
          <div className={selector === 3 ? classes.active : ""}>3. Summary</div>
        </li>

        <li>
          <button type="button" className="btn" onClick={continueClickHandler}>
            Continue
          </button>
        </li>

        <li>
          <p style={{ color: "red", fontSize: "0.95rem" }}>{errorMessage}</p>
        </li>
      </ul>
    </nav>
  );
};
