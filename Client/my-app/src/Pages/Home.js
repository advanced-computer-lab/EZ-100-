import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/auth-context";

// import flightsImg from "../assets/flights.png";
import classes from "./Home.module.css";

export const Home = () => {
  const authCtx = useContext(AuthContext);
  // const role = authCtx.user.role;

  if (!authCtx.isLoggedIn) {
    return <></>;
  }

  return (
    <div className={classes.container}>
      {authCtx.user.role === "admin" && (
        <>
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
        </>
      )}

      {authCtx.user.role === "user" && (
        <>
          <h2>Welcome back, Username!</h2>
          <div className={classes.items}>
            <div className={classes.item}>
              <Link to="/search" className="btn--flat">
                Search flights
              </Link>
            </div>
            <div className={classes.item}>
              <Link to="/reservation" className="btn--flat">
                My reservations
              </Link>
            </div>
            <div className={classes.item}>
              <Link to="/edit-user" className="btn--flat">
                Edit my information
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
