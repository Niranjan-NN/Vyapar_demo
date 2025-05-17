import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Signup.css"; // Custom styles
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/user", {
        name,
        email,
        password,
      },{withCredentials:true});
      if (response.status === 200) {
        // ✅ Save the temp JWT from backend into localStorage
        localStorage.setItem("tempToken", response.data.token);  // ADD THIS
  
        alert("OTP sent to your email");
        navigate("/OtpVerificationPage"); // navigate to OTP verification page
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="left-section">
          <h1 className="title">Simplify management with our dashboard.</h1>
          <p className="subtitle">
            Simplify your e-commerce management with our user-friendly admin dashboard.
          </p>
          <img
            src="https://i.pinimg.com/736x/c0/22/f7/c022f70d3ede6216f171aeac5efb1e1b.jpg"
            alt="Illustration"
            className="illustration"
          />
        </div>
        <div className="right-section">
          <div className="brand">
            <img
              src="https://play-lh.googleusercontent.com/0Oxj5yd5rYDqofo_zYwzlKFnZcaSN51LuO4mrIPLDnj6rSMkGgKklLDtzZRPCdq7wyLM"
              alt="Vyapar Logo"
              className="logo"
            />
            <h2 className="brand-name">Vyapar</h2>
          </div>
          <h2 className="welcome-title">Welcome Back</h2>
          <p className="welcome-subtitle">Please login to your account</p>

          <form className="signup-form" onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Name"
              className="form-control mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="btn google-button w-100 mb-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStGPI7wuecWNAG_b4NphVf6Og3KHIreUMTvQ&s"
              alt="Google Logo"
              className="social-icon"
            />
            Sign up with Google
          </button>

          <button className="btn apple-button w-100">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple Logo"
              className="social-icon"
            />
            Sign up with Apple
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
