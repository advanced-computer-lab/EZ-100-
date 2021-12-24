import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Components/UI/Modal";

import AuthContext from "../store/auth-context";

// import flightsImg from "../assets/flights.png";
import classes from "./Home.module.css";

export const Home = () => {
  const authCtx = useContext(AuthContext);
  // const role = authCtx.user.role;

  const [ModalIsOpen, setModalIsOpen] = useState(false);

 /* await fetch(
    ``,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Home),
    }
  );*/

const Newpassword = '';
const ConfirmNewPassword = '';







  function changePasswordHandler() {
    setModalIsOpen(true);
  }
  function closeModalHandler() {
    setModalIsOpen(false);
  }

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
          <div>
            <button className="btn" onClick={changePasswordHandler}>
              Change Password
            </button>
          </div>
          {ModalIsOpen ? (
            <div className={classes.signupForm}>
            <Modal>
              <div className={classes.row}>
                <label>Current Password</label>
                <input
                  type="text"
                  className={classes.input}
                  placholder="Current Password"
                />
              </div>
              <div className={classes.row}>
                <label>New Password</label>
                <input
                  type="text"
                  className={classes.input}
                  placeHolder="New Password"
                  value = {Newpassword}
                />
              </div>
              <div className={classes.row}>
                <label>Confirm Password</label>
                <input
                  type="text"
                  className={classes.input}
                  placeHolder="Confirm Password"
                  value={ConfirmNewPassword}
                />
              </div>
              <button onClick={closeModalHandler} className={classes.btn}>Confirm</button>
              <button onClick={closeModalHandler} className={classes.btn}>Cancel</button>
            </Modal>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
