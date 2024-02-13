import React, { useState, useEffect } from "react";
import "../Styles/Filter.css";

import Modal from "react-modal";
// import GoogleLogin from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [backgroundColor, setBackgroundColor] = useState("");
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    const path = window.location.pathname;
    setAttributes(path);
  }, []);

  const setAttributes = (path) => {
    let bg, displayValue;
    if (path === "/") {
      bg = "transparent";
      displayValue = "none";
    } else {
      bg = "#ff0000";
      displayValue = "inline-block";
    }
    setBackgroundColor(bg);
    setDisplay(displayValue);
  };

  const handleNavigate = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="nav" style={{ background: backgroundColor }}>
      <div
        className="logos"
        style={{ display: display }}
        onClick={() => handleNavigate()}
      >
        K:)
      </div>
      <div className="login">
        <button
          className="btn btn-light loginbtn"
          style={{ transition: "all 1s" }}
          onClick={openModal}
        >
          Login
        </button>{" "}
        <span>
          <input type="text" placeholder="Create an account" />
        </span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="lgfont" ref={(_subtitle) => (subtitle = _subtitle)}>
          Login
        </h2>{" "}
        <br />
        <form>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter your Eamil"
          />
          <br />
          <input
            type="password"
            class="form-control"
            placeholder="Enter your Password"
          />
          <br />
          <button className="btn btn-outline-primary">Login</button>
          <br />
          <br />
          <button className="btn btn-outline-danger" onClick={closeModal}>
            Cancel
          </button>
          <br />
          <br />
        </form>
        <div>
          <GoogleOAuthProvider clientId="17140268731-tsfsqm509q1fj2anf087h81uhrkiagsc.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
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
