"use es6";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

import { setUserSession } from "../../services/AuthService";

const SigninViewport = ({ children, setSigninVisible }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Both username and password are required.");
      return;
    }
    setErrorMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };
    const requestBody = {
      username: username.toLowerCase(),
      password: password,
    };

    axios
      .post(
        `${process.env.REACT_APP_USERS_API_URL}/signin`,
        requestBody,
        requestConfig
      )
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setSigninVisible(false);
        navigate(`/profile/${response.data.user.username}`);
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="cover-container">
      <div
        style={{
          margin: "auto",
        }}
      >
        <h1 className="title">Momentos</h1>
        <form
          onSubmit={submitHandler}
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            margin: "auto",
          }}
        >
          <h3 className="label" style={{ textAlign: "center" }}>
            <i>Sign In</i>
          </h3>
          <input
            className="textinput"
            style={{ width: "300px" }}
            type="text"
            value={username}
            placeholder="Username"
            maxlength="24"
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <input
            className="textinput"
            style={{ width: "300px" }}
            type="password"
            value={password}
            placeholder="Password"
            maxlength="24"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <input
            className="textinput"
            type="submit"
            value="Sign In"
            style={{ marginTop: "10px", width: "25%" }}
          />
          <br />
          <p style={{ color: "#555555" }}>
            Need an account? Sign up
            <a
              style={{ color: "#5576FF" }}
              onClick={() => {
                setSigninVisible(false);
                setSearchParams({ action: "signup" });
              }}
            >
              &nbsp;here
            </a>
            .
          </p>
        </form>
        {errorMessage && <p className="message">{errorMessage}</p>}
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default SigninViewport;
