"use es6";

import React from "react";

import MomentosCard from "./MomentosCard";

const MomentosList = ({ items = {} }) => {
  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  return (
    <div
      style={{
        height: "fit-content",
        margin: "auto",
      }}
    >
      <div>
        <div>
          {items.map((item, index) => (
            <MomentosCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MomentosList;
