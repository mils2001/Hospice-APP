import React from "react";
import "./Patients.css";
import { FaUserInjured } from "react-icons/fa";

const patientsData = [
  {
    id: 1,
    name: "John Doe",
    condition: "Flu",
    image: "https://i.imgur.com/your-image.jpg",
    admitted: true,
  },
  {
    id: 2,
    name: "Sarah Connor",
    condition: "Fracture",
    image: "https://i.imgur.com/your-image.jpg",
    admitted: false,
  },
  {
    id: 3,
    name: "Michael Scott",
    condition: "Cold & Fever",
    image: "https://i.imgur.com/your-image.jpg",
    admitted: true,
  },
];

const Patients = () => {
  return (
    <div className="patients-container">
      <h2 className="patients-title">Our Patients</h2>
      <div className="patients-list">
        {patientsData.map((patient) => (
          <div key={patient.id} className="patient-card">
            <img src={patient.image} alt={patient.name} className="patient-image" />
            <h3 className="patient-name">{patient.name}</h3>
            <p className="patient-condition">{patient.condition}</p>
            <p className={`admission-status ${patient.admitted ? "admitted" : "not-admitted"}`}>
              {patient.admitted ? "Admitted" : "Discharged"}
            </p>
            <FaUserInjured className="patient-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;

