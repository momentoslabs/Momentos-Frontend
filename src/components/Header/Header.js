import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getUser, resetUserSession } from "../../services/AuthService";

import momentos_black from "../../graphics/icons/momentos_black.png";
import notifications from "../../graphics/icons/notifications.png";
import NotificationsViewport from "../Viewports/NotificationsViewport";

const Header = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const profile = getUser();

  const formattedParams = (params) => {
    return String(params).substring(1) === ""
      ? "Momentos"
      : String(params).substring(1, 2).toUpperCase() +
          String(params).substring(2).replace("=", "");
  };

  const signoutHandler = () => {
    resetUserSession();
    navigate("/");
  };

  return (
    <div
      className="header"
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "0px 15px",
          position: "relative",
          top: "-5px",
          textAlign: "center",
          fontSize: "xx-large",
          margin: "auto",
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            className="highlightable"
            style={{
              position: "relative",
              top: "6px",
              padding: "0px 5px",
              height: "32px",
            }}
            src={momentos_black}
            onClick={() => {
              navigate("/");
            }}
          />
          {formattedParams(location.pathname)}
        </div>

        {!!profile ? (
          <div
            style={{
              display: "flex",
              position: "relative",
              right: "0px",
            }}
          >
            <img
              className="highlightable"
              style={{
                position: "relative",
                height: "32px",
                margin: "auto 15px",
              }}
              onClick={() => setNotificationsVisible(true)}
              src={notifications}
            />
            <button
              className="uploadbutton"
              style={{ width: "80px", margin: "auto" }}
              onClick={() => {
                signoutHandler();
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            className="uploadbutton"
            style={{ width: "80px", margin: "auto 0px auto auto" }}
            onClick={() => {
              setSearchParams({ action: "signin" });
            }}
          >
            Sign in
          </button>
        )}
      </div>
      {notificationsVisible && (
        <NotificationsViewport
          profile={profile}
          setNotificationsVisible={setNotificationsVisible}
        />
      )}
    </div>
  );
};

export default Header;
