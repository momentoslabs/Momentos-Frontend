"use es6";

import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import AWS from "aws-sdk";
import { Buffer } from "buffer";

import { useScrollBlock } from "../../utils/CustomHooks";

import Timer from "../Timer/Timer";
import NoticeViewport from "../Viewports/NoticeViewport";

import snap from "../../graphics/icons/snap.png";
import back from "../../graphics/icons/back.png";
import rotate from "../../graphics/icons/rotate.png";
import upload from "../../graphics/icons/upload.png";
import UploadViewport from "../Viewports/UploadViewport";

const S3_BUCKET = "momentos-images";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const ProfileUpload = ({ profile = {}, isOwner = false }) => {
  const uploadActive = Date.now() - profile.lastactive >= 86400000;
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [frontCameraActive, setFrontCameraActive] = useState(true);
  const webcamRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const [blockScroll, allowScroll] = useScrollBlock();

  const navigate = useNavigate();

  const videoConstraints = {
    facingMode: frontCameraActive ? "user" : { exact: "environment" },
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  const uploadMomento = async (isFile = false) => {
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };
    const id = Date.now();
    const imgData = isFile
      ? 0
      : new Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), "base64");
    isFile ? uploadFile(selectedFile, id) : uploadFile(imgData, id);
    const requestBody1 = {
      id: id,
      ownerid: profile.id,
      description: description,
      image: `https://momentos-images.s3.amazonaws.com/${id}.jpeg`,
      likes: 0,
      fires: 0,
      claps: 0,
      laughs: 0,
    };
    const requestBody2 = {
      items: id,
      lastactive: 0,
      lastpost: id,
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
        navigate(`/profile/${profile.username}`);
        setUploadVisible(false);
        setCameraModalOpen(false);
        allowScroll();
        setImg(null);
        window.location.reload();
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    uploadMomento();
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file, id) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: `${id}.jpeg`,
      ContentEncoding: "base64",
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div
      style={{
        margin: "30px auto",
      }}
    >
      <div>Native SDK File Upload Progress is {progress}%</div>

      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      {isOwner && (
        <div>
          <div>
            {typeof profile.lastactive === "number" && (
              <div>
                {!!uploadActive ? (
                  <button
                    onClick={() => {
                      setUploadVisible(true);
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
                    <small
                      style={{ display: "flex", justifyContent: "center" }}
                    >
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
          <div>
            {uploadVisible && (
              <div>
                <UploadViewport
                  setUploadVisible={setUploadVisible}
                  setCameraModalOpen={setCameraModalOpen}
                  handleFileInput={handleFileInput}
                  selectedFile={selectedFile}
                  setImg={setImg}
                  description={description}
                  setDescription={setDescription}
                  uploadMomento={uploadMomento}
                />
              </div>
            )}
          </div>
          {cameraModalOpen && (
            <div className="camera-container">
              <div
                style={{
                  width: "100%",
                  zIndex: "1",
                  justifySelf: "center",
                  justifyContent: "center",
                }}
              >
                {img === null ? (
                  <div
                    style={{
                      position: "fixed",
                      top: "0",
                      right: "0",
                      bottom: "0",
                      left: "0",
                    }}
                  >
                    <Webcam
                      style={{
                        top: "0",
                        right: "0",
                        bottom: "0",
                        left: "0",
                        display: "flex",
                        height: "100%",
                        margin: "auto",
                      }}
                      audio={false}
                      mirrored={frontCameraActive ? true : false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                    <div
                      style={{
                        position: "relative",
                        bottom: "85px",
                        zIndex: "2",
                      }}
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
                  </div>
                ) : (
                  <div
                    style={{
                      position: "fixed",
                      top: "0",
                      right: "0",
                      bottom: "0",
                      left: "0",
                    }}
                  >
                    <img
                      src={img}
                      style={{
                        top: "0",
                        right: "0",
                        bottom: "0",
                        left: "0",
                        display: "flex",
                      }}
                      alt="snapshot"
                    />
                  </div>
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
                    setCameraModalOpen(false);
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
      )}
    </div>
  );
};

export default ProfileUpload;
