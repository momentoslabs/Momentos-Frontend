import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWindowDimensions } from "../../utils/CustomHooks";

const ProfileChip = ({ profile = {}, id = {}, requesting = false }) => {
  const [user, setUser] = useState({});
  const [mode, setMode] = useState(
    !(user.id in profile.connections)
      ? 0
      : profile.connections[user.id].approved
      ? 2
      : 1
  );

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_USERS_API_URL}/users/${id}`,
          requestConfig
        )
        .then((response) => {
          setUser(response.data);
          setMode(
            !(response.data.id in profile.connections)
              ? 0
              : profile.connections[response.data.id].approved
              ? 2
              : 1
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();

    console.log({ mode });
  }, []);

  const handleConnection = (action) => {
    setMode(action);
    console.log({ mode });
    const requestBody1 = {
      connections: { id: user.id, action: action },
    };
    axios
      .post(
        `${process.env.REACT_APP_USERS_API_URL}/users/${profile.id}`,
        requestBody1,
        requestConfig
      )
      .then(() => {
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

    if (action === 1) {
      const requestBody2 = {
        id: Number(user.id),
        isrequest: true,
        isreviewed: false,
        isapproved: false,
        profileid: Number(profile.id),
      };

      axios
        .post(
          `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys`,
          requestBody2,
          requestConfig
        )
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      const requestBody2 = {
        id: Number(user.id),
        isrequest: true,
        isreviewed: true,
        isapproved: action === 2,
        profileid: Number(profile.id),
      };

      axios
        .post(
          `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys`,
          requestBody2,
          requestConfig
        )
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    !!user.color && (
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: `${user.color}`,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            margin: "8px 10px 0px 0px",
          }}
        >
          <div
            style={{
              position: "relative",
              margin: "auto",
              top: requesting ? "12px" : "23px",
              fontSize: "24px",
            }}
          >
            {user.emoji}
          </div>
        </div>
        <div
          style={{
            textAlign: "left",
            lineHeight: "5%",
          }}
        >
          <p style={{ fontWeight: "bold" }}>@{user.username}</p>

          {!!requesting ? (
            <div>
              <p>Requested to connect.</p>
              <button
                className="connectbutton"
                style={{ height: "22px", margin: "-2px 0px", width: "100px" }}
                onClick={() => {
                  handleConnection(2);
                }}
              >
                Accept
              </button>
              <button
                className="connectbutton"
                style={{ height: "22px", margin: "-2px 0px", width: "100px" }}
                onClick={() => {
                  handleConnection(0);
                }}
              >
                Reject
              </button>
            </div>
          ) : (
            <div>
              {mode === 0 && (
                <button
                  className="connectbutton"
                  style={{ height: "22px", margin: "-2px 0px", width: "100px" }}
                  onClick={() => {
                    handleConnection(1);
                  }}
                >
                  Connect
                </button>
              )}

              {mode === 2 ||
                (!!profile.connections[user.id] &&
                  profile.connections[user.id].approved && (
                    <button
                      className="connectbutton active"
                      style={{
                        height: "22px",
                        margin: "-2px 0px",
                        width: "100px",
                      }}
                      onClick={() => {
                        handleConnection(0);
                      }}
                    >
                      Connected
                    </button>
                  ))}
              {(mode === 1 ||
                (!!profile.connections[user.id] &&
                  !profile.connections[user.id].approved)) && (
                <button
                  className="connectbutton active"
                  style={{ height: "22px", margin: "-2px 0px", width: "100px" }}
                  onClick={() => {
                    handleConnection(0);
                  }}
                >
                  Requested
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProfileChip;
