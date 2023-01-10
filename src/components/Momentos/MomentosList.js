"use es6";

import React from "react";

import MomentosCard from "./MomentosCard";

const MomentosList = ({ profile = {}, items = {} }) => {
  return (
    <div
      style={{
        height: "fit-content",
        margin: "auto",
      }}
    >
      {!!items && (
        <div>
          {items.length > 0 ? (
            <div>
              {items.map((item, index) => (
                <MomentosCard key={index} data={item} />
              ))}
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "30%",
                width: "100%",
              }}
            >
              <div style={{ margin: "auto", width: "80%" }}>
                <h1>It's pretty quiet around here...</h1>
                {!!profile ? (
                  <p>
                    Start connecting with others to see your Momentos feed come
                    to life!
                  </p>
                ) : (
                  <p>
                    Sign in to start creating your own personalized feed of
                    Momentos!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MomentosList;
