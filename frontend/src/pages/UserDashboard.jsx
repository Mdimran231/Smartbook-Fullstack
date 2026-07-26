import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pages/UserDashboard.css";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [displayName, setDisplayName] = useState("User");
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ==========================================
    // STEP 1: GET CURRENT USER FROM BACKEND
    // GET /api/profile/me
    // ==========================================

    api.get("/api/profile/me")
      .then((res) => {
        const userData = res.data;

        console.log("Current User Data:", userData);

        // User name
        setDisplayName(
          userData.name ||
          userData.username ||
          userData.fullName ||
          "User"
        );

        // Profile image URL from MongoDB
        if (userData.profileImageUrl) {
          setProfileImage(userData.profileImageUrl);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);

        // Fallback: localStorage se name
        const savedName = localStorage.getItem("userName");
        const savedEmail = localStorage.getItem("email");

        if (savedName && savedName !== "undefined") {
          setDisplayName(savedName);
        } else if (savedEmail) {
          const namePart = savedEmail.split("@")[0];

          setDisplayName(
            namePart.charAt(0).toUpperCase() +
            namePart.slice(1)
          );
        }
      });

    // ==========================================
    // STEP 2: FETCH USER BOOKINGS
    // GET /api/bookings/my
    // ==========================================

    api.get("/api/bookings/my")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });

  }, []);


  // ==========================================
  // STEP 3: OPEN FILE SELECTOR
  // ==========================================

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };


  // ==========================================
  // STEP 4: UPLOAD PROFILE IMAGE
  // POST /api/profile/image
  // ==========================================

  const handleProfileImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Optional: File type check
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Optional: 5MB file size limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const formData = new FormData();

    // IMPORTANT:
    // Backend expects @RequestParam("file")
    formData.append("file", file);

    try {
      setUploading(true);

      const response = await api.post(
        "/api/profile/image",
        formData
      );

      console.log("Upload Response:", response.data);

      // Backend se Cloudinary URL milega
      const imageUrl = response.data.imageUrl;

      if (imageUrl) {
        setProfileImage(imageUrl);
      }

      alert("Profile image uploaded successfully!");

    } catch (error) {
      console.error(
        "Profile image upload failed:",
        error.response?.data || error.message
      );

      alert("Profile image upload failed. Please try again.");

    } finally {
      setUploading(false);

      // Same image dobara select karne ke liye
      event.target.value = "";
    }
  };


  // ==========================================
  // BOOKING STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    const s = status?.toUpperCase();

    if (s === "APPROVED" || s === "CONFIRMED") {
      return "status approved";
    }

    if (s === "REJECTED" || s === "CANCELLED") {
      return "status rejected";
    }

    return "status pending";
  };


  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard-main">

        <div className="dashboard-container">

          {/* ==========================================
              DASHBOARD HEADER
          ========================================== */}

          <div className="dash-header fade-in">

            <div className="welcome-box">

              {/* ==========================================
                  PROFILE IMAGE
              ========================================== */}

              <div className="profile-image-container">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-placeholder">
                    👤
                  </div>
                )}

                {/* Upload Button */}

                <button
                  type="button"
                  className="profile-upload-btn"
                  onClick={handleProfileClick}
                  disabled={uploading}
                  title="Change profile photo"
                >
                  {uploading ? "⏳" : "📷"}
                </button>

                {/* Hidden File Input */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  style={{ display: "none" }}
                />

              </div>


              <span className="welcome-badge">
                User Panel
              </span>


              <h1>
                Hello{" "}
                <span className="user-name-gradient">
                  {displayName}
                </span>
                ! 👋
              </h1>


              <p>
                Manage your professional services and track bookings.
              </p>

            </div>


            <button
              onClick={() => navigate("/booking")}
              className="create-booking-btn"
            >
              <span className="plus-icon">+</span>
              New Booking
            </button>

          </div>


          {/* ==========================================
              STATS
          ========================================== */}

          <div className="stats-grid">

            <div className="stat-card reveal-card gradient-blue">

              <div className="stat-info">
                <h3>Total Bookings</h3>

                <p className="stat-number">
                  {bookings.length}
                </p>
              </div>

              <div className="stat-icon">
                📊
              </div>

            </div>


            <div className="stat-card reveal-card gradient-green">

              <div className="stat-info">

                <h3>Approved</h3>

                <p className="stat-number">
                  {
                    bookings.filter(
                      (b) =>
                        b.status === "APPROVED" ||
                        b.status === "CONFIRMED"
                    ).length
                  }
                </p>

              </div>

              <div className="stat-icon">
                ✅
              </div>

            </div>


            <div className="stat-card reveal-card gradient-purple">

              <div className="stat-info">

                <h3>Pending</h3>

                <p className="stat-number">
                  {
                    bookings.filter(
                      (b) =>
                        b.status === "PENDING" ||
                        !b.status
                    ).length
                  }
                </p>

              </div>

              <div className="stat-icon">
                ⏳
              </div>

            </div>

          </div>


          {/* ==========================================
              RECENT BOOKINGS
          ========================================== */}

          <div className="booking-section fade-in-delayed">

            <div className="section-header">
              <h2>Recent Activities</h2>
            </div>


            <div className="booking-list">

              {bookings.length === 0 ? (

                <div className="empty-state">

                  <div className="empty-icon">
                    📂
                  </div>

                  <p>
                    No bookings found yet.
                    Start your journey today!
                  </p>

                </div>

              ) : (

                bookings.map((b, index) => (

                  <div
                    key={b.id || index}
                    className="booking-row"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >

                    <div className="service-info">

                      <div className="service-dot"></div>

                      <div>

                        <h3>
                          {b.serviceName || "Premium Service"}
                        </h3>

                        <p className="date-text">
                          📅 {b.bookingDate || "Upcoming"}
                        </p>

                      </div>

                    </div>


                    <div className="status-wrapper">

                      <span
                        className={getStatusClass(b.status)}
                      >
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