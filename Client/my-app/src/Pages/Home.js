import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Components/UI/Modal";
import { useFormik } from "formik";

import * as Yup from "yup";
import AuthContext from "../store/auth-context";

// import flightsImg from "../assets/flights.png";
import classes from "./Home.module.css";

export const Home = () => {
  const authCtx = useContext(AuthContext);
  // const role = authCtx.user.role;

  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: user ? user.password : "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 charaters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      const user = {
        password: formik.values.password,
      };
      const data = await fetch(
        "http://localhost:5000/api/users/${authCtx.user._id}",
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  });

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
            <div>
              <Modal>
                <div className={classes.row}>
                  <label>New Password</label>
                  <input type="password" name="password"  className={classes.input} />
                </div>
                <div className={classes.row}>
                  <label>Confirm Password</label>
                  <input type="password" name="confirmpassword" className={classes.input} />
                </div>
                <button onClick={closeModalHandler} className={classes.btn}>
                  Confirm
                </button>
                <button onClick={closeModalHandler} className={classes.btn}>
                  Cancel
                </button>
              </Modal>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
