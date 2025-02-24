import React from "react";
import "./Patients.css";
import { FaUserInjured } from "react-icons/fa";

const patientsData = [
  {
    id: 1,
    name: "Happy Melanin",
    condition: "Flu",
    image: "https://imgur.com/FRU0YvC.jpeg",
    admitted: true,
  },
  {
    id: 2,
    name: "Mike Blake",
    condition: "Fracture",
    image: "https://imgur.com/sWmtCz1.jpeg",
    admitted: false,
  },
  {
    id: 3,
    name: "Talia Bailey",
    condition: "Cold & Fever",
    image: "https://imgur.com/Xfklfos.jpeg",
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

