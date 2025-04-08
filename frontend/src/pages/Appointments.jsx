import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Appointments.css";
import { FaCalendarCheck, FaUserMd, FaUser } from "react-icons/fa";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="appointments-container">
      <h2 className="appointments-title">Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <FaCalendarCheck className="appointment-icon" />
                <h3>{appointment.date}</h3>
              </div>
              <p>
                <FaUser className="icon" /> <strong>Patient:</strong> {appointment.patient_name}
              </p>
              <p>
                <FaUserMd className="icon" /> <strong>Doctor:</strong> {appointment.doctor_name}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p className={`status ${appointment.status?.toLowerCase()}`}>
                {appointment.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;



