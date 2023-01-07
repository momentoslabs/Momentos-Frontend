"use es6";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "../services/AuthService";

import ProfileCard from "../components/Profile/ProfileCard";
import ProfileItems from "../components/Profile/ProfileItems";

import ProfileUpload from "../components/Profile/ProfileUpload";

const ProfilePage = () => {
  const navigate = useNavigate();
  const profile = getUser();
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
          `${process.env.REACT_APP_USERS_API_URL}/users/${profile.id}`,
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

  const signoutHandler = () => {
    resetUserSession();
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      style={{
        padding: "70px 0px 40px 0px",
      }}
    >
      <div style={{ width: "100%" }}>
        <ProfileCard profile={user} />
        <ProfileUpload profile={user} />
        <ProfileItems profile={user} />
      </div>
      <button
        className="textinput"
        onClick={() => {
          signoutHandler();
        }}
      >
        Sign out
      </button>
      <br />
      <br />
    </div>
  );
};

export default ProfilePage;
