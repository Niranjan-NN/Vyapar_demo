import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmailComponent.css";
import axios from "axios";

const EmailComponent = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/forgotPassword", {
        email,
      });

      localStorage.setItem("resetEmail", email);
      localStorage.setItem("resetToken", res.data.token);
      alert(res.data.message);
      console.log(res.data.token)
      navigate("/otpVerify");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        {/* Brand Section with Logo and Name */}
        <div className="brand text-center mb-4">
          <img
            src="https://play-lh.googleusercontent.com/0Oxj5yd5rYDqofo_zYwzlKFnZcaSN51LuO4mrIPLDnj6rSMkGgKklLDtzZRPCdq7wyLM"
            alt="Vyapar Logo"
            className="logo mb-2"
            style={{ width: "50px", height: "50px" }} // Adjust logo size
          />
          <h2
            className="brand-name"
            style={{ fontWeight: "bold", fontSize: "1.75rem" }}
          >
            Vyapar
          </h2>
        </div>

        <h3 className="text-center mb-4">Reset Your Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Enter your registered email
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailComponent;
