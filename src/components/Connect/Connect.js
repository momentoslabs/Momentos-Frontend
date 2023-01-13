"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { getUser } from "../../services/AuthService";

import { requestConfig } from "../../utils/Constants";

const Connect = ({
  currentId = 0,
  profile = {},
  user = {},
  requesting = false,
  setIsVisible = {},
  updateNumRequests = {},
}) => {
  const [mode, setMode] = useState(1);

  useEffect(() => {
    console.log(user.id);
    console.log(currentId);
    user.id === currentId
      ? setMode(-1)
      : setMode(
          !(user.id in profile.connections)
            ? 0
            : profile.connections[user.id]
            ? 2
            : 1
        );
  }, []);

  const handleConnection = (action) => {
    setMode(action);
    const requestBody1 = {
      connections: { id: user.id, action: action },
    };
    axios
      .post(
        `${process.env.REACT_APP_USERS_API_URL}/users/${profile.id}`,
        requestBody1,
        requestConfig
      )
      .then(() => {
        // window.location.reload();
      })
      .catch((error) => {
        // console.log(error);
      });

    if (action === 1) {
      const requestBody2 = {
        id: Number(user.id),
        isconnecting: true,
        isreviewed: false,
        isapproved: false,
        profileid: Number(profile.id),
      };

      axios
        .post(
          `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys`,
          requestBody2,
          requestConfig
        )
        .then(() => {})
        .catch((err) => {
          // console.log(err);
        });
    } else {
      const requestBody2 = {
        id: Number(user.id),
        isconnecting: true,
        isreviewed: true,
        isapproved: action === 2,
        profileid: Number(profile.id),
      };

      axios
        .post(
          `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys`,
          requestBody2,
          requestConfig
        )
        .then(() => {})
        .catch((err) => {
          // console.log(err);
        });

      const requestBody3 = {
        connections: { id: profile.id, action: action },
      };
      axios
        .post(
          `${process.env.REACT_APP_USERS_API_URL}/users/${user.id}`,
          requestBody3,
          requestConfig
        )
        .then(() => {
          // window.location.reload();
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  return !!requesting ? (
    <div>
      <p>Requested to connect.</p>
      <button
        className="connectbutton"
        style={{
          width: "100px",
          margin: "0px 5px 0px 0px",
        }}
        onClick={() => {
          handleConnection(2);
          setIsVisible(false);
          updateNumRequests(-1);
        }}
      >
        Accept
      </button>
      <button
        className="connectbutton"
        style={{
          width: "100px",
          margin: "0px 0px 0px 5px",
        }}
        onClick={() => {
          handleConnection(0);
          setIsVisible(false);
          updateNumRequests(-1);
        }}
      >
        Reject
      </button>
    </div>
  ) : (
    <div>
      {mode === 0 && (
        <button
          className="connectbutton"
          style={{ width: "100px" }}
          onClick={() => {
            setMode(1);
            handleConnection(1);
          }}
        >
          Connect
        </button>
      )}
      {mode === 2 && profile.connections[user.id] && (
        <button
          className="connectbutton active"
          style={{
            width: "100px",
          }}
          onClick={() => {
            handleConnection(0);
          }}
        >
          Connected
        </button>
      )}
      {mode === 1 && !profile.connections[user.id] && (
        <button
          className="connectbutton active"
          style={{
            width: "100px",
          }}
          onClick={() => {
            handleConnection(0);
          }}
        >
          Requested
        </button>
      )}
    </div>
  );
};

export default Connect;
