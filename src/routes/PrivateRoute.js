"use es6";

import React from "react";
import { Navigate } from "react-router-dom";

import { getToken } from "../services/AuthService";

const PrivateRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/?action=signin" />;
};

export default PrivateRoute;
