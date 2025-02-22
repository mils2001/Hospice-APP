import React from "react";
import "./Patients.css";
import { FaUser } from "react-icons/fa";

const patients = [
  { id: 1, name: "Alice Johnson", condition: "Flu", img: "/images/patient1.jpg" },
  { id: 2, name: "Bob Williams", condition: "Diabetes", img: "/images/patient2.jpg" },
];

const Patients = () => {
  return (
    <div className="patients-container">
      <h1>Our Patients</h1>
      <div className="patients-list">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <img src={patient.img} alt={patient.name} className="patient-img" />
            <h3>{patient.name}</h3>
            <p>Condition: {patient.condition}</p>
            <FaUser className="patient-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
