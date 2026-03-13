import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import "./App.css";

// Note: Navbar aur Footer har page ke andar import hain, 
// isliye yahan Route mein unki zaroorat nahi hai.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />

        {/* Protected USER Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking" // 💡 Sirf ek hi small letter wala route rakhein
          element={
            <ProtectedRoute allowedRole="USER">
              <BookingPage />
            </ProtectedRoute>
          }
        />

        {/* Protected ADMIN Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 ya Fallback (Optional) */}
        <Route path="*" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;