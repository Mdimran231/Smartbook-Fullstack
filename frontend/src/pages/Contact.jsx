import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <Navbar />
      
      <div className="contact-container-wrapper">
        <div className="contact-header">
          <h1>Get In <span>Touch</span></h1>
          <p>Any questions or remarks? Just write us a message!</p>
        </div>

        <div className="contact-card">
          {/* Left Side: Info */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Say something to start a live chat!</p>
            
            <div className="info-items">
              <div className="info-item">
                <span className="icon">📞</span>
                <p>+91 98765 43210</p>
              </div>
              <div className="info-item">
                <span className="icon">✉️</span>
                <p>support@smartbook.com</p>
              </div>
              <div className="info-item">
                <span className="icon">📍</span>
                <p>123 Tech Street, Digital City, India</p>
              </div>
            </div>

            <div className="social-circles">
              <div className="circle">f</div>
              <div className="circle">t</div>
              <div className="circle">ig</div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="input-row">
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Imran" />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Khan" />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="imran@example.com" />
              </div>

              <div className="input-group">
                <label>Message</label>
                <textarea placeholder="Write your message here..." rows="4"></textarea>
              </div>

              <button type="submit" className="send-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}