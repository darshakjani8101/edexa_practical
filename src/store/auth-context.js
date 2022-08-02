import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  fname: "",
  login: (fname) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [userFname, setUserFname] = useState(false);
  const logoutHandler = () => {
    setUserIsLoggedIn(false);
  };

  const loginHandler = (fname) => {
    setUserIsLoggedIn(true);
    setUserFname(fname);
  };

  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    fname: userFname,
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
