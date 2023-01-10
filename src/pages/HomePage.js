"use es6";

import React, { useState, useEffect } from "react";

import SigninViewport from "../components/Viewports/SigninViewport";
import SignupViewport from "../components/Viewports/SignupViewport";

import { useSearchParams } from "react-router-dom";
import { getUser } from "../services/AuthService";

import axios from "axios";
import MomentosList from "../components/Momentos/MomentosList";
import MomentoViewport from "../components/Viewports/MomentoViewport";

const HomePage = ({}) => {
  const profile = getUser();
  const [items, setItems] = useState([]);

  const [signupVisible, setSignupVisible] = useState(false);
  const [signinVisible, setSigninVisible] = useState(false);

  const [momentoVisible, setMomentoVisible] = useState(false);

  const [momento, setMomento] = useState();
  const [searchParams] = useSearchParams();

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
          return response.data;
        })
        .then(async (user) => {
          const connections = [];
          Object.keys(user.connections).map((connection, index) => {
            if (user.connections[connection]) {
              connections.push(connection);
            }
          });
          let itemIds = [];
          for (let i = 0; i < connections.length; i++) {
            await axios
              .get(
                `${process.env.REACT_APP_USERS_API_URL}/users/${connections[i]}`,
                requestConfig
              )
              .then((response) => {
                itemIds = [...response.data.lastthree, ...itemIds];
              })
              .catch((err) => {
                // console.log(err);
              });
          }
          return itemIds.sort();
        })
        .then(async (itemIds) => {
          let items = [];
          for (let j = 0; j < itemIds.length; j++) {
            await axios
              .get(
                `${process.env.REACT_APP_ITEMS_API_URL}/items/${itemIds[j]}`,
                requestConfig
              )
              .then((response) => {
                items = [response.data, ...items];
              })
              .catch((err) => {
                // console.log(err);
              });
          }
          return items;
        })
        .then(async (items) => {
          setItems(items);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    if (
      searchParams.get("momento") !== null &&
      !isNaN(Number(searchParams.get("momento"))) &&
      searchParams.get("momento").replaceAll(" ", "").length !== 0 &&
      searchParams.get("momento").length !== 0
    ) {
      const id = searchParams.get("momento");
      const getMomento = async (id) => {
        await axios
          .get(
            `${process.env.REACT_APP_ITEMS_API_URL}/items/${id}`,
            requestConfig
          )
          .then((response) => {
            setMomento(response.data);
            setMomentoVisible(true);
          })
          .catch((err) => {
            // console.log(err);
          });
      };
      getMomento(id);
    }
  }, []);

  return (
    <div
      style={{
        padding: "60px 0px 40px 0px",
        margin: "auto",
      }}
    >
      {(signupVisible || searchParams.get("action") === "signup") && (
        <SignupViewport setSignupVisible={setSignupVisible} />
      )}
      {(signinVisible || searchParams.get("action") === "signin") && (
        <SigninViewport setSigninVisible={setSigninVisible} />
      )}
      {momentoVisible && (
        <MomentoViewport data={momento} setMomentoVisible={setMomentoVisible} />
      )}
      {!!items && (
        <div>
          <div style={{ margin: "auto" }}>
            <MomentosList profile={profile} items={items} />
          </div>
        </div>
      )}
      <br />
    </div>
  );
};

export default HomePage;
