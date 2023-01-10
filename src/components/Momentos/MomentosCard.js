"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";

const MomentosCard = ({ data = {} }) => {
  const [reactedLike, setReactedLike] = useState(false);
  const [reactedFire, setReactedFire] = useState(false);
  const [reactedClap, setReactedClap] = useState(false);
  const [reactedLaugh, setReactedLaugh] = useState(false);

  const [user, setUser] = useState({});
  const [sharetext, setSharetext] = useState("🔗");

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
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
  }, []);

  const shareMomento = async () => {
    setSharetext("✔️");
    navigator.clipboard.writeText(`momentos.cc/?momento=${data.id}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSharetext("🔗");
  };

  return (
    <div
      style={{
        height: "fit-content",
        width: "90%",
        height: "fit-content",
        margin: "20px auto",
      }}
    >
      {!!user.username && (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <div
            style={{
              textAlign: "left",
              fontSize: "x-large",
              padding: "10px 0px",
            }}
          >
            @{user.username}
          </div>
          <img
            src={data.image}
            style={{ borderRadius: "25px", width: "100%" }}
          />
          <div
            style={{
              textAlign: "left",
              fontSize: "large",
              padding: "10px 0px",
            }}
          >
            {data.description}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div
                className="highlightable"
                style={{
                  maxWidth: "fit-content",
                  height: "35px",
                  margin: "10px 10px 10px 0px",
                  backgroundColor: "#ddd",
                  borderRadius: "25px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                }}
              >
                <div style={{ padding: "5px 0px 5px 15px" }}>❤️</div>
                <div style={{ padding: "5px 15px 5px 5px" }}>{data.likes}</div>
              </div>
              <div
                className="highlightable"
                style={{
                  width: "fit-content",
                  height: "35px",
                  margin: "10px 10px 10px 0px",
                  backgroundColor: "#ddd",
                  borderRadius: "25px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                }}
              >
                <div style={{ padding: "5px 0px 5px 15px" }}>🔥</div>
                <div style={{ padding: "5px 15px 5px 5px" }}>{data.fires}</div>
              </div>
              <div
                className="highlightable"
                style={{
                  width: "fit-content",
                  height: "35px",
                  margin: "10px 10px 10px 0px",
                  backgroundColor: "#ddd",
                  borderRadius: "25px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                }}
              >
                <div style={{ padding: "5px 0px 5px 15px" }}>👏</div>
                <div style={{ padding: "5px 15px 5px 5px" }}>{data.claps}</div>
              </div>
              <div
                className="highlightable"
                style={{
                  width: "fit-content",
                  height: "35px",
                  margin: "10px 10px 10px 0px",
                  backgroundColor: "#ddd",
                  borderRadius: "25px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                }}
              >
                <div style={{ padding: "5px 0px 5px 15px" }}>😂</div>
                <div style={{ padding: "5px 15px 5px 5px" }}>{data.laughs}</div>
              </div>
            </div>
            <div
              className="highlightable"
              style={{
                width: "fit-content",
                height: "35px",
                margin: "10px 0px 10px 10px",
                backgroundColor: "#ddd",
                borderRadius: "25px",
                display: "flex",
                justifyContent: "center",
                fontSize: "x-large",
              }}
              onClick={() => {
                shareMomento();
              }}
            >
              <div style={{ padding: "5px 10px 5px 10px" }}>{sharetext}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentosCard;
