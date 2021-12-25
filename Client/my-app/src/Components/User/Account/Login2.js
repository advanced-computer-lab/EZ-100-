import React from "react";
import loginUI from "../../../assets/world3.svg";
import loginUserIcon from "../../../assets/user.png";

import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";

import classes from "./Login2.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";

export const Login2 = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const [tokenValue, setTokenValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const onTokenChange = (event) => {
    setTokenValue(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

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

  const onForgotPassword = async () => {
    if (formik.values.email === "") {
      return;
    }
    setModalIsOpen(true);

    const body = { email: formik.values.email };
    await fetch(`http://localhost:5000/api/auth/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  const onChangePassword = async () => {
    const body = { password: passwordValue };
    await fetch(`http://localhost:5000/api/auth/resetpassword/${tokenValue}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setModalIsOpen(false);
  };

  const emailClasses =
    formik.touched.email && formik.errors.email ? classes.error : "";
  const passwordClasses =
    formik.touched.password && formik.errors.password ? classes.error : "";

  const colClass1 = props.inModal ? classes["col-75"] : classes.col;
  const containerClass = !props.inModal ? classes.container : "";
  return (
    <>
      {modalIsOpen && (
        <Modal onClose={onCloseModal}>
          <div>
            <div>An email has been sent to you witha token.</div>
            <div>Please insert your new password and that token below :)</div>
            <div style={{ margin: "1rem 0" }}>
              <input
                style={{ margin: "0 1rem", padding: "0.5rem 0" }}
                type="text"
                placeholder="Token"
                value={tokenValue}
                onChange={onTokenChange}
              />
              <input
                style={{ margin: "0 1rem", padding: "0.5rem 0" }}
                type="text"
                placeholder="New password"
                value={passwordValue}
                onChange={onPasswordChange}
              />
              <button onClick={onChangePassword} className="btn">
                Change password
              </button>
            </div>
          </div>
        </Modal>
      )}
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

                  <div
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <a href="/register" className={classes.reset}>
                      <small>No account? Sign up.</small>
                    </a>
                    <small
                      className={classes.reset}
                      style={{ textDecoration: "underline" }}
                      onClick={onForgotPassword}
                    >
                      Forgot password?
                    </small>
                  </div>
                </form>

                <div className={classes.errorMsg}>{props.errorMsg}</div>

                {formik.touched.email && formik.errors.email && (
                  <div className={classes.errorMsg}>{formik.errors.email}</div>
                )}

                {formik.touched.password && formik.errors.password && (
                  <div className={classes.errorMsg}>
                    {formik.errors.password}
                  </div>
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
    </>
  );
};
