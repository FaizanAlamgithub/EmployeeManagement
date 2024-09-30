import React, { useEffect, useState } from "react";
import { handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";
import Logo from "../assets/images/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    handleSuccess("User Logged out");

    setLoggedInUser("");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="menu-container">
      <nav className="navbar navbar-expand-md sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="menu navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/list">
                  Employee List
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {loggedInUser ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link">{loggedInUser}</a>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link username" onClick={handleLogout}>
                      Logout
                    </p>
                    <ToastContainer />
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
