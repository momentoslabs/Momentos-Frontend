"use es6";

import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../utils/CustomHooks";
import { useSearchParams } from "react-router-dom";

const SigninViewport = ({ children, setSigninVisible }) => {
  const style = {
    textDecoration: "none",
  };

  const navigate = useNavigate();

  const dimensions = useWindowDimensions();

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
      username: username,
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
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div
      style={{ height: dimensions.height * 0.8 }}
      closeFunction={() => {
        setSearchParams({});
        setSigninVisible(false);
      }}
    >
      <div
        style={{
          position: "relative",
          top: "25%",
        }}
      >
        <form
          onSubmit={submitHandler}
          style={{
            textAlign: "center",
            padding: "10px",
          }}
        >
          <p className="label" style={{ textAlign: "center" }}>
            Sign In
          </p>
          <input
            className="textinput"
            type="text"
            value={username}
            placeholder="Username"
            maxlength="24"
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <input
            className="textinput"
            type="password"
            value={password}
            placeholder="Password"
            maxlength="24"
            onChange={(event) => setPassword(event.target.value)}
          />{" "}
          <br />
          <input
            className="submitInput"
            type="submit"
            value="Log In"
            style={{ marginTop: "10px", width: "25%" }}
          />
          <br />
          <p style={{ color: "#555555" }}>
            Need a new account? Sign up
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
