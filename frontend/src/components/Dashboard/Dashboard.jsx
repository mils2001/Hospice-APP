import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboard.css"; // Ensure you have styling for a clean UI

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  // ✅ Data for Charts
  const appointmentCounts = appointments.reduce((acc, appt) => {
    acc[appt.status] = (acc[appt.status] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(appointmentCounts),
    datasets: [
      {
        label: "Appointments by Status",
        data: Object.values(appointmentCounts),
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"], // Green, Orange, Red
        borderColor: "#333",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>📊 Hospital Dashboard</h2>

      {/* 🔹 Bar Chart for Appointment Status */}
      <div className="chart-container">
        <Bar data={barChartData} />
      </div>

      {/* 🔹 Upcoming Appointments Table */}
      <h3>🗓 Upcoming Appointments</h3>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => (
            <tr key={appt.id}>
              <td>{index + 1}</td>
              <td>{appt.patient_name}</td>
              <td>{appt.doctor_name}</td>
              <td>{new Date(appt.appointment_date).toLocaleString()}</td>
              <td className={appt.status.toLowerCase()}>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;












