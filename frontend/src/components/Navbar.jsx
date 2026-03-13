import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="universal-nav">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span>🚀</span> MyService
        </Link>

        {/* Hamburger Icon */}
        <div className={`menu-icon ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/Services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link to="/Contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            {token && (
              <li>
                <Link 
                  to={role === "ADMIN" ? "/admin" : "/dashboard"} 
                  className="dashboard-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="nav-actions">
            {token ? (
              <div className="user-profile-nav">
                <span className="welcome-text">Hi, {userName || "User"}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <div className="auth-btns">
                <Link to="/Login" className="login-nav-btn">Login</Link>
                <Link to="/register" className="register-nav-btn">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}