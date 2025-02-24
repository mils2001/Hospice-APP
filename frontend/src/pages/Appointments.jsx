import React from "react";
import "./Appointments.css";
import { FaCalendarCheck, FaUserMd, FaUser } from "react-icons/fa";

const appointmentsData = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. James Smith",
    date: "2025-03-02",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Sarah Williams",
    doctor: "Dr. Anna Johnson",
    date: "2025-03-05",
    time: "02:00 PM",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Michael Lee",
    doctor: "Dr. Michael Brown",
    date: "2025-03-07",
    time: "09:00 AM",
    status: "Cancelled",
  },
];

const Appointments = () => {
  return (
    <div className="appointments-container">
      <h2 className="appointments-title">Appointments</h2>
      <div className="appointments-list">
        {appointmentsData.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-header">
              <FaCalendarCheck className="appointment-icon" />
              <h3>{appointment.date}</h3>
            </div>
            <p>
              <FaUser className="icon" /> <strong>Patient:</strong> {appointment.patient}
            </p>
            <p>
              <FaUserMd className="icon" /> <strong>Doctor:</strong> {appointment.doctor}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <p className={`status ${appointment.status.toLowerCase()}`}>
              {appointment.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;


