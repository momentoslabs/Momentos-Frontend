"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";

import ProfileChip from "../Profile/ProfileChip";

import search from "../../graphics/icons/search.png";

const ConnectionsViewport = ({
  profile = {},
  isOwner = {},
  isConnected = {},
  setConnectionsVisible,
}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [user, setUser] = useState({});
  const [searchedUsername, setSearchedUsername] = useState("");
  const [oldSearchedUsername, setOldSearchedUsername] = useState("old");
  const [results, setResults] = useState([]);

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_USERS_API_URL}/users/${profile.id}`,
          requestConfig
        )
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    getUser();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    await axios
      .get(
        `${process.env.REACT_APP_USERS_API_URL}/users/${searchedUsername}`,
        requestConfig
      )
      .then((response) => {
        setResults([response.data]);
      })
      .catch((error) => {
        // console.log(error);
      });

    setOldSearchedUsername(searchedUsername);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        height: "fit-content",
        margin: "auto",
      }}
    >
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
                setConnectionsVisible(false);
                window.location.reload();
              }}
            >
              &#10005;
            </div>
            <h1 style={{ height: "15px" }}>Connections</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "#eeeeee",
                borderRadius: "10px",
                height: "40px",
                alignItems: "center",
              }}
            >
              <p
                className="highlightable"
                style={{
                  textDecoration: !searchVisible ? "underline" : "none",
                }}
                onClick={() => setSearchVisible(false)}
              >
                Connections
              </p>
              {isOwner && (
                <p
                  className="highlightable"
                  style={{
                    textDecoration: searchVisible ? "underline" : "none",
                  }}
                  onClick={() => setSearchVisible(true)}
                >
                  Search
                </p>
              )}
            </div>
            <br />
            {!!user.connections && (
              <div>
                {!searchVisible && (
                  <div>
                    {isOwner || isConnected ? (
                      <div>
                        {Object.keys(user.connections).length > 0 ? (
                          <div>
                            {Object.keys(user.connections).map(
                              (connection, index) => (
                                <ProfileChip
                                  key={index}
                                  profile={user}
                                  id={connection}
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <p style={{ lineHeight: "100%" }}>
                            Start searching to connect with friends and they
                            will show up here! 📇
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p style={{ lineHeight: "100%" }}>
                          Connect with this user first to view their
                          connections! 🚧
                        </p>
                      </div>
                    )}
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
                        style={{ width: "300px" }}
                        type="searchedUsername"
                        value={searchedUsername}
                        placeholder="Search by username"
                        maxLength="24"
                        onChange={(event) =>
                          setSearchedUsername(event.target.value.toLowerCase())
                        }
                      />
                      <input
                        className="textinput"
                        type="image"
                        src={search}
                        width="24px"
                        onClick={() => {
                          console.log("rrr");
                        }}
                      />
                    </form>
                    {searchedUsername === oldSearchedUsername &&
                      results.map((result, index) => (
                        <ProfileChip
                          key={index}
                          profile={user}
                          id={result.id}
                        />
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsViewport;
