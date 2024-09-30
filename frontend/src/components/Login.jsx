import React, { useState } from "react";
import "./Signup&Login.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setLoginInfo(copyloginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:4000/auth/api/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 mt-0">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <div className="card auth-container">
            <div className="card-body">
              <h4 className="text-center mb-4">Login</h4>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={loginInfo.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn w-50">
                    Login
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <span>
                    Create an accoutn ? <a href="/signup">Signup</a>
                  </span>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
