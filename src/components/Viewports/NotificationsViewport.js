"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";

import ProfileChip from "../Profile/ProfileChip";
import Loading from "../Loading/Loading";

const NotificationsViewport = ({
  profile = {},
  requests = {},
  setNotificationsVisible,
}) => {
  const [user, setUser] = useState({});
  const [numRequests, setNumRequests] = useState(Object.keys(requests).length);

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_USERS_API_URL}/users/${profile.id}`,
          requestConfig
        )
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    getUser();
  }, []);

  const updateNumRequests = (count) => {
    setNumRequests(numRequests + count);
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
                setNotificationsVisible(false);
                window.location.reload();
              }}
            >
              &#10005;
            </div>
            <h1 style={{ height: "15px" }}>Notifications</h1>
            {numRequests > 0 ? (
              <div
                style={{
                  justifyContent: "space-around",
                  borderRadius: "10px",
                  padding: "10px",
                  height: "fit-content",
                }}
              >
                {Object.keys(requests).map((request, index) => (
                  <ProfileChip
                    key={index}
                    profile={user}
                    id={request}
                    requesting={true}
                    updateNumRequests={updateNumRequests}
                  />
                ))}
              </div>
            ) : (
              <div>Looks like that's it! ????</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsViewport;
