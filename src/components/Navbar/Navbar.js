import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowDimensions } from "../../utils/CustomHooks";
import { DESKTOP_MIN } from "../../utils/Constants";

import momentos_white from "../../graphics/icons/momentos_white.png";
import profile from "../../graphics/icons/profile.png";

const Navbar = ({}) => {
  const location = useLocation();
  const dimensions = useWindowDimensions();

  return (
    <div
      className="footer"
      style={{
        padding: "4px 0px",
      }}
    >
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "500px",
        }}
      >
        <div>
          <Link to="/">
            <img
              style={{
                width: "24px",
                opacity: location.pathname.length < 4 ? "100%" : "40%",
              }}
              src={momentos_white}
              alt="momentos icon"
            />
          </Link>
        </div>
        <div>
          <Link to="/profile">
            <img
              style={{
                width: "24px",
                opacity:
                  location.pathname.indexOf("profile") !== -1 ? "100%" : "40%",
              }}
              src={profile}
              alt="profile icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
