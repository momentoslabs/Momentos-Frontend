import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../utils/CustomHooks";
import ProfileChip from "../Profile/ProfileChip";

import search from "../../graphics/icons/search.png";

const ConnectionsViewport = ({ profile = {}, setConnectionsVisible }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchedUsername, setSearchedUsername] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("");
  const [emoji, setEmoji] = useState("");

  const navigate = useNavigate();

  const connections = [
    { id: 1, username: "bob", color: "#0cff20", emoji: "⛺️" },
    { id: 2, username: "sam", color: "#ff4341", emoji: "📺" },
    { id: 3, username: "willy", color: "#f89721", emoji: "🎩" },
    { id: 4, username: "jane", color: "#e1ccf1", emoji: "🥶" },
    { id: 5, username: "keke", color: "#cde7f1", emoji: "🪐" },
    { id: 6, username: "himmyneutron", color: "#fff401", emoji: "🖍" },
  ];

  const results = [
    { id: 1, username: "bob", color: "#0cff20", emoji: "⛺️" },
    { id: 2, username: "sam", color: "#ff4341", emoji: "📺" },
    { id: 3, username: "willy", color: "#f89721", emoji: "🎩" },
    { id: 4, username: "jane", color: "#e1ccf1", emoji: "🥶" },
    { id: 5, username: "keke", color: "#cde7f1", emoji: "🪐" },
    { id: 6, username: "himmyneutron", color: "#fff401", emoji: "🖍" },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };
    const requestBody = {
      username: username,
    };

    axios
      .post(
        `${process.env.REACT_APP_USERS_API_URL}/users`,
        requestBody,
        requestConfig
      )
      .then(() => {
        navigate("/profile");
        setConnectionsVisible(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                setConnectionsVisible(false);
              }}
            >
              &#10005;
            </div>
            <h1>Connections</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "#eeeeee",
                borderRadius: "25px",
                height: "40px",
              }}
            >
              <p
                style={{
                  textDecoration: !searchVisible ? "underline" : "none",
                }}
                onClick={() => setSearchVisible(false)}
              >
                Connections
              </p>
              <p
                style={{ textDecoration: searchVisible ? "underline" : "none" }}
                onClick={() => setSearchVisible(true)}
              >
                Search
              </p>
            </div>
            <br />
            {!searchVisible && (
              <div>
                {connections.map((connection, index) => (
                  <ProfileChip profile={connection} />
                ))}
              </div>
            )}
            {searchVisible && (
              <div>
                <form
                  onSubmit={submitHandler}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <input
                    className="textinput"
                    style={{ width: "200px" }}
                    type="searchedUsername"
                    value={searchedUsername}
                    placeholder="Search by username"
                    maxlength="24"
                    onChange={(event) =>
                      setSearchedUsername(event.target.value)
                    }
                  />
                  <input
                    className="textinput"
                    type="image"
                    src={search}
                    width="24px"
                  />
                </form>
                {results.map((result, index) => (
                  <ProfileChip profile={result} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsViewport;
