"use es6";

import React from "react";

const UploadViewport = ({
  setUploadVisible,
  setCameraModalOpen,
  handleFileInput,
  selectedFile,
  setImg,
  description,
  setDescription,
  uploadMomento,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        height: "fit-content",
        margin: "auto",
      }}
    >
      <div className="modal-container">
        <div
          style={{
            backgroundColor: "#ffffff",
            width: "300px",
            borderRadius: "10px",
            height: "fit-content",
            padding: "15px",
            margin: "auto",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "large",
                textAlign: "left",
                margin: "5px 0px",
                height: "0px",
              }}
              onClick={() => {
                setUploadVisible(false);
              }}
            >
              &#10005;
            </div>
            <h1 style={{ height: "15px" }}>Upload Momento</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                borderRadius: "10px",
                padding: "10px",
                height: "40px",
              }}
            >
              <label
                id="browse-files-label"
                for="browse-files"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    top: "2px",
                    margin: "auto",
                    fontSize: "14px",
                    height: "fit-content",
                  }}
                >
                  Browse Files
                  <p style={{ lineHeight: "0%", fontSize: "28px" }}>🖼</p>
                </div>
              </label>
              <input id="browse-files" type="file" onChange={handleFileInput} />
              <button
                id="browse-files-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  setCameraModalOpen(true);
                }}
              >
                <div
                  style={{
                    position: "relative",
                    top: "2px",
                    margin: "auto",
                    fontSize: "14px",
                    height: "fit-content",
                  }}
                >
                  Open Camera
                  <p style={{ lineHeight: "0%", fontSize: "28px" }}>📸</p>
                </div>
              </button>
            </div>
            <br />
            <br />
            <br />
            <div
              style={{
                justifyContent: "space-around",
                borderRadius: "10px",
                border: "#000000 solid 2px",
                padding: "20px",
              }}
            >
              {!!selectedFile ? (
                <div>
                  <img
                    id="blah"
                    src={URL.createObjectURL(selectedFile) || "#"}
                    style={{ maxHeight: "300px", maxWidth: "100%" }}
                  />
                  <textarea
                    className="textinput"
                    style={{
                      resize: "none",
                      opacity: "80%",
                      width: "90%",
                      margin: "10px auto",
                    }}
                    type="description"
                    value={description}
                    placeholder="Description of this momento."
                    maxlength="48"
                    cols="23"
                    rows="2"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <button
                    className="textinput"
                    style={{ margin: "auto", padding: "5px", width: "100%" }}
                    onClick={() => {
                      setImg(selectedFile);
                      uploadMomento(true);
                    }}
                  >
                    Upload
                  </button>
                </div>
              ) : (
                <p>Your image preview will appear here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadViewport;
