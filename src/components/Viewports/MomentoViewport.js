import React, { useState, useEffect } from "react";
import axios from "axios";
import MomentosCard from "../Momentos/MomentosCard";

const MomentoViewport = ({ data = {}, setMomentoVisible }) => {
  return (
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
              setMomentoVisible(false);
            }}
          >
            &#10005;
          </div>
          <MomentosCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default MomentoViewport;
