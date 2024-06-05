import React, { useState } from "react";
import "../styles/Login.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="actions">
            <button type="submit" className="login-btn">
              Log in
            </button>
            <button type="button" className="forgot-password">
              Forgot password?
            </button>
          </div>
        </form>
        <div className="divider">
          <span>or</span>
        </div>
        <div className="social-login">
          <button className="social-btn google">
            <i className="fab fa-google"></i>
            Sign in with Google
          </button>
          <button className="social-btn facebook">
            <i className="fab fa-facebook-f"></i>
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
