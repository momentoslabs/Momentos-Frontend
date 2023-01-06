import React from "react";

import { useWindowDimensions } from "../../utils/CustomHooks";

const ProfileChip = ({ profile = {} }) => {
  const connections = [1, 2, 3];

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          backgroundColor: `${profile.color}`,
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
          {profile.emoji}
        </div>
      </div>
      <div
        style={{
          textAlign: "left",
          lineHeight: "5%",
        }}
      >
        <p style={{ fontWeight: "bold" }}>@{profile.username}</p>
        {connections.indexOf(profile.id) !== -1 ? (
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
