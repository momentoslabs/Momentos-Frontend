"use es6";

import React from "react";

import MomentosChip from "../Momentos/MomentosChip";

const ProfileItems = ({ profile = {} }) => {
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
          width: "360px",
          flexWrap: "wrap",
        }}
      >
        {!!profile.items &&
          profile.items.map((item, index) => (
            <MomentosChip key={index} id={item} />
          ))}
      </div>
    </div>
  );
};

export default ProfileItems;
