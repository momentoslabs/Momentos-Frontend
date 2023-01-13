"use es6";

import React from "react";

import { getUser } from "../../services/AuthService";

import MomentosChip from "../Momentos/MomentosChip";

const ProfileItems = ({
  profile = {},
  isOwner = false,
  isConnected = false,
}) => {
  return (
    <div
      style={{
        height: "fit-content",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {!!profile.items &&
          (isOwner || isConnected) &&
          profile.items.map((item, index) => (
            <MomentosChip key={index} profile={getUser()} id={item} />
          ))}
      </div>
    </div>
  );
};

export default ProfileItems;
