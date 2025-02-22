import React from "react";
import "./Doctors.css";
import { FaUserMd } from "react-icons/fa";

const doctors = [
  { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", img: "/images/doctor1.jpg" },
  { id: 2, name: "Dr. Jane Doe", specialty: "Neurologist", img: "/images/doctor2.jpg" },
  { id: 3, name: "Dr. Emily Brown", specialty: "Pediatrician", img: "/images/doctor3.jpg" },
];

const Doctors = () => {
  return (
    <div className="doctors-container">
      <h1>Meet Our Doctors</h1>
      <div className="doctors-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.img} alt={doctor.name} className="doctor-img" />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <FaUserMd className="doctor-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;

