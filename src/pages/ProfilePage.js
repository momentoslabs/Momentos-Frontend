"use es6";

import React, { useState, useEffect } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { getUser, resetUserSession } from "../services/AuthService";

import ProfileCard from "../components/Profile/ProfileCard";
import ProfileMomentos from "../components/Profile/ProfileMomentos";

import axios from "axios";
import { useWindowDimensions } from "../utils/CustomHooks";
import ProfileUpload from "../components/Profile/ProfileUpload";

const ProfilePage = () => {
  const navigate = useNavigate();

  // const user = getUser();
  const user = {
    id: 123456789,
    username: "toluooshy",
    name: "Tolu Oshinowo",
    email: "toluooshy@gmail.com",
    color: "#ccfff3",
    emoji: "🧢",
    connections: [1, 2, 3, 4, 5, 6],
    images: [1, 2, 3, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2],
  };
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
        <ProfileMomentos profile={user} />
      </div>
      <button
        style={{ border: "none" }}
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
