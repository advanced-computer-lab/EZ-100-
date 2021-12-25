import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./EditUser.module.css";
import { useFormik } from "formik";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";

import * as Yup from "yup";

export default function EditUser(props) {
  // const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/users/${authCtx.user._id}`
      );

      const data = await response.json();
      // console.log(data.data);

      setisLoading(false);
      setUser(data.data);
    };

    fetchData();
  }, [authCtx]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user ? user.firstName : "",
      lastname: user ? user.lastName : "",
      email: user ? user.email : "",
      passport_number: user ? user.passportNumber : "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(3, "min 3 characters").required("Required"),
      lastname: Yup.string().min(3, "min 3 characters").required("Required"),
      email: Yup.string().required("Required"),
      passport_number: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const user = {
        firstName: formik.values.firstname,
        lastName: formik.values.lastname,
        email: formik.values.email,
        passportNumber: formik.values.passport_number,
      };
      setisLoading(true);
      setErrorMessage("");
      const data = await fetch(
        `http://localhost:5000/api/users/updateUser/${authCtx.user._id}`,
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await data.json();
      if (jsonData.success) {
        authCtx.userSetter(jsonData.data);
      } else {
        formik.errors.email = true;
        setErrorMessage(
          "This (Email or Passport number) is already being used"
        );
      }

      setisLoading(false);
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

  if (isLoading === true) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes["form-wrapper"]}>
        <h1>User Info</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes["firstname"]}>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              className={firstnameclass}
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="first name"
            />
          </div>
          <div className={classes["lastname"]}>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              className={lastnameclass}
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="last name"
            />
          </div>

          <div className={classes["email"]}>
            <label htmlFor="email">Email </label>
            <input
              type="email"
              name="email"
              className={emailclass}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="email"
            />
          </div>

          <div className={classes["passport"]}>
            <label htmlFor="passport_number">Passport Number</label>
            <input
              type="text"
              name="passport_number"
              className={passportclass}
              value={formik.values.passport_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Passport number"
            />
          </div>

          <small style={{ color: "red", padding: "0 0.7rem" }}>
            {errorMessage}
          </small>
          <div className={classes["Save"]}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
