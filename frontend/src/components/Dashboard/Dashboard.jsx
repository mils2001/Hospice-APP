import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // Ensure you have styles

const Dashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    // Fetch total patients
    axios.get("http://localhost:5000/api/patients/count")
      .then(response => setTotalPatients(response.data.total))
      .catch(error => console.error("Error fetching patient count:", error));

    // Fetch total doctors
    axios.get("http://localhost:5000/api/doctors/count")
      .then(response => setTotalDoctors(response.data.total))
      .catch(error => console.error("Error fetching doctor count:", error));

    // Fetch upcoming appointments
    axios.get("http://localhost:5000/api/appointments/upcoming")
      .then(response => setUpcomingAppointments(response.data))
      .catch(error => console.error("Error fetching upcoming appointments:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>🏥 Hospital Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>👨‍⚕️ Total Doctors</h3>
          <p>{totalDoctors}</p>
        </div>

        <div className="card">
          <h3>🧑‍🤝‍🧑 Total Patients</h3>
          <p>{totalPatients}</p>
        </div>
      </div>

      <h3>📅 Upcoming Appointments</h3>
      <div className="appointments">
        {upcomingAppointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <p><strong>Patient:</strong> {appointment.patient_name}</p>
              <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
              <p><strong>Date:</strong> {appointment.appointment_date}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;









