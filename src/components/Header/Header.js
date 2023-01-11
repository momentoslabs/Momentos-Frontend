"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getUser, resetUserSession } from "../../services/AuthService";

import momentos_black from "../../graphics/icons/momentos_black.png";
import notifications from "../../graphics/icons/notifications.png";
import NotificationsViewport from "../Viewports/NotificationsViewport";

const Header = ({}) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [requests, setRequests] = useState([]);

  const profile = getUser();

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  useEffect(() => {
    const getRequests = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys/${profile.id}`,
          requestConfig
        )
        .then((response) => {
          setRequests(response.data.requests);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    getRequests();
  }, []);

  const signoutHandler = () => {
    resetUserSession();
    navigate("/");
  };

  return (
    <div
      className="header"
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "0px 10px",
          position: "relative",
          top: "-7.5px",
          textAlign: "center",
          fontSize: "xx-large",
          margin: "auto",
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="highlightable"
          onClick={() => {
            navigate("/");
          }}
          style={{ fontSize: "28px" }}
        >
          <img
            style={{
              position: "relative",
              top: "6px",
              left: "-2px",
              padding: "0px 5px",
              height: "32px",
            }}
            src={momentos_black}
          />
          Momentos
        </div>

        {!!profile ? (
          <div
            style={{
              display: "flex",
              position: "relative",
              right: "0px",
              top: "2px",
            }}
          >
            <img
              className="highlightable"
              style={{
                position: "relative",
                height: "32px",
                margin: "auto 15px",
              }}
              onClick={() => setNotificationsVisible(true)}
              src={notifications}
            />
            {!!requests && JSON.stringify(Object.keys(requests).length) > 0 && (
              <div
                style={{
                  position: "absolute",
                  padding: "2px",
                  left: "36px",
                  minWidth: "14px",
                  maxWidth: "fit-content",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  backgroundColor: "#ff0000",
                  borderRadius: "10px",
                }}
              >
                {JSON.stringify(Object.keys(requests).length) > 99
                  ? "99+"
                  : JSON.stringify(Object.keys(requests).length)}
              </div>
            )}
            <button
              className="uploadbutton"
              style={{ width: "100px", margin: "auto 0px auto auto" }}
              onClick={() => {
                signoutHandler();
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            className="uploadbutton"
            style={{ width: "100px", margin: "auto 0px auto auto" }}
            onClick={() => {
              setSearchParams({ action: "signin" });
            }}
          >
            Sign in
          </button>
        )}
      </div>
      {notificationsVisible && (
        <NotificationsViewport
          profile={profile}
          requests={requests}
          setNotificationsVisible={setNotificationsVisible}
        />
      )}
    </div>
  );
};

export default Header;
