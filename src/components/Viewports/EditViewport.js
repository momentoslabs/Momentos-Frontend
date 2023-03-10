"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";

const EditViewport = ({ profile = {}, setEditVisible }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("");
  const [emoji, setEmoji] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };
    const requestBody = {
      username: username,
      name: name,
      email: email,
      color: color,
      emoji: emoji,
    };

    axios
      .post(
        `${process.env.REACT_APP_USERS_API_URL}/users/${profile.id}`,
        requestBody,
        requestConfig
      )
      .then(() => {
        setEditVisible(false);
        window.location.reload();
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        height: "fit-content",
        margin: "auto",
      }}
    >
      <div className="modal-container">
        <div
          style={{
            backgroundColor: "#ffffff",
            width: "300px",
            borderRadius: "10px",
            height: "fit-content",
            padding: "15px",
            margin: "auto",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "large",
                textAlign: "left",
                margin: "5px 0px",
                height: "0px",
              }}
              onClick={() => {
                setEditVisible(false);
              }}
            >
              &#10005;
            </div>
            <h1 style={{ height: "15px" }}>Edit Profile</h1>
            <form
              onSubmit={submitHandler}
              style={{
                textAlign: "center",
                padding: "10px",
              }}
            >
              <input
                className="textinput"
                type="username"
                value={username}
                placeholder="New username"
                maxLength="24"
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                className="textinput"
                type="name"
                value={name}
                placeholder="New name"
                maxLength="48"
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="textinput"
                type="email"
                value={email}
                placeholder="New email"
                maxLength="48"
                onChange={(event) => setEmail(event.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ padding: "2px" }}>New color:</p>
                <input
                  className="textinput"
                  type="color"
                  value={color}
                  placeholder="New color"
                  maxLength="7"
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <input
                className="textinput"
                type="emoji"
                value={emoji}
                placeholder="New emoji"
                maxLength="12"
                onChange={(event) => setEmoji(event.target.value)}
              />
              <input
                className="textinput"
                type="submit"
                value="Update Profile"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditViewport;
