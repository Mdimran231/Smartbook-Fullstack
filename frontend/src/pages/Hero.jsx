import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Navbar import kiya
import Footer from "../components/Footer"; // Footer 
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero-page">
      <Navbar /> {/* Navbar yahan call ho raha hai */}
      
      <main className="hero-main">
        <div className="hero-text-section">
          <div className="hero-badge">New: AI Powered Scheduling ✨</div>
          <h1 className="hero-title">
            Book Anything in <br />
            <span>Seconds, Not Minutes</span>
          </h1>
          <p className="hero-description">
            Join 10,000+ users who are saving time with SmartBook. The most secure and intuitive platform to manage your appointments and services.
          </p>
          <div className="hero-actions">
            <button onClick={() => navigate("/register")} className="btn-main">
              Start Free Trial
            </button>
            <button onClick={() => navigate("/services")} className="btn-outline">
              View Services
            </button>
          </div>
          <div className="hero-stats">
            <div><strong>4.9/5</strong> Star Rating</div>
            <div className="divider"></div>
            <div><strong>24/7</strong> Support</div>
          </div>
        </div>

        <div className="hero-image-section">
          <div className="image-wrapper">
             {/* Replace this with your actual image URL */}
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard Preview" />
            <div className="floating-card">
               ✅ Booking Confirmed!
            </div>
          </div>
        </div>
      </main>

      {/* --- 1. Stats Section --- */}
      <section className="stats-section reveal">
        <div className="stat-card">
          <div className="stat-num">15k+</div>
          <p>Happy Clients</p>
        </div>
        <div className="stat-card">
          <div className="stat-num">99%</div>
          <p>Success Rate</p>
        </div>
        <div className="stat-card">
          <div className="stat-num">24/7</div>
          <p>Expert Support</p>
        </div>
      </section>

      {/* --- 2. Features Section --- */}
      <section className="features-section">
        <div className="section-title reveal">
          <h2>Why Choose <span>SmartBook?</span></h2>
          <p>We provide the best tools to manage your appointments efficiently.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card reveal">
            <div className="f-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Book any service in under 60 seconds without any hassle or long waits.</p>
          </div>
          <div className="feature-card reveal">
            <div className="f-icon">🛡️</div>
            <h3>Secure Payments</h3>
            <p>Your transactions are protected with industry-leading 256-bit encryption.</p>
          </div>
          <div className="feature-card reveal">
            <div className="f-icon">📱</div>
            <h3>Mobile Ready</h3>
            <p>Access your dashboard from any device, anywhere in the world seamlessly.</p>
          </div>
        </div>
      </section>

      {/* --- 3. CTA Banner --- */}
      <section className="cta-container reveal">
        <div className="cta-glass-box">
           <h2>Ready to transform your business?</h2>
           <p>Join thousands of professionals who trust SmartBook for their daily growth.</p>
   <button 
       className="cta-btn-final" 
       onClick={() => navigate("/register")}
      >  
            Get Started for Free
    </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}