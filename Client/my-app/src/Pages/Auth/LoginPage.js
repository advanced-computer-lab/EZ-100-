import React, { useState, useContext } from "react";

import { Login2 } from "../../Components/User/Account/Login2";
import AuthContext from "../../store/auth-context";

export const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const loginHandler = async (data) => {
    setErrorMsg("");
    setIsLoading(true);

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    console.log(resData);

    if (resData.success) {
      authCtx.login(resData.token, resData.data);
    } else {
      console.log(resData.error);
      setErrorMsg("Incorrect email or password");

      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }

    setIsLoading(false);
  };

  return (
    <Login2
      onLogin={loginHandler}
      errorMsg={errorMsg}
      isLoading={isLoading}
    ></Login2>
  );
};
