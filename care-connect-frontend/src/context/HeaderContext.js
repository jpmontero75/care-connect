import React, { createContext, useState, useEffect } from "react";
import { UserAuth } from "./AuthContext";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerUser, setHeaderUser] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerRoute, setHeaderRoute] = useState("");
  const { userEmail } = UserAuth();

  useEffect(() => {
    setHeaderUser(userEmail ? userEmail.split("@")[0] : userEmail);
  }, [userEmail]);

  return (
    <HeaderContext.Provider
      value={{
        headerUser,
        headerTitle,
        setHeaderTitle,
        headerRoute,
        setHeaderRoute,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
