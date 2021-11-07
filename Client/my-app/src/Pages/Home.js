import React from "react";
import { Link } from "react-router-dom";

// import flightsImg from "../assets/flights.png";
import classes from "./Home.module.css";

export const Home = () => {
  return (
    <div className={classes.container}>
      <h2>Welcome back, Adminstrator!</h2>
      <div className={classes.items}>
        <div className={classes.item}>
          <Link to="/flights" className="btn--flat">
            View Flights
          </Link>
        </div>
        <div className={classes.item}>
          <Link to="/new-flight" className="btn--flat">
            New Flight
          </Link>
        </div>
      </div>
    </div>
  );
};
