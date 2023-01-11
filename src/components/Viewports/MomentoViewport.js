"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import MomentosCard from "../Momentos/MomentosCard";

const MomentoViewport = ({ data = {}, setMomentoVisible }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      {!!data && (
        <div className="modal-container">
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "300px",
              borderRadius: "10px",
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
                  height: "0px",
                }}
                onClick={() => {
                  setMomentoVisible(false);
                  setSearchParams({});
                }}
              >
                &#10005;
              </div>
              <MomentosCard data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentoViewport;
