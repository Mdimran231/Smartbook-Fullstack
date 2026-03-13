import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");

  // 1. Agar token nahi hai, toh Login page par bhejo
  // 💡 FIX: App.jsx mein "/Login" hai, isliye yahan bhi "/Login" hona chahiye
  if (!token) {
    return <Navigate to="/Login" />;
  }

  try {
    // 2. Token se payload nikalna
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload.role;

    // 3. Role check karna
    if (allowedRole && userRole !== allowedRole) {
      // Agar role match nahi karta (e.g. Admin user page par jana chahe)
      return <Navigate to={userRole === "ADMIN" ? "/admin" : "/dashboard"} />;
    }
  } catch (error) {
    // Agar token corrupt ho ya galat ho
    localStorage.clear();
    return <Navigate to="/Login" />;
  }

  return children;
}