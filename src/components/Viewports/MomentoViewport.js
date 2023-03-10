"use es6";

import React from "react";
import { useSearchParams } from "react-router-dom";

import MomentosCard from "../Momentos/MomentosCard";

const MomentoViewport = ({ profile = {}, data = {}, setMomentoVisible }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      {!!data && (
        <div
          className="modal-container"
          style={{
            padding: "20px",
            overflowY: "scroll",
          }}
        >
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
              <MomentosCard profile={profile} data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentoViewport;
