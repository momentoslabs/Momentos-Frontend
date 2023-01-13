"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../services/AuthService";

import { requestConfig } from "../../utils/Constants";

import Connect from "../Connect/Connect";

const ProfileChip = ({
  profile = {},
  id = {},
  requesting = false,
  updateNumRequests = {},
}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const currentProfile = getUser();

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
          // console.log(err);
        });
    };
    getUser();
  }, []);

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
            lineHeight: "0%",
          }}
        >
          <p style={{ fontWeight: "bold" }}>@{user.username}</p>
          {!!profile.connections && !!user && !!currentProfile.id && (
            <Connect
              currentId={currentProfile.id}
              profile={profile}
              user={user}
              requesting={requesting}
              setIsVisible={setIsVisible}
              updateNumRequests={updateNumRequests}
            />
          )}
        </div>
      </div>
    )
  );
};

export default ProfileChip;
