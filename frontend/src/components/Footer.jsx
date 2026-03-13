import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Column 1: Brand Info */}
        <div className="footer-col">
          <h2 className="footer-logo">Smart<span>Book</span></h2>
          <p className="footer-desc">
            Making appointments easy and accessible for everyone. Book your favorite services in just a few clicks.
          </p>
          <div className="social-links">
            <span className="social-icon">f</span>
            <span className="social-icon">t</span>
            <span className="social-icon">in</span>
            <span className="social-icon">ig</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/services")}>Services</li>
            <li onClick={() => navigate("/contact")}>Contact Us</li>
            <li onClick={() => navigate("/login")}>Login</li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>Cloud Solutions</li>
            <li>IT Support</li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>📍 123 Tech Street, Digital City</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@smartbook.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 SmartBook System. Made with ❤️ by Imran</p>
      </div>
    </footer>
  );
}