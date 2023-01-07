import React, { useState, useEffect } from "react";
import axios from "axios";

const MomentosCard = ({ data = {} }) => {
  const [reactedLike, setReactedLike] = useState(false);
  const [reactedFire, setReactedFire] = useState(false);
  const [reactedClap, setReactedClap] = useState(false);
  const [reactedLaugh, setReactedLaugh] = useState(false);

  const [user, setUser] = useState({});

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
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div
      style={{
        height: "fit-content",
        width: "90%",
        height: "fit-content",
        margin: "20px auto",
      }}
    >
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
        <img src={data.image} style={{ borderRadius: "25px", width: "100%" }} />
        <div
          style={{ textAlign: "left", fontSize: "large", padding: "10px 0px" }}
        >
          {data.description}
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div
              style={{
                maxWidth: "fit-content",
                height: "40px",
                margin: "10px 10px 10px 0px",
                backgroundColor: "#ddeeff",
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
              style={{
                width: "fit-content",
                height: "40px",
                margin: "10px 10px 10px 0px",
                backgroundColor: "#ddeeff",
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
              style={{
                width: "fit-content",
                height: "40px",
                margin: "10px 10px 10px 0px",
                backgroundColor: "#ddeeff",
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
              style={{
                width: "fit-content",
                height: "40px",
                margin: "10px 10px 10px 0px",
                backgroundColor: "#ddeeff",
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
        </div>
      </div>
    </div>
  );
};

export default MomentosCard;
