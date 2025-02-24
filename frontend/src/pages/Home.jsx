import React from "react";
import "./Home.css";
import { FaStethoscope, FaUserMd, FaCalendarCheck } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Our Hospice Medical</h1>
          <p>Your health, our priority.</p>
          <button className="cta-button">Book an Appointment</button>
        </div>
        <img src="https://imgur.com/2UkCmzV.jpeg" alt="Hospice" className="hero-image" />
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-item">
          <FaStethoscope className="feature-icon" />
          <h3>Advanced Equipment</h3>
        </div>
        <div className="feature-item">
          <FaUserMd className="feature-icon" />
          <h3>Expert Doctors</h3>
        </div>
        <div className="feature-item">
          <FaCalendarCheck className="feature-icon" />
          <h3>Easy Appointments</h3>
        </div>
      </section>
    </div>
  );
};

export default Home;

