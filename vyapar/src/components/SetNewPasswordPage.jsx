import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SetNewPasswordPage.css"; // Custom styles

const SetNewPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('finalToken')
    if (!token) {
      alert("No reset session found. Please restart the reset process.");
      navigate("/forgotPassword");
    }
  }, [navigate]);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('finalToken');
    if (!token) {
      alert("No reset session found. Please restart the reset process.");
      navigate("/forgotPassword");
      return;
    }
  
    // Set the token manually in cookie (same name your backend expects)
    document.cookie = `jwt_new=${token}; path=/;`;
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/resetPassword",
        { password },
        { withCredentials: true }
      );
  
      alert(response.data.message || "Password updated!");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("finalToken");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reset password.");
      console.error("Set password error:", error);
    }
  };
  

  return (
    <div className="set-password-container">
      <div className="set-password-box">
        <div className="brand">
          <img
            src="https://play-lh.googleusercontent.com/0Oxj5yd5rYDqofo_zYwzlKFnZcaSN51LuO4mrIPLDnj6rSMkGgKklLDtzZRPCdq7wyLM"
            alt="Vyapar Logo"
            className="logo"
          />
          <h2 className="brand-name">Vyapar</h2>
        </div>
        <h2 className="set-password-title">Set New Password</h2>
        <form className="set-password-form" onSubmit={handleSetPassword}>
          <input
            type="password"
            placeholder="New Password"
            className="set-password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="set-password-button">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPasswordPage;
