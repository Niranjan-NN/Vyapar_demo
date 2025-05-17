import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // Custom styles
import axios from "axios"

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          email,
          password,
        });
    
        const token = response.data.token;
        localStorage.setItem("token", token);  // ✅ Save it here
    
        console.log("Login successful, token saved!");
        console.log(token)
        navigate("/home"); // or wherever you want
      } catch (error) {
        console.error("Login failed:", error.response.data.message);
      }
    };  
  

  const handleForgotPassword = async() => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    localStorage.setItem("resetEmail", email);
    navigate("/email");
  };

  return (
    <div className="login-container">
      <div className="login-box">
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

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              className="input-field mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="input-field mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signin-button" type="submit">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="social-button google">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStGPI7wuecWNAG_b4NphVf6Og3KHIreUMTvQ&s"
              alt="Google Logo"
              className="social-icon"
            />
            Login with Google
          </button>

          <button className="social-button apple">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple Logo"
              className="social-icon"
            />
            Login with Apple
          </button>

          <p className="forgot-password">
            <button className="btn btn-link" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
