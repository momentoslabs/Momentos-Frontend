"use es6";

import "./App.css";
import React, { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import UnknownPage from "./pages/UnknownPage";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./routes/PrivateRoute";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./services/AuthService";
import axios from "axios";
import { useWindowDimensions } from "./utils/CustomHooks";

const App = () => {
  const [isAuthenicating, setAuthenicating] = useState(true);

  const dimensions = useWindowDimensions();

  useEffect(() => {
    const token = getToken();
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };
    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(
        `${process.env.REACT_APP_USERS_API_URL}/verify`,
        requestBody,
        requestConfig
      )
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenicating(false);
      })
      .catch(() => {
        resetUserSession();
        setAuthenicating(false);
      });
  }, []);

  const token = getToken();
  // while (isAuthenicating && token) {
  //   return <div className="App">Authenicating...</div>;
  // }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile">
          <Route
            path=":username"
            element={
              <PrivateRoute>
                <ProfilePage dimensions={dimensions} />
              </PrivateRoute>
            }
          />
          <Route
            path=""
            element={
              <PrivateRoute>
                <ProfilePage dimensions={dimensions} />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<UnknownPage />} />
      </Routes>
      <Navbar />
    </div>
  );
};

export default App;
