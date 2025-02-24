import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Hospice</div>

      {/* Mobile Toggle Button */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors" activeClassName="active">
            Doctors
          </NavLink>
        </li>
        <li>
          <NavLink to="/patients" activeClassName="active">
            Patients
          </NavLink>
        </li>
        <li>
          <NavLink to="/appointments" activeClassName="active">
            Appointments
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
