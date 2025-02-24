import React from "react";
import "./Dashboard.css";
import { FaUserMd, FaUser, FaCalendarCheck, FaHospital } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";

// Data for Charts
const data = [
  { name: "Doctors", count: 25 },
  { name: "Patients", count: 120 },
  { name: "Appointments", count: 45 },
  { name: "Departments", count: 10 },
];

const pieData = [
  { name: "Doctors", value: 25 },
  { name: "Patients", value: 120 },
  { name: "Appointments", value: 45 },
  { name: "Departments", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Hospital Dashboard</h2>

      {/* Animated Dashboard Cards */}
      <motion.div className="dashboard-cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div className="dashboard-card" whileHover={{ scale: 1.1 }}>
          <FaUserMd className="dashboard-icon doctor-icon" />
          <h3>Doctors</h3>
          <p>25 Specialists</p>
        </motion.div>
        <motion.div className="dashboard-card" whileHover={{ scale: 1.1 }}>
          <FaUser className="dashboard-icon patient-icon" />
          <h3>Patients</h3>
          <p>120 Active Patients</p>
        </motion.div>
        <motion.div className="dashboard-card" whileHover={{ scale: 1.1 }}>
          <FaCalendarCheck className="dashboard-icon appointment-icon" />
          <h3>Appointments</h3>
          <p>45 Scheduled</p>
        </motion.div>
        <motion.div className="dashboard-card" whileHover={{ scale: 1.1 }}>
          <FaHospital className="dashboard-icon hospital-icon" />
          <h3>Departments</h3>
          <p>10 Medical Units</p>
        </motion.div>
      </motion.div>

      {/* Bar Chart Section */}
      <div className="chart-section">
        <h2>Statistics Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4CAF50" animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart Section */}
      <div className="chart-section">
        <h2>Data Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart Section */}
      <div className="chart-section">
        <h2>Monthly Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#FF8042" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;








