"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { setUserSession } from "../../services/AuthService";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignupViewport = ({ children, setSignupVisible }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const passPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&()-`.+,/\"])([a-zA-Z0-9]{8,})$/;

  const submitHandler = (event) => {
    console.log(username.trim());
    event.preventDefault();
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      name.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === ""
    ) {
      setMessage("All fields are required.");
      return;
    }
    setMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };

    const dobInt = new Date(dob);

    const requestBody = {
      username: username,
      name: name,
      email: email,
      password: password,
      dob: dobInt.getTime(),
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
            <i>Sign Up</i>
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
            type="text"
            value={name}
            placeholder="Name"
            maxlength="48"
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          <input
            className="textinput"
            style={{ width: "300px" }}
            type="text"
            value={email}
            placeholder="Email"
            maxlength="48"
            onChange={(event) => setEmail(event.target.value)}
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
            style={{ width: "300px" }}
            type="password"
            value={password2}
            placeholder="Confirm Password"
            maxlength="24"
            onChange={(event) => setPassword2(event.target.value)}
          />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ padding: "2px" }}>Date of birth:</p>
            <input
              className="textinput"
              type="date"
              value={dob}
              onChange={(event) => {
                setDob(event.target.value);
              }}
            />
          </div>
          <br />
          <input
            className="textinput"
            type="submit"
            value="Sign Up"
            style={{ marginTop: "30px", width: "25%" }}
          />
          <br />
          <p style={{ color: "#555555" }}>
            Got an account? Sign in
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
