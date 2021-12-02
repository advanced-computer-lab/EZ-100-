import React ,{useState} from "react";
import { useHistory } from "react-router-dom";

import classes from "./EditUser.module.css";
import { useFormik } from "formik";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";

import * as Yup from "yup";

export default function EditUser(props) {
  const history = useHistory();
 const [ isLoading,setisLoading]= useState(false);
  const formik = useFormik({
    initialValues: {
      firstname:"",
      lastName:"",
      email:"",
      passport_number:"",
      
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(3, "min 3 characters")
        .required("Required"),
      lastname: Yup.string()
        .min(3, "min 3 characters")
        .required("Required"),
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
     const data = await fetch("http://localhost:5000/api/users/updateUser/61a4ff997630339cd3b786ae", {
        method: "PUT",
        body: JSON.stringify(user), 
        headers: {
          "Content-Type": "application/json",
        },
      });
      setisLoading(false);
    },
  });

  const firstnameclass=
    formik.touched.firstname && formik.errors.firstname
      ? classes.error
      : "";
      const lastnameclass=
    formik.touched.lastname && formik.errors.lastname
      ? classes.error
      : "";

  const emailclass =
    formik.touched.email && formik.errors.email ? classes.error : "";
  const passportclass =
    formik.touched.passport_number && formik.errors.passport_number ? classes.error : "";
     
  
  if(isLoading==true){
    return <LoadingSpinner />;
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
         

          <div className={classes["Save"]}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
  }
  