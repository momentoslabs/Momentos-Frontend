"use es6";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MomentosCard = ({ profile = {}, data = {} }) => {
  const [initialReactions, setInitialReactions] = useState(null);
  const [sessionReactions, setSessionReactions] = useState(null);
  const [user, setUser] = useState({});
  const [sharetext, setSharetext] = useState("🔗");
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const navigate = useNavigate();

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  const getReactionData = async () => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys/${profile.id}`,
        requestConfig
      )
      .then(async (response) => {
        console.log(data.id);
        console.log(response.data.reactions);
        const reactions = !!response.data.reactions[data.id]
          ? response.data.reactions[data.id]
          : [0, 0, 0, 0];
        console.log(`${data.id}: ${reactions}`);
        setInitialReactions(reactions);
        setSessionReactions(reactions);
      })
      .catch((error) => {
        // console.log(error);
      });

    return res;
  };

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_USERS_API_URL}/users/${data.ownerid}`,
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
    getReactionData();
  }, []);

  const shareMomento = async () => {
    setSharetext("✔️");
    navigator.clipboard.writeText(
      `https://www.momentos.cc/?momento=${data.id}`
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSharetext("🔗");
  };

  const postReaction = async (reaction) => {
    await axios
      .get(
        `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys/${profile.id}`,
        requestConfig
      )
      .then(async (response) => {
        console.log(response.data.reactions);
        let reactions = !!response.data.reactions[data.id]
          ? response.data.reactions[data.id]
          : [0, 0, 0, 0];
        const active = reactions[reaction] === 0;
        reactions[reaction] = active ? 1 : 0;
        const requestBody1 = {
          id: data.id,
          reaction: reaction,
          active: active,
        };
        console.log(requestBody1);
        await axios
          .post(
            `${process.env.REACT_APP_ITEMS_API_URL}/reactions`,
            requestBody1,
            requestConfig
          )
          .then(() => {
            // window.location.reload();
          })
          .catch((error) => {
            // console.log(error);
          });
        const requestBody2 = {
          id: profile.id,
          isconnecting: false,
          postid: data.id,
          reactions: [...reactions],
        };
        await axios
          .post(
            `${process.env.REACT_APP_LIBRARYS_API_URL}/librarys`,
            requestBody2,
            requestConfig
          )
          .then(() => {
            // window.location.reload();
          })
          .catch((error) => {
            // console.log(error);
          });
      })
      .catch((err) => {
        // console.log(err);
      });
    console.log(sessionReactions);
  };

  return (
    <div
      style={{
        height: "fit-content",
        margin: "20px auto",
      }}
    >
      {!!user.username && (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <div
            className="highlightable"
            style={{ display: "flex", alignItems: "center", height: "60px" }}
            onClick={() => {
              navigate(`/profile/${user.username}`);
              window.location.reload();
            }}
          >
            <div
              style={{
                backgroundColor: `${user.color}`,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                margin: "6px 10px 0px 0px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  margin: "auto",
                  top: "-1px",
                  fontSize: "18px",
                  height: "fit-content",
                }}
              >
                {user.emoji}
              </div>
            </div>
            <h4
              style={{
                textAlign: "left",
                fontSize: "x-large",
                padding: "0px",
              }}
            >
              @{user.username}
            </h4>
          </div>
          <div
            style={{
              position: "relative",
            }}
            onClick={() => {
              setDescriptionVisible(!descriptionVisible);
            }}
          >
            <img
              src={data.image}
              style={{
                borderRadius: "10px",
                width: "100%",
              }}
            />
            {descriptionVisible && (
              <div
                style={{
                  borderRadius: "10px",
                  position: "absolute",
                  display: "block",
                  transform: "translateX(-50%)",
                  left: "50%",
                  top: "0",
                  width: "100%",
                  height: "99%",
                  background: "rgba(0, 0, 0, 0.75)",
                  color: "#fff",
                }}
              >
                <h4
                  style={{
                    margin: "10px",
                    fontSize: "18px",
                    textAlign: "left",
                  }}
                >
                  {data.description}
                </h4>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {!!sessionReactions && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div
                  className="highlightable"
                  style={{
                    maxWidth: "fit-content",
                    height: "35px",
                    margin: "10px 10px 10px 0px",
                    color: !!sessionReactions[0] ? "#ddd" : "#212121",
                    backgroundColor: !!sessionReactions[0] ? "#212121" : "#ddd",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "x-large",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    postReaction(0);
                    setSessionReactions((prevSessionReactions) => [
                      prevSessionReactions[0] === 0 ? 1 : 0,
                      prevSessionReactions[1],
                      prevSessionReactions[2],
                      prevSessionReactions[3],
                    ]);
                  }}
                >
                  <div style={{ padding: "5px 0px 5px 7.5px" }}>❤️</div>
                  <div style={{ padding: "5px 7.5px 5px 5px" }}>
                    <h4>
                      {data.likes + sessionReactions[0] - initialReactions[0]}
                    </h4>
                  </div>
                </div>
                <div
                  className="highlightable"
                  style={{
                    width: "fit-content",
                    height: "35px",
                    margin: "10px 10px 10px 0px",
                    color: !!sessionReactions[1] ? "#ddd" : "#212121",
                    backgroundColor: !!sessionReactions[1] ? "#212121" : "#ddd",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "x-large",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    postReaction(1);
                    setSessionReactions((prevSessionReactions) => [
                      prevSessionReactions[0],
                      prevSessionReactions[1] === 0 ? 1 : 0,
                      prevSessionReactions[2],
                      prevSessionReactions[3],
                    ]);
                  }}
                >
                  <div style={{ padding: "5px 0px 5px 7.5px" }}>🔥</div>
                  <div style={{ padding: "5px 7.5px 5px 5px" }}>
                    <h4>
                      {data.fires + sessionReactions[1] - initialReactions[1]}
                    </h4>
                  </div>
                </div>
                <div
                  className="highlightable"
                  style={{
                    width: "fit-content",
                    height: "35px",
                    margin: "10px 10px 10px 0px",
                    color: !!sessionReactions[2] ? "#ddd" : "#212121",
                    backgroundColor: !!sessionReactions[2] ? "#212121" : "#ddd",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "x-large",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    postReaction(2);
                    setSessionReactions((prevSessionReactions) => [
                      prevSessionReactions[0],
                      prevSessionReactions[1],
                      prevSessionReactions[2] === 0 ? 1 : 0,
                      prevSessionReactions[3],
                    ]);
                  }}
                >
                  <div style={{ padding: "5px 0px 5px 7.5px" }}>👏</div>
                  <div style={{ padding: "5px 7.5px 5px 5px" }}>
                    <h4>
                      {data.claps + sessionReactions[2] - initialReactions[2]}
                    </h4>
                  </div>
                </div>
                <div
                  className="highlightable"
                  style={{
                    width: "fit-content",
                    height: "35px",
                    margin: "10px 10px 10px 0px",
                    color: !!sessionReactions[3] ? "#ddd" : "#212121",
                    backgroundColor: !!sessionReactions[3] ? "#212121" : "#ddd",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "x-large",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    postReaction(3);
                    setSessionReactions((prevSessionReactions) => [
                      prevSessionReactions[0],
                      prevSessionReactions[1],
                      prevSessionReactions[2],
                      prevSessionReactions[3] === 0 ? 1 : 0,
                    ]);
                  }}
                >
                  <div style={{ padding: "5px 0px 5px 7.5px" }}>😂</div>
                  <div style={{ padding: "5px 7.5px 5px 5px" }}>
                    <h4>
                      {data.laughs + sessionReactions[3] - initialReactions[3]}
                    </h4>
                  </div>
                </div>
              </div>
            )}
            <div
              className="highlightable"
              style={{
                width: "fit-content",
                height: "35px",
                margin: "10px 0px 10px 10px",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                fontSize: "x-large",
                alignItems: "center",
              }}
              onClick={() => {
                shareMomento();
              }}
            >
              <div style={{ padding: "5px 7.5px 5px 7.5px" }}>{sharetext}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentosCard;
