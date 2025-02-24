import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Patients from "./pages/Patients.jsx";
import Doctors from "./pages/Doctors.jsx";
import Appointments from "./pages/Appointments.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx"; // Added Dashboard
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Route */}
      </Routes>
    </Router>
  );
}

export default App;


