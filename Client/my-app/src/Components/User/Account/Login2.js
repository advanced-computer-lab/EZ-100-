import React from "react";
import loginUI from "../../../assets/world3.svg";
import loginUserIcon from "../../../assets/user.png";

import LoadingSpinner from "../../UI/LoadingSpinner";

import classes from "./Login2.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";

export const Login2 = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email field cannot be empty"),
      password: Yup.string()
        .min(6, "Password has to be at least 6 characters")
        .required("Please enter your password"),
    }),

    onSubmit: (values) => {
      props.onLogin(values);
      formik.resetForm();
    },
  });

  const emailClasses =
    formik.touched.email && formik.errors.email ? classes.error : "";
  const passwordClasses =
    formik.touched.password && formik.errors.password ? classes.error : "";

  const colClass1 = props.inModal ? classes["col-75"] : classes.col;
  const containerClass = !props.inModal ? classes.container : "";

  return (
    <div className={containerClass}>
      <div className={classes.row}>
        <div className={colClass1}>
          {props.isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}
          {!props.isLoading && (
            <>
              <img
                className={classes["icon-img"]}
                src={loginUserIcon}
                alt="icon"
              />
              <form onSubmit={formik.handleSubmit} className={classes.form}>
                <input
                  id="email"
                  className={emailClasses}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="text"
                  placeholder="Enter your email"
                ></input>

                <input
                  id="password"
                  className={passwordClasses}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  placeholder="Password"
                ></input>

                <button className={classes["btn-primary"]} type="submit">
                  Login
                </button>
                
                <div style={{ marginTop: "8px" }}>
                  <a href="/login" className={classes.reset}>
                    <small>Forgot password ?</small>
                  </a>
                </div>
              </form>

              <div className={classes.errorMsg}>{props.errorMsg}</div>

              {formik.touched.email && formik.errors.email && (
                <div className={classes.errorMsg}>{formik.errors.email}</div>
              )}

              {formik.touched.password && formik.errors.password && (
                <div className={classes.errorMsg}>{formik.errors.password}</div>
              )}
            </>
          )}
        </div>

        {!props.inModal && (
          <div className={classes.col}>
            <img style={{ width: "100%" }} src={loginUI} alt="UI" />
          </div>
        )}
      </div>
    </div>
  );
};
