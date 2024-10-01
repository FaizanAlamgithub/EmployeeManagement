import React, { useState } from "react";
import "./Signup&Login.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url =
        "https://employeemanagement-backend-z5go.onrender.com/auth/api/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
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
              <h4 className="text-center mb-4">Signup</h4>
              <form onSubmit={handleSignup}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={signupInfo.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoFocus
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={signupInfo.email}
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
                    value={signupInfo.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn w-50">
                    Signup
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <span>
                    Already have an accoutn ? <a href="/login">Login</a>
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

export default Signup;
