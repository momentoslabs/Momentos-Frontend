import React from "react";

import { useWindowDimensions } from "../../utils/CustomHooks";

const ProfileMomentos = ({ profile = {} }) => {
  const addingActive = true;
  const dimensions = useWindowDimensions();

  return (
    <div
      style={{
        height: "fit-content",
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "360px",
          flexWrap: "wrap",
        }}
      >
        {profile.images.map((image, index) => (
          <div className="imagebox">
            <img
              src={image}
              style={{ width: "100%", height: "100%", borderRadius: "20px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileMomentos;
