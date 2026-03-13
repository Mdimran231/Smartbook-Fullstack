import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pages/UserDashboard.css";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [displayName, setDisplayName] = useState("User"); // Initial state
  const navigate = useNavigate();

  useEffect(() => {
    // --- STEP 1: NAME FIX LOGIC ---
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("email");
    const userJson = localStorage.getItem("user");

    if (savedName && savedName !== "undefined") {
      setDisplayName(savedName);
    } else if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setDisplayName(userData.username || userData.name || "User");
      } catch (e) {
        setDisplayName("User");
      }
    } else if (savedEmail) {
      // Email backup: amir@gmail.com -> Amir
      const namePart = savedEmail.split("@")[0];
      setDisplayName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
    }

    // --- STEP 2: FETCH BOOKINGS ---
    api.get("/api/bookings/my")
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  const getStatusClass = (status) => {
    const s = status?.toUpperCase();
    if (s === "APPROVED" || s === "CONFIRMED") return "status approved";
    if (s === "REJECTED" || s === "CANCELLED") return "status rejected";
    return "status pending";
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-container">
          
          <div className="dash-header fade-in">
            <div className="welcome-box">
              <span className="welcome-badge">User Panel</span>
              {/* DisplayName ab state se aayega correctly */}
              <h1>Hello, <span className="user-name-gradient">{displayName}</span>! 👋</h1>
              <p>Manage your professional services and track bookings.</p>
            </div>
            
            <button 
              onClick={() => navigate("/booking")} 
              className="create-booking-btn"
            >
              <span className="plus-icon">+</span> New Booking
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card reveal-card gradient-blue">
              <div className="stat-info">
                <h3>Total Bookings</h3>
                <p className="stat-number">{bookings.length}</p>
              </div>
              <div className="stat-icon">📊</div>
            </div>

            <div className="stat-card reveal-card gradient-green">
              <div className="stat-info">
                <h3>Approved</h3>
                <p className="stat-number">
                  {bookings.filter(b => b.status === "APPROVED" || b.status === "CONFIRMED").length}
                </p>
              </div>
              <div className="stat-icon">✅</div>
            </div>

            <div className="stat-card reveal-card gradient-purple">
              <div className="stat-info">
                <h3>Pending</h3>
                <p className="stat-number">
                  {bookings.filter(b => b.status === "PENDING" || !b.status).length}
                </p>
              </div>
              <div className="stat-icon">⏳</div>
            </div>
          </div>

          <div className="booking-section fade-in-delayed">
            <div className="section-header">
              <h2>Recent Activities</h2>
            </div>
            
            <div className="booking-list">
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📂</div>
                  <p>No bookings found yet. Start your journey today!</p>
                </div>
              ) : (
                bookings.map((b, index) => (
                  <div 
                    key={b.id || index} 
                    className="booking-row" 
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="service-info">
                      <div className="service-dot"></div>
                      <div>
                        <h3>{b.serviceName || "Premium Service"}</h3>
                        <p className="date-text">📅 {b.bookingDate || "Upcoming"}</p>
                      </div>
                    </div>
                    <div className="status-wrapper">
                      <span className={getStatusClass(b.status)}>
                        {b.status || "PENDING"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}