"use es6";

import React, { useState } from "react";

import EditViewport from "../Viewports/EditViewport";
import ConnectionsViewport from "../Viewports/ConnectionsViewport";

import edit from "../../graphics/icons/edit.png";

const ProfileCard = ({ profile = {}, isOwner = false }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [connectionsVisible, setConnectionsVisible] = useState(false);

  return (
    <div
      style={{
        height: "fit-content",
        margin: "auto",
      }}
    >
      <div className="profilecard" style={{ textAlign: "center" }}>
        <h3>{`@${profile.username}`}</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              backgroundColor: `${profile.color}`,
              width: "128px",
              height: "128px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                margin: "auto",
                fontSize: "64px",
                height: "fit-content",
              }}
            >
              {profile.emoji}
            </div>
          </div>
        </div>
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
          {isOwner && (
            <img
              className="highlightable"
              style={{
                position: "relative",
                top: "-1px",
                height: "24px",
                margin: "5px",
              }}
              onClick={() => setEditVisible(true)}
              src={edit}
            />
          )}
        </div>
        {!!profile.connections && (
          <div
            className="highlightable"
            style={{
              position: "relative",
              top: "15px",
              margin: "5px",
            }}
            onClick={() => setConnectionsVisible(true)}
          >
            {
              Object.keys(profile.connections)
                .filter((boolean) => {
                  return profile.connections[boolean];
                })
                .map(Boolean).length
            }{" "}
            connections
          </div>
        )}
        {editVisible && (
          <EditViewport profile={profile} setEditVisible={setEditVisible} />
        )}
        {connectionsVisible && (
          <ConnectionsViewport
            profile={profile}
            isOwner={isOwner}
            setConnectionsVisible={setConnectionsVisible}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
