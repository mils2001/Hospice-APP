import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Create this CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/doctors">Doctors</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
