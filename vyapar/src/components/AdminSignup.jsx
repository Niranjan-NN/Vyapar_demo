import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Signup.css";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setAdminSecretKey] = useState("");

  const handleAdminSubmit = async (e) => {
  e.preventDefault();

  if (!adminName || !email || !password || !secretKey) {
    alert("Please fill in all fields.");
    return;
  }

  const adminData = {
    name: adminName,
    email: email,
    password: password,
    secretKey: secretKey,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/api/adminRegister",
      adminData,
      { withCredentials: true }
    );

    alert(response.data.message || "Admin registered successfully!");
    navigate("/adminloginpage");
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong during admin registration.";
    alert(msg);
    console.error("Admin Registration Error:", error);
  }
};

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="brand">
          <img
            src="https://play-lh.googleusercontent.com/0Oxj5yd5rYDqofo_zYwzlKFnZcaSN51LuO4mrIPLDnj6rSMkGgKklLDtzZRPCdq7wyLM"
            alt="Vyapar Logo"
            className="logo"
          />
          <h1 className="brand-name">Vyapar Admin</h1>
        </div>

        <h2 className="title">Admin Registration</h2>
        <p className="subtitle">Enter Admin details to register</p>

        <form className="signup-form" onSubmit={handleAdminSubmit}>
          <input
            type="text"
            placeholder="Admin Name"
            className="form-control mb-3"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Admin Secret Key"
            className="form-control mb-3"
            value={secretKey}
            onChange={(e) => setAdminSecretKey(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100">
            Register as Admin
          </button>
        </form>

        <p className="login-link">
          Already have an admin account?{" "}
          <span onClick={() => navigate("/adminloginpage")}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
