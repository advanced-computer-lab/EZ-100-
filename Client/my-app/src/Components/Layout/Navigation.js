import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>EZ Travel</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/quotes">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/new-quote">
              Flights
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
