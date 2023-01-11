"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MomentosCard = ({ data = {} }) => {
  const [reactedLike, setReactedLike] = useState(false);
  const [reactedFire, setReactedFire] = useState(false);
  const [reactedClap, setReactedClap] = useState(false);
  const [reactedLaugh, setReactedLaugh] = useState(false);

  const [user, setUser] = useState({});
  const [sharetext, setSharetext] = useState("🔗");

  const navigate = useNavigate();

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
          <img
            src={data.image}
            style={{
              borderRadius: "10px",
              maxWidth: "100%",
              maxHeight: "300px",
            }}
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
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                  alignItems: "center",
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
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                  alignItems: "center",
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
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                  alignItems: "center",
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
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                  alignItems: "center",
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
              <div style={{ padding: "5px 10px 5px 10px" }}>{sharetext}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentosCard;
