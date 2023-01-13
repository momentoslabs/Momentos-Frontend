"use es6";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { getUser } from "../services/AuthService";

import ProfileCard from "../components/Profile/ProfileCard";
import ProfileItems from "../components/Profile/ProfileItems";
import Loading from "../components/Loading/Loading";
import ProfileUpload from "../components/Profile/ProfileUpload";
import Connect from "../components/Connect/Connect";

const ProfilePage = () => {
  const [profile, setProfile] = useState(getUser());

  const currentProfile = getUser();
  console.log(profile);
  const [user, setUser] = useState({});

  const username = useLocation().pathname.split("/")[2];

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(username);
  useEffect(() => {
    if (!username) {
      if (!profile) {
        setSearchParams({ action: "signin" });
      } else {
        navigate("/");
      }
    }
  }, []);

  const isOwner = profile.username === username;

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  useEffect(() => {
    const getProfile = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_USERS_API_URL}/users/${profile.id}`,
          requestConfig
        )
        .then((response) => {
          setProfile(response.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    getProfile().then(() => {
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
            // console.log(err);
          });
      };
      getUser();
    });
  }, []);

  return (
    <div
      style={{
        padding: "70px 0px 40px 0px",
      }}
    >
      {!!user.username && profile.connections && currentProfile ? (
        <div style={{ width: "100%" }}>
          <ProfileCard
            profile={user}
            isOwner={isOwner}
            isConnected={profile.connections[user.id]}
          />
          <div
            style={{
              margin: "30px auto",
            }}
          >
            {isOwner ? (
              <ProfileUpload profile={user} isOwner={isOwner} />
            ) : (
              <Connect
                currentId={currentProfile.id}
                profile={profile}
                user={user}
                requesting={false}
              />
            )}
          </div>
          <ProfileItems
            profile={user}
            isOwner={isOwner}
            isConnected={profile.connections[user.id]}
          />
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            display: "flex",
          }}
        >
          <Loading />
        </div>
      )}
      <br />
    </div>
  );
};

export default ProfilePage;
