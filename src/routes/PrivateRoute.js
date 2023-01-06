import React, { Children } from "react";
import { Navigate, Route } from "react-router-dom";
import { getToken } from "../services/AuthService";

const PrivateRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/?action=signup" />;
};

export default PrivateRoute;
