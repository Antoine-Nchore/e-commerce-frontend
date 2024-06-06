import React, { useState, useContext } from "react";
import "../styles/Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { AuthContext } from "../components/AuthContext";
import { api } from "../utils/Main";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await api.post("/login", { email, password });

      toast.success(res.data.message);
      const session = res.data;
      localStorage.setItem("session", JSON.stringify(session));
      setIsAuthenticated(true);

      const userRes = await api.get(`/users/${session.user.id}`);
      setUser(userRes.data.user);

      navigate("/");
    } catch (error) {
      const data = error.response?.data;
      toast.error(data?.message || "Unable to login");
      console.log("Unable to login", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome back!</h2>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>
          <div className="actions">
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
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
        <p className="signup-prompt">
          Don't have an account? <a href="/registration">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
