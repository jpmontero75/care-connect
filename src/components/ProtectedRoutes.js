import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRouteLogin = ({ children }) => {
  const { user, role } = UserAuth();

  if (user) {
    if (role === "familiar") {
      return <Navigate to="/fam-dashboard" />;
    } else if (role === "empleado") {
      return <Navigate to="/emp-dashboard" />;
    }
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, role } = UserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role === "familiar" && window.location.pathname !== "/fam-dashboard") {
    return <Navigate to="/fam-dashboard" />;
  } else if (role === "empleado" && window.location.pathname !== "/emp-dashboard") {
    return <Navigate to="/emp-dashboard" />;
  }

  return children;
};

export { ProtectedRoute, ProtectedRouteLogin };
