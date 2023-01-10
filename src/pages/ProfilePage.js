"use es6";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getUser } from "../services/AuthService";

import ProfileCard from "../components/Profile/ProfileCard";
import ProfileItems from "../components/Profile/ProfileItems";

import ProfileUpload from "../components/Profile/ProfileUpload";

const ProfilePage = () => {
  const profile = getUser();
  const [user, setUser] = useState({});

  const { username } = useParams();
  const isOwner = profile.username === username;

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_USERS_API_URL}/users/${username}`,
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
    <div
      style={{
        padding: "70px 0px 40px 0px",
      }}
    >
      <div style={{ width: "100%" }}>
        <ProfileCard profile={user} isOwner={isOwner} />
        <ProfileUpload profile={user} isOwner={isOwner} />
        <ProfileItems profile={user} />
      </div>
      <br />
    </div>
  );
};

export default ProfilePage;
