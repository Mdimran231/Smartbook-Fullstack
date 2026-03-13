import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Services.css";
import image from "../assets/ui ux.jpg";
import clouds from "../assets/clouds.jpg";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    { id: 1, title: "Web Development", desc: "React and Spring Boot.", price: "$499", icon: "💻", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format" },
    { id: 2, title: "UI/UX Design", desc: "Modern and intuitive designs.", price: "$299", icon: "🎨", img: image },
    { id: 3, title: "Cloud Services", desc: "Scalable cloud infrastructure.", price: "$199", icon: "☁️", img: clouds },
    { id: 4, title: "Digital Marketing", desc: "Grow your brand.", price: "$350", icon: "📈", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format" }
  ];

  const handleBooking = (serviceName) => {
    // 💡 FIX: Click hone par fresh token check karein
    const token = localStorage.getItem("token");

    if (!token) {
      // Agar token nahi hai to seedha Login page
      alert("Please login first to book a service! 😊");
      navigate("/Login");
    } else {
      // Agar token hai tabhi Booking page par bhejein
      navigate("/booking", { state: { selectedService: serviceName } });
    }
  };

  return (
    <div className="services-page">
      <Navbar />
      
      <header className="services-header">
        <h1>Our Premium <span>Services</span></h1>
        <p>Choose the best plan that fits your business needs</p>
      </header>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="card-image">
              <img src={service.img} alt={service.title} />
              <div className="price-tag">{service.price}</div>
            </div>
            <div className="card-content">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <button 
                className="book-now-btn"
                onClick={() => handleBooking(service.title)}
              >
                Book Service
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}