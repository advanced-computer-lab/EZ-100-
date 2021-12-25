import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Login2 } from "../../Components/User/Account/Login2";
import AuthContext from "../../store/auth-context";

export const LoginPage = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
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
      // history.replace("/home");
      if (props.nextPage) {
        setIsLoading(false);
        history.replace(props.nextPage);
      } else {
        setIsLoading(false);
        props.hideModal();
      }
    } else {
      console.log(resData.error);
      setErrorMsg("Incorrect email or password");
      setIsLoading(false);

      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  };

  return (
    <Login2
      inModal={props.inModal}
      onLogin={loginHandler}
      errorMsg={errorMsg}
      isLoading={isLoading}
    ></Login2>
  );
};
