import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWindowDimensions } from "../../utils/CustomHooks";

const ProfileChip = ({ profile = {}, id = {} }) => {
  const [user, setUser] = useState({});

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
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          backgroundColor: `${user.color}`,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          margin: "8px 10px 0px 0px",
        }}
      >
        <div
          style={{
            position: "relative",
            margin: "auto",
            top: "22px",
            fontSize: "24px",
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
        {profile.connections.indexOf(user.id) !== -1 ? (
          <button
            className="connectbutton active"
            style={{ height: "22px", margin: "-2px 0px", width: "100px" }}
          >
            Connected
          </button>
        ) : (
          <button
            className="connectbutton"
            style={{ height: "22px", margin: "-2px 0px", width: "100px" }}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileChip;
