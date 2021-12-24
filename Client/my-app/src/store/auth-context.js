import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  user: undefined,
  login: (token, user) => {},
  logout: () => {},
  userSetter: (newUser) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = JSON.parse(localStorage.getItem("user")) || { role: "" };

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [user, setUser] = useState(initialUser);

  const loginHandler = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
  };

  const userSetter = (newUser) => {
    setUser(newUser);
  };

  const contextValue = {
    token,
    user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userSetter,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
