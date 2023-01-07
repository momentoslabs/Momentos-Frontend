import React, { useEffect, useState } from "react";
import axios from "axios";
import MomentosChip from "../Momentos/MomentosChip";

const ProfileItems = ({ profile = {} }) => {
  return (
    <div
      style={{
        height: "fit-content",
        margin: "auto",
      }}
    >
      {console.log(profile.items)}
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
          profile.items.map((item, index) => <MomentosChip id={item} />)}
      </div>
    </div>
  );
};

export default ProfileItems;
