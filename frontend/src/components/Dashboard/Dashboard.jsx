import React from "react";
import Sidebar from "../components/Sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

const data = [
  { name: "Patients", count: 120 },
  { name: "Doctors", count: 25 },
  { name: "Appointments", count: 95 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Dashboard Overview</h1>
        <div className="stats">
          <div className="stat-card">Total Patients: 120</div>
          <div className="stat-card">Total Doctors: 25</div>
          <div className="stat-card">Appointments: 95</div>
        </div>
        <div className="chart">
          <h2>Hospital Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



