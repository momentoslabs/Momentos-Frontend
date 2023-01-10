"use es6";

import React from "react";

import loading from "../../graphics/icons/loading.gif";

const Loading = ({ width = "50px" }) => {
  return (
    <div>
      <img
        style={{
          padding: "10px",
          width: `${width}px`,
        }}
        src={loading}
      />
    </div>
  );
};

export default Loading;
