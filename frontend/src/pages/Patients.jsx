import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Patients.css";
import { FaUserInjured } from "react-icons/fa";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to fetch patients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="patients-container">
      <h2 className="patients-title">Our Patients</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <div className="patients-list">
          {patients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <img
                src={patient.image || "http://localhost:5000/images/default-patient.jpg"}
                alt={patient.name}
                className="patient-image"
              />
              <h3 className="patient-name">{patient.name}</h3>
              <p className="patient-condition">{patient.condition}</p>
              <p className={`admission-status ${patient.admitted ? "admitted" : "not-admitted"}`}>
                {patient.admitted ? "Admitted" : "Discharged"}
              </p>
              <FaUserInjured className="patient-icon" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patients;


