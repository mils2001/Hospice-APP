import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css"; // Make sure to create and style this file

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors") // Adjust backend URL if needed
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  return (
    <div className="doctors-container">
      <h2 className="doctors-title">Our Doctors</h2>
      <div className="doctors-list">
        {doctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image_url} alt={doctor.name} className="doctor-photo" />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <p>📞 {doctor.contact}</p>
            <p>📧 {doctor.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;








