import React from "react";
import { useLocation } from "react-router-dom";

const Header = ({}) => {
  const location = useLocation();

  const formattedParams = (params) => {
    return String(params).substring(1) === ""
      ? "Momentos"
      : String(params).substring(1, 2).toUpperCase() +
          String(params).substring(2).replace("=", "");
  };

  return (
    <div
      className="header"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          padding: "10px",
          textAlign: "center",
          fontSize: "xx-large",
          margin: "auto",
          width: "90%",
        }}
      >
        {formattedParams(location.pathname)}
      </div>
    </div>
  );
};

export default Header;
