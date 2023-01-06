"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { setUserSession } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../utils/CustomHooks";
import { useSearchParams } from "react-router-dom";

const SignupViewport = ({ children, setSignupVisible }) => {
  const style = {
    textDecoration: "none",
  };

  const navigate = useNavigate();
  const dimensions = useWindowDimensions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const passPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&()-`.+,/\"])([a-zA-Z0-9]{8,})$/;

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      name.trim() === "" ||
      password.trim() === "" ||
      age.trim() === "" ||
      location.trim() === ""
    ) {
      setMessage("All fields are required");
      return;
    }
    setMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
      age: age,
      location: location,
    };
    axios
      .post(
        `${process.env.REACT_APP_USERS_API_URL}/signup`,
        requestBody,
        requestConfig
      )
      .then((response) => {
        setMessage("Welcome!");
        setUserSession(response.data.user, response.data.token);
        setSignupVisible(false);
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    !passPattern.test(password) && password !== ""
      ? setMessage("")
      : password !== password2
      ? setMessage("Passwords must match!")
      : setMessage(null);
  }, [password, password2]);

  return (
    <div
      style={{
        height: dimensions.height * 0.7,
      }}
      closeFunction={() => {
        setSearchParams({});
        setSignupVisible(false);
      }}
    >
      <div
        style={{
          position: "relative",
          top: "5%",
        }}
      >
        <br />
        <form
          onSubmit={submitHandler}
          style={{
            textAlign: "center",
            padding: "10px",
            width: "80%",
            margin: "auto",
          }}
        >
          <p className="label" style={{ textAlign: "center" }}>
            Sign Up
          </p>
          <input
            className="textinput"
            type="text"
            value={username}
            placeholder="Username"
            maxlength="24"
            onChange={(event) => setUsername(event.target.value)}
          />{" "}
          <br />
          <input
            className="textinput"
            type="text"
            value={name}
            placeholder="Name"
            maxlength="48"
            onChange={(event) => setName(event.target.value)}
          />{" "}
          <br />
          <input
            className="textinput"
            type="text"
            value={email}
            placeholder="Email"
            maxlength="48"
            onChange={(event) => setEmail(event.target.value)}
          />{" "}
          <br />
          <input
            className="textinput"
            type="text"
            value={password}
            placeholder="Password"
            maxlength="24"
            onChange={(event) => setPassword(event.target.value)}
          />{" "}
          <br />
          <input
            className="textinput"
            type="text"
            value={password2}
            placeholder="Confirm Password"
            maxlength="24"
            onChange={(event) => setPassword2(event.target.value)}
          />{" "}
          <br />
          <input
            className="textinput"
            type="text"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
          />{" "}
          <br />
          <input
            className="submitInput"
            type="submit"
            value="Sign Up"
            style={{ marginTop: "30px", width: "25%" }}
          />
          <br />
          <p style={{ color: "#555555" }}>
            Already have an account? Sign in
            <a
              style={{ color: "#5576FF" }}
              onClick={() => {
                setSignupVisible(false);
                setSearchParams({ action: "signin" });
              }}
            >
              &nbsp;here
            </a>
            .
          </p>
          {message && <p className="message">{message}</p>}
          <br />
          <br />
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default SignupViewport;
