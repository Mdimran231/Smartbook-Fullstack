import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingPage.css";

export default function BookingPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [serviceName, setServiceName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // user email / name from localStorage
  const userName = localStorage.getItem("email");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {

      setIsAuthorized(true);

      // auto service fill
      if (location.state && location.state.selectedService) {
        setServiceName(location.state.selectedService);
      }

    }

  }, [navigate, location.state]);

  const submit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      await api.post("/api/bookings", {
        serviceName,
        bookingDate,
        userName
      });

      alert("Booking Created Successfully 🎉");

      navigate("/dashboard");

    } catch (err) {

      console.error(err);
      alert("Booking failed ❌");

    } finally {

      setLoading(false);

    }

  };

  if (!isAuthorized) {
    return null;
  }

  return (

    <div className="booking-page-layout">

      <Navbar />

      <main className="booking-wrapper">

        <div className="booking-container">

          {/* LEFT INFO PANEL */}

          <div className="info-panel">
            <div className="info-content">

              <h1>
                Book Your <br />
                <span>Next Adventure</span>
              </h1>

              <p>Schedule your service in just a few clicks.</p>

              <div className="badge">
                ✨ Top Rated Service
              </div>

            </div>
          </div>

          {/* RIGHT FORM PANEL */}

          <div className="form-panel">

            <form onSubmit={submit} className="booking-form">

              <h2 className="form-title">
                Reserve Now 📅
              </h2>

              <div className="input-field">

                <label>What service do you need?</label>

                <input
                  type="text"
                  placeholder="e.g. Web Development"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />

              </div>

              <div className="input-field">

                <label>Select Date</label>

                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />

              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="back-link"
              >
                Go Back
              </button>

            </form>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}