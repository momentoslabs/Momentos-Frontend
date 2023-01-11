"use es6";

import React from "react";

const NoticeViewport = ({ setNoticeVisible, message }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        height: "fit-content",
        width: "90%",
        margin: "auto",
      }}
    >
      <div className="modal-container">
        <div
          style={{
            backgroundColor: "#ffffff",
            width: "300px",
            borderRadius: "25px",
            height: "fit-content",
            padding: "15px",
            margin: "auto",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "large",
                textAlign: "left",
                margin: "5px 0px",
              }}
              onClick={() => {
                setNoticeVisible(false);
              }}
            >
              &#10005;
            </div>
            <h1>Notice</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                borderRadius: "25px",
                padding: "20px",
                height: "40px",
              }}
            >
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeViewport;
