import React, { useState, useEffect } from "react";
import "../Styles/Filter.css";
import Modal from "react-modal";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import GoogleLogin from "react-google-login";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "350px",
    transform: "translate(-50%, -50%)",
    border: "solid 1px #A9A9A9",
    borderRadius: "15px 65px",
    backgroundColor: "#F9F9F9",
    boxShadow: "10px 10px 5px #EFECEC",
  },
};

const Header = () => {
  let subtitle;
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    const path = window.location.pathname;
    setAttributes(path);
  }, []);

  const setAttributes = (path) => {
    const isHome = path === "/";
    setBackgroundColor(isHome ? "#000000" : "#ff0000");
    setDisplay(isHome ? "none" : "inline-block");
  };

  const handleNavigate = () => {
    navigate("/");
    window.location.reload();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="nav" style={{ background: backgroundColor }}>
      <div
        className="logos"
        style={{ display: display }}
        onClick={handleNavigate}
      >
        K
      </div>
      <div className="login ms-auto">
        <div>
          <button className="login-button" onClick={openModal}>
            Log in
          </button>
        </div>
        <div className="login-search">
          <input type="text" placeholder="Create an account" />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => {
          subtitle.style.color = "#f00";
        }}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <h2 className="lgfont" ref={(_subtitle) => (subtitle = _subtitle)}>
          Login
        </h2>
        <br />
        <form>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter your Email"
          />
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="Enter your Password"
          />
          <div className="login-container">
            <div>
              <button className="login-button-form">Login</button>
            </div>
            <div>
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </form>
        <div>
          <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const result = jwtDecode(credentialResponse.credential);
                console.log("result", result);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
