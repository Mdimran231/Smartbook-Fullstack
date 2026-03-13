import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });

      // 1. Token Save
      const token = res.data.token;
      localStorage.setItem("token", token);

      // 2. User Name Logic (Sabse important)
      // Hum check kar rahe hain: res.data.name ya res.data.user.name ya res.data.username
      const nameToSave = res.data.name || 
                         res.data.user?.name || 
                         res.data.username || 
                         res.data.user?.username || 
                         email.split('@')[0];

      localStorage.setItem("userName", nameToSave);
      localStorage.setItem("email", email);

      // 3. Role Decode & Navigation
      const decoded = jwtDecode(token);
      const role = decoded.role;
      localStorage.setItem("role", role);

      // Redirect logic
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response) {
        alert(`Login Failed: ${error.response.data.message || "Invalid credentials"}`);
      } else {
        alert("Backend Server Not Running! ❌");
      }
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container-wrapper">
        <div className="login-card">
          <div className="card-left">
            <h2>Don't waste your time</h2>
            <p>Login quickly and manage your bookings in seconds with our smart system 🚀</p>
            <button className="google-btn">Login with Google</button>
            <div className="terms">Terms of Service • Privacy Policy</div>
          </div>

          <div className="card-right">
            <form onSubmit={submit}>
              <h2>Login</h2>
              <p className="subtitle">Before you get started, you must login.</p>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login-btn">Login</button>
              <p className="register-text">
                Don't have an account?
                <span onClick={() => navigate("/register")} style={{cursor:'pointer'}}> Create one</span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}