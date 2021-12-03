import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  user: undefined,
  login: (token, user) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;
  const [user, setUser] = useState({ role: "admin" });

  const loginHandler = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token,
    user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
