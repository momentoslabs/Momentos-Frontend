"use es6";

import React from "react";

const UnknownPage = () => {
  const containerstyle = {
    width: "80%",
    margin: "80px auto",
  };

  return (
    <>
      <div style={containerstyle}>
        <h1 className="label" style={{ fontSize: "48px" }}>
          404: Page Not Found.
        </h1>
        <h1>This page may not currently exist today, but it could some day!</h1>
        <h3>
          <i>
            "If something's bound to happen, it wil happen... Right time, right
            person, and for the best reason."
          </i>
          - Aristotle
        </h3>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default UnknownPage;
