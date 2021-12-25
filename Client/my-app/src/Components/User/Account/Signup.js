import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import AuthContext from "../store/auth-context";
import loginUI from "../../../assets/world3.svg";
import loginUserIcon from "../../../assets/user.png";

import LoadingSpinner from "../../UI/LoadingSpinner";

import classes from "./Signup.module.css";

import { useFormik } from "formik";

import * as Yup from "yup";

export default function Signup(props) {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  // const [user, setUser] = useState();

  const [error, setError] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      passport_number: "",
      gender: "",
      password: "",
      dateofbirth: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(3, "min 3 characters").required("Required"),
      lastname: Yup.string().min(3, "min 3 characters").required("Required"),
      email: Yup.string().required("Required"),
      passport_number: Yup.string().required("Required"),
      gender: Yup.string().required("required"),
      password: Yup.string().required("Required"),
      dateofbirth: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const user = {
        firstName: formik.values.firstname,
        lastName: formik.values.lastname,
        email: formik.values.email,
        passportNumber: formik.values.passport_number,
        gender: formik.values.gender,
        password: formik.values.password,
        dateOfBirth: formik.values.dateofbirth,
      };
      setisLoading(true);
      const data = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await data.json();

      setisLoading(false);
      if (jsonData.success) {
        setError("");
        history.replace("/login");
      } else {
        setError("User with this email or passport number already exists!");
      }
    },
  });

  const firstnameclass =
    formik.touched.firstname && formik.errors.firstname ? classes.error : "";
  const lastnameclass =
    formik.touched.lastname && formik.errors.lastname ? classes.error : "";

  const emailclass =
    formik.touched.email && formik.errors.email ? classes.error : "";
  const passportclass =
    formik.touched.passport_number && formik.errors.passport_number
      ? classes.error
      : "";

  const genderclass =
    formik.touched.gender && formik.errors.gender ? classes.error : "";
  const passwordclass =
    formik.touched.password && formik.errors.password ? classes.error : "";

  const birthclass =
    formik.touched.dateofbirth && formik.errors.dateofbirth
      ? classes.error
      : "";
  const colClass1 = props.inModal ? classes["col-75"] : classes.col;
  const containerClass = !props.inModal ? classes.container : "";

  if (isLoading === true) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

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
                  type="text"
                  name="firstname"
                  className={firstnameclass}
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="First name"
                />

                <input
                  type="text"
                  name="lastname"
                  className={lastnameclass}
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Last name"
                />

                <select
                  name="gender"
                  className={genderclass}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    style: "block",
                    height: 50,
                    width: 385,
                    padding: "0.5rem",
                    marginTop: 0,
                    marginBottom: 15,
                    fontSize: 15,
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  placeholder="Gender"
                >
                  <option value="" label="Gender" />
                  <option value="Female" label="Female" />
                  <option value="Male" label="Male" />
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className={classes.error}> </div>
                )}

                <input
                  type="text"
                  name="passport_number"
                  className={passportclass}
                  value={formik.values.passport_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Passport number"
                />

                <div className={classes.row2}>
                  <label>Date of birth</label>
                  <input
                    style={{ width: "65%", margin: "1rem 0" }}
                    type="date"
                    name="dateofbirth"
                    label="Birth date"
                    className={birthclass}
                    value={formik.values.dateofbirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Birth date"
                  />
                </div>

                <input
                  id="email"
                  className={emailclass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="text"
                  placeholder="Email"
                ></input>

                <input
                  id="password"
                  className={passwordclass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  placeholder="Password"
                ></input>

                <button className={classes["btn-primary"]} type="submit">
                  Sign up
                </button>
              </form>

              {error && (
                <div
                  className="errorMsg"
                  style={{ fontSize: 15, color: "red" }}
                >
                  {" "}
                  {error}{" "}
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
  );
}
