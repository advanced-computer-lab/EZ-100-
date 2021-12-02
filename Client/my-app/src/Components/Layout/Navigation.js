import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";

export const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>EZ Travel</div>
      <nav className={classes.nav}>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            </li>
          )}

          {!authCtx.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/register">
                Register
              </NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/home" exact>
                Home
              </NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && authCtx.user.role === "admin" && (
            <li>
              <NavLink activeClassName={classes.active} to="/flights">
                Flights
              </NavLink>
            </li>
          )}

          <li>
            <NavLink activeClassName={classes.active} to="/contact-us">
              Contact us
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
