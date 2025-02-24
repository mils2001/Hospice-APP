import React from "react";
import "./Dashboard.css";
import { FaUserMd, FaUser, FaCalendarCheck, FaHospital } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Hospital Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <FaUserMd className="dashboard-icon doctor-icon" />
          <h3>Doctors</h3>
          <p>25 Specialists</p>
        </div>
        <div className="dashboard-card">
          <FaUser className="dashboard-icon patient-icon" />
          <h3>Patients</h3>
          <p>120 Active Patients</p>
        </div>
        <div className="dashboard-card">
          <FaCalendarCheck className="dashboard-icon appointment-icon" />
          <h3>Appointments</h3>
          <p>45 Scheduled</p>
        </div>
        <div className="dashboard-card">
          <FaHospital className="dashboard-icon hospital-icon" />
          <h3>Departments</h3>
          <p>10 Medical Units</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
