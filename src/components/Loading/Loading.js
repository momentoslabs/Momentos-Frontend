"use es6";

import React from "react";

import loading from "../../graphics/icons/loading.gif";

const Loading = ({ width = 200 }) => {
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <img
        style={{
          width: `${width}px`,
          height: "80px",
        }}
        src={loading}
      />
    </div>
  );
};

export default Loading;
