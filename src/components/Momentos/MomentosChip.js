"use es6";

import React, { useEffect, useState } from "react";
import axios from "axios";

import MomentoViewport from "../Viewports/MomentoViewport";

const MomentosChip = ({ id = {} }) => {
  const [item, setItem] = useState([]);
  const [momentoVisible, setMomentoVisible] = useState(false);

  const requestConfig = {
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  };

  useEffect(() => {
    const getItem = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_ITEMS_API_URL}/items/${id}`,
          requestConfig
        )
        .then((response) => {
          setItem(response.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    getItem();
  }, []);

  return (
    <div>
      <img
        className="itembox"
        onClick={() => setMomentoVisible(true)}
        src={item.image}
      />
      {momentoVisible && (
        <MomentoViewport data={item} setMomentoVisible={setMomentoVisible} />
      )}
    </div>
  );
};

export default MomentosChip;
