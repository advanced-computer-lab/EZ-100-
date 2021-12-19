import React from "react";
import loginUI from "../../../assets/login_img.svg";
import loginUserIcon from "../../../assets/user.png";

import classes from "./Login2.module.css";

export const Login2 = () => {
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.col}>
          <img className={classes["icon-img"]} src={loginUserIcon} alt="icon" />
          <form className={classes.form}>
            <input type="text" placeholder="Enter your email"></input>

            <input type="password" placeholder="Password"></input>

            <button className={classes["btn-primary"]}>Login</button>

            <div style={{ marginTop: "8px" }}>
              <a href="/login" className={classes.reset}>
                <small>Forgot password ?</small>
              </a>
            </div>
          </form>
        </div>

        <div className={classes.col}>
          <img style={{ width: "100%" }} src={loginUI} alt="UI" />
        </div>
      </div>
    </div>
  );
};
