import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Register.css"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", { name, email, password });
      
      // Data Save Logic
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);
      
      // Agar backend response mein name nahi bhej raha, toh jo user ne type kiya (name state) wahi save kar lo
      const displayName = res.data.name || res.data.username || name;
      localStorage.setItem("userName", displayName);
      
      localStorage.setItem("role", res.data.role || "USER");

      alert("Registration Successful! 🎉");
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed! Check if email already exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-content-wrapper">
        <div className="animated-shape"></div>
        <div className="register-card">
          <form onSubmit={submit} className="register-form">
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">Join us today!</p>

            <div className="input-group">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                required 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Processing..." : "Register Now"}
            </button>

            <p className="footer-text-login">
              Already have an account? <span onClick={() => navigate("/Login")} style={{cursor:'pointer'}}>Login</span>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}