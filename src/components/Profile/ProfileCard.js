import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../utils/CustomHooks";

import edit from "../../graphics/icons/edit.png";
import EditViewport from "../Viewports/EditViewport";
import ConnectionsViewport from "../Viewports/ConnectionsViewport";

const ProfileCard = ({ profile = {} }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [connectionsVisible, setConnectionsVisible] = useState(false);

  return (
    <div
      style={{
        height: "fit-content",
        width: "90%",
        margin: "auto",
      }}
    >
      <div
        className="profilecard"
        style={{ lineHeight: "50%", textAlign: "center" }}
      >
        <h3>{`@${profile.username}`}</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              backgroundColor: `${profile.color}`,
              width: "128px",
              height: "128px",
              borderRadius: "50%",
            }}
          >
            <div
              style={{
                position: "relative",
                top: "60px",
                fontSize: "64px",
              }}
            >
              {profile.emoji}
            </div>
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            height: "0px",
            justifyContent: "center",
            padding: "10px 0px",
            margin: "0px 0px 0px 10px",
          }}
        >
          <h2
            style={{
              position: "relative",
              top: "-15px",
            }}
          >
            {profile.name}
          </h2>
          <img
            style={{
              position: "relative",
              top: "-10px",
              height: "24px",
              margin: "5px",
            }}
            onClick={() => setEditVisible(true)}
            src={edit}
          />
        </div>
        <div
          style={{
            position: "relative",
            top: "15px",
            margin: "5px",
          }}
          onClick={() => setConnectionsVisible(true)}
        >
          {profile.connections.length} connections
        </div>
        {editVisible && <EditViewport setEditVisible={setEditVisible} />}
        {connectionsVisible && (
          <ConnectionsViewport setConnectionsVisible={setConnectionsVisible} />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
