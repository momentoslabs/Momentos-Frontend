import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../utils/CustomHooks";
import ProfileChip from "../Profile/ProfileChip";

import search from "../../graphics/icons/search.png";

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
                border: "#000000 solid 2px",
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
