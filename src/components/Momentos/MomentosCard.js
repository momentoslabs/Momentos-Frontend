import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../utils/CustomHooks";

import edit from "../../graphics/icons/edit.png";

const MomentosCard = ({ data = {} }) => {
  const [reactedLike, setReactedLike] = useState(false);
  const [reactedFire, setReactedFire] = useState(false);
  const [reactedClap, setReactedClap] = useState(false);
  const [reactedLaugh, setReactedLaugh] = useState(false);

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
          @toluooshy
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
