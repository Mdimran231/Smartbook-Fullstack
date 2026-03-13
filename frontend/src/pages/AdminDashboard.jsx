import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Admin.css";

export default function AdminDashboard() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminName = localStorage.getItem("userName") || "Admin";

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {

      const res = await api.get("/api/bookings");
      setBookings(res.data);

    } catch (err) {

      console.log("FETCH ERROR:", err);

    } finally {

      setLoading(false);

    }
  };

  const updateStatus = async (id, status) => {

    try {

      await api.put(`/api/bookings/${id}?status=${status}`);

      setBookings(prev =>
        prev.map(b =>
          b.id === id ? { ...b, status } : b
        )
      );

    } catch (err) {

      console.log("UPDATE ERROR:", err);
      alert("Failed to update status.");

    }

  };

  // ✅ DELETE BOOKING FUNCTION
  const deleteBooking = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/api/bookings/${id}`);

      // UI update (remove booking)
      setBookings(prev => prev.filter(b => b.id !== id));

    } catch (err) {

      console.log("DELETE ERROR:", err);
      alert("Failed to delete booking.");

    }

  };

  return (

    <div className="admin-page-wrapper">

      <Navbar />

      <div className="admin-container">

        <main className="admin-content">

          <header className="admin-header">

            <div className="header-text">
              <h1>Booking Management</h1>
              <p>Review and manage all incoming service requests</p>
            </div>

            <div className="user-profile">
              <span className="admin-badge">Administrator</span>
              <strong>{adminName} 👋</strong>
            </div>

          </header>

          {loading ? (

            <div className="loader">
              <div className="spinner"></div>
              <p>Loading System Bookings...</p>
            </div>

          ) : bookings.length === 0 ? (

            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <p>No bookings found in the system.</p>
            </div>

          ) : (

            <div className="table-container fade-in">

              <table className="modern-table">

                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User Name</th>
                    <th>Service Name</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>

                  {bookings.map((b) => (

                    <tr key={b.id} className="table-row">

                      <td className="id-cell">
                        #{b.id.substring(0, 8)}
                      </td>

                      <td className="user-cell">
                        👤 {b.userName || "Unknown"}
                      </td>

                      <td className="service-cell">
                        <div className="service-icon-small">🛠️</div>
                        {b.serviceName}
                      </td>

                      <td>
                        {b.bookingDate}
                      </td>

                      <td>
                        <span className={`status-badge ${b.status.toLowerCase()}`}>
                          {b.status}
                        </span>
                      </td>

                      <td>

                        {b.status === "PENDING" ? (

                          <div className="action-buttons">

                            <button
                              className="btn-approve"
                              onClick={() => updateStatus(b.id, "APPROVED")}
                            >
                              Approve
                            </button>

                            <button
                              className="btn-reject"
                              onClick={() => updateStatus(b.id, "REJECTED")}
                            >
                              Reject
                            </button>

                          </div>

                        ) : (

                          <span className="action-completed">

                            {b.status === "APPROVED"
                              ? "✅ Confirmed"
                              : "❌ Declined"}

                          </span>

                        )}

                      </td>

                      {/* ✅ DELETE BUTTON */}
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => deleteBooking(b.id)}
                        >
                          Delete
                        </button>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </main>

      </div>

      <Footer />

    </div>

  );

}