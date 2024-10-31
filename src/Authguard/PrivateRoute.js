// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // Check both user context and token
  if (!user && !token) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
