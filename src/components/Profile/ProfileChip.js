"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileChip = ({
  profile = {},
  id = {},
  requesting = false,
  updateNumRequests = {},
}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [mode, setMode] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_USERS_API_URL}/users/${id}`,
          requestConfig
        )
        .then((response) => {
          setUser(response.data);
          response.data.id === profile.id
            ? setMode(-1)
            : setMode(
                !(response.data.id in profile.connections)
                  ? 0
                  : profile.connections[response.data.id]
                  ? 2
                  : 1
              );
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    getUser();
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

      if (action === 2) {
        const requestBody3 = {
          connections: { id: profile.id, action: 2 },
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
    }
  };

  return (
    !!user.color &&
    isVisible && (
      <div style={{ display: "flex" }}>
        <div
          className="highlightable"
          style={{
            backgroundColor: `${user.color}`,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            margin: "8px 10px 0px 0px",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            navigate(`/profile/${user.username}`);
            window.location.reload();
          }}
        >
          <div
            style={{
              position: "relative",
              margin: "auto",
              top: "-1px",
              fontSize: "24px",
              height: "fit-content",
            }}
          >
            {user.emoji}
          </div>
        </div>
        <div
          style={{
            textAlign: "left",
            lineHeight: "5%",
          }}
        >
          <p style={{ fontWeight: "bold" }}>@{user.username}</p>

          {!!requesting ? (
            <div>
              <p>Requested to connect.</p>
              <button
                className="connectbutton"
                style={{
                  height: "22px",
                  margin: "-2px 5px 0px 0px",
                  width: "100px",
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
                  height: "22px",
                  margin: "-2px 0px 0px 5px",
                  width: "100px",
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
                  style={{ height: "22px", margin: "-2px 0px", width: "100px" }}
                  onClick={() => {
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
                    height: "22px",
                    margin: "-2px 0px",
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
                    height: "22px",
                    margin: "-2px 0px",
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
          )}
        </div>
      </div>
    )
  );
};

export default ProfileChip;
