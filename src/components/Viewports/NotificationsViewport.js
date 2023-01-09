import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../utils/CustomHooks";
import ProfileChip from "../Profile/ProfileChip";

import loading from "../../graphics/icons/loading.gif";
import Loading from "../Loading/Loading";

const NotificationsViewport = ({ profile = {}, setNotificationsVisible }) => {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);

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
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();

    const getRequests = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys/${profile.id}`,
          requestConfig
        )
        .then((response) => {
          setRequests(response.data.requests);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getRequests();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        height: "fit-content",
        width: "90%",
        margin: "auto",
      }}
    >
      <div className="modal-container">
        <div
          style={{
            backgroundColor: "#ffffff",
            width: "300px",
            borderRadius: "25px",
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
              }}
              onClick={() => {
                setNotificationsVisible(false);
              }}
            >
              &#10005;
            </div>
            <h1>Notifications</h1>
            {!!requests ? (
              <div
                style={{
                  justifyContent: "space-around",
                  borderRadius: "25px",
                  border: "#000000 solid 2px",
                  padding: "10px",
                  height: "fit-content",
                }}
              >
                {Object.keys(requests).map((request, index) => (
                  <ProfileChip profile={user} id={request} requesting={true} />
                ))}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsViewport;
