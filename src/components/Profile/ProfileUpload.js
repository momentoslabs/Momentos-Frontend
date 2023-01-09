import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useScrollBlock } from "../../utils/CustomHooks";

import { useWindowDimensions } from "../../utils/CustomHooks";

import snap from "../../graphics/icons/snap.png";
import back from "../../graphics/icons/back.png";
import rotate from "../../graphics/icons/rotate.png";
import upload from "../../graphics/icons/upload.png";
import Timer from "../Timer/Timer";
import NoticeViewport from "../Viewports/NoticeViewport";

const ProfileUpload = ({ profile = {} }) => {
  const uploadActive = Date.now() - profile.lastactive >= 86400000;
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [frontCameraActive, setFrontCameraActive] = useState(true);
  const webcamRef = useRef(null);

  const dimensions = useWindowDimensions();

  const [blockScroll, allowScroll] = useScrollBlock();

  const navigate = useNavigate();

  const videoConstraints = {
    width: dimensions.width,
    height: dimensions.height,
    facingMode: frontCameraActive ? "user" : { exact: "environment" },
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };
    const id = Date.now();
    const requestBody1 = {
      id: id,
      ownerid: profile.id,
      description: description,
      image: img,
      likes: 0,
      fires: 0,
      claps: 0,
      laughs: 0,
    };
    const requestBody2 = {
      items: id,
      lastactive: Date.now(),
    };
    await axios.post(
      `${process.env.REACT_APP_ITEMS_API_URL}/items`,
      requestBody1,
      requestConfig
    );
    await axios
      .post(
        `${process.env.REACT_APP_USERS_API_URL}/users/${profile.id}`,
        requestBody2,
        requestConfig
      )
      .then(() => {
        navigate("/profile");
        setUploadModalOpen(false);
        allowScroll();
        setImg(null);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        style={{
          margin: "30px auto",
        }}
      >
        {typeof profile.lastactive === "number" && (
          <div>
            {!!uploadActive ? (
              <button
                onClick={() => {
                  setUploadModalOpen(true);
                  blockScroll();
                }}
                className="uploadbutton"
              >
                Upload Momento
              </button>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setNoticeVisible(true);
                  }}
                  className="uploadbutton disabled"
                >
                  Upload Momento
                </button>
                <br />
                <small style={{ display: "flex", justifyContent: "center" }}>
                  upload again in&nbsp;
                  <Timer endtime={profile.lastactive + 86400000} />
                  {!!noticeVisible && (
                    <NoticeViewport
                      setNoticeVisible={setNoticeVisible}
                      message={
                        "You have already uploaded your momento for today. Hope to see you tomorrow! 😄"
                      }
                    />
                  )}
                </small>
              </div>
            )}
          </div>
        )}
      </div>
      {uploadModalOpen && (
        <div className="camera-container">
          <div
            style={{
              width: "100%",
              zIndex: "1",
              justifySelf: "center",
            }}
          >
            {img === null ? (
              <>
                <Webcam
                  audio={false}
                  mirrored={true}
                  ref={webcamRef}
                  width="100%"
                  height="100%"
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
                <div
                  style={{ position: "relative", bottom: "85px", zIndex: "2" }}
                >
                  <button className="textinput" onClick={capture}>
                    <img src={snap} width="32px" height="32px" />
                  </button>
                  <button
                    className="textinput"
                    onClick={() => setFrontCameraActive(!frontCameraActive)}
                  >
                    <img src={rotate} width="32px" height="32px" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={img}
                  style={{
                    position: "relative",
                    left: "0%",
                    top: "18%",
                  }}
                  alt="snapshot"
                />
              </>
            )}
            <button
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                zIndex: "2",
                fontSize: "24px",
                width: "48px",
                height: "48px",
              }}
              className="textinput"
              onClick={() => {
                setUploadModalOpen(false);
                allowScroll();
                setImg(null);
              }}
            >
              &#10005;
            </button>
            {!!img && (
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  height: "fit-content",
                  width: "100%",
                  justifyContent: "center",
                  zIndex: "2",
                  display: "flex",
                }}
              >
                <button className="textinput" onClick={() => setImg(null)}>
                  <img
                    src={back}
                    style={{ margin: "2px 0px 0px 0px" }}
                    width="32px"
                    height="32px"
                  />
                </button>
                <form
                  onSubmit={submitHandler}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <textarea
                    className="textinput"
                    style={{ resize: "none", opacity: "80%" }}
                    type="description"
                    value={description}
                    placeholder="Description of this momento."
                    maxlength="48"
                    cols="23"
                    rows="2"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <input
                    className="textinput"
                    type="image"
                    src={upload}
                    style={{ backgroundColor: "#ffffff" }}
                    height="36px"
                    width="36px"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
