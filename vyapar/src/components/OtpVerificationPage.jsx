import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/OtpVerificationPage.css"; // Custom styles

const OtpVerificationPage = ({ email }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("tempToken");
    if (!token) {
      alert("Temporary token not found.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/verifyUser",
        { otp: Number(otp), token },  // ✅ Pass token in body
        { withCredentials: true }
      );

      localStorage.setItem("authToken", response.data.token);
      localStorage.removeItem("tempToken"); // cleanup
      navigate("/details");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to verify OTP.");
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/resendOtp", { email });

      if (response.status === 200) {
        alert("A new OTP has been sent!");
      }
    } catch (err) {
      alert("Failed to resend OTP: " + err.response?.data?.message);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <div className="brand">
          <img
            src="https://play-lh.googleusercontent.com/0Oxj5yd5rYDqofo_zYwzlKFnZcaSN51LuO4mrIPLDnj6rSMkGgKklLDtzZRPCdq7wyLM"
            alt="Vyapar Logo"
            className="logo"
          />
          <h2 className="brand-name">Vyapar</h2>
        </div>
        <div className="otp-header">
          <p className="otp-message">You will receive an email with a verification code within 5 minutes</p>
          <p className="otp-phone">{email}</p>
        </div>
        <div className="otp-input-section">
          <p className="otp-instruction">Enter the OTP you received in your email</p>
          <form className="otp-form" onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              className="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="verify-button">
              Submit
            </button>
          </form>
          <button type="button" className="resend-button" onClick={handleResendOtp}>
            Click here to resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
