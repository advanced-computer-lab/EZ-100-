import React from "react";

import Login from "../../Components/User/Account/Login";

export const LoginPage = () => {
  return (
    <div style={{ margin: "0" }} className="centered">
      <Login nextPage="/home"></Login>
    </div>
  );
};
