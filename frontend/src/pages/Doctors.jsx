import React from "react";
import "./Doctors.css";
import { FaUserMd } from "react-icons/fa";

const doctorsData = [
  {
    id: 1,
    name: "Dr. James Smith",
    specialty: "Cardiologist",
    image: "/images/doctor1.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Anna Johnson",
    specialty: "Neurologist",
    image: "/images/doctor2.jpg",
    available: false,
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialty: "Dermatologist",
    image: "/images/doctor3.jpg",
    available: true,
  },
];

const Doctors = () => {
  return (
    <div className="doctors-container">
      <h2 className="doctors-title">Meet Our Specialists</h2>
      <div className="doctors-list">
        {doctorsData.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialty}</p>
            <p className={`availability ${doctor.available ? "available" : "not-available"}`}>
              {doctor.available ? "Available" : "Not Available"}
            </p>
            <FaUserMd className="doctor-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;


