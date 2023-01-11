"use es6";

import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { getUser } from "../../services/AuthService";

import momentos_white from "../../graphics/icons/momentos_white.png";
import profile_icon from "../../graphics/icons/profile.png";

const Navbar = ({}) => {
  const profile = getUser();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className="footer"
      style={{
        padding: "4px 0px 0px 0px",
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
        <div
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          <img
            style={{
              width: "24px",
              opacity: location.pathname.length < 4 ? "100%" : "40%",
            }}
            src={momentos_white}
            alt="momentos icon"
          />
        </div>
        <div
          onClick={() => {
            !!profile
              ? navigate(`/profile/${profile.username}`)
              : setSearchParams({ action: "signin" });
            window.location.reload();
          }}
        >
          <img
            style={{
              width: "24px",
              opacity:
                location.pathname.indexOf("profile") !== -1 ? "100%" : "40%",
            }}
            src={profile_icon}
            alt="profile icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
