import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../utils/CustomHooks";

const MomentoViewport = ({ profile = {}, setMomentoVisible }) => {
  return (
    <div
      style={{
        position: "absolute",
        height: "fit-content",
        width: "90%",
        margin: "auto",
      }}
    ></div>
  );
};

export default MomentoViewport;
