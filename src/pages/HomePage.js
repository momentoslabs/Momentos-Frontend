"use es6";

import React, { useState, useEffect } from "react";

import SigninViewport from "../components/Viewports/SigninViewport";
import SignupViewport from "../components/Viewports/SignupViewport";

import { useSearchParams } from "react-router-dom";

import axios from "axios";
import MomentosList from "../components/Momentos/MomentosList";

const HomePage = ({}) => {
  const [signupVisible, setSignupVisible] = useState(false);
  const [signinVisible, setSigninVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };

    const res = await axios
      .get(`${process.env.REACT_APP_PETS_API_URL}/pets`, requestConfig)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });

    setPets(res);
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div
      style={{
        padding: "70px 0px 40px 0px",
        margin: "auto",
      }}
    >
      {/* {(signupVisible || searchParams.get("action") === "signup") && (
        <SignupViewport setSignupVisible={setSignupVisible} />
      )}
      {(signinVisible || searchParams.get("action") === "signin") && (
        <SigninViewport setSigninVisible={setSigninVisible} />
      )} */}
      <div style={{ margin: "auto" }}>
        <MomentosList />
      </div>
      <br />
    </div>
  );
};

export default HomePage;
