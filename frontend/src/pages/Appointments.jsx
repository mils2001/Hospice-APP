import React from "react";
import "./Appointments.css";
import { FaCalendarCheck } from "react-icons/fa";

const appointments = [
  { id: 1, patient: "Alice Johnson", doctor: "Dr. John Smith", date: "2025-03-10" },
  { id: 2, patient: "Bob Williams", doctor: "Dr. Jane Doe", date: "2025-03-15" },
];

const Appointments = () => {
  return (
    <div className="appointments-container">
      <h1>Upcoming Appointments</h1>
      <ul className="appointments-list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <FaCalendarCheck className="appointment-icon" />
            <p><strong>{appointment.patient}</strong> with {appointment.doctor}</p>
            <span>{appointment.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;

