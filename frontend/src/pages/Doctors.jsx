import React from "react";
import "./Doctors.css";
import { FaUserMd } from "react-icons/fa";

const doctorsData = [
  {
    id: 1,
    name: "Dr. James Smith",
    specialty: "Cardiologist",
    image: "https://i.imgur.com/9OH83Nn.jpeg",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Anna Johnson",
    specialty: "Neurologist",
    image: "blob:https://imgur.com/2fc1834f-3272-48cb-a991-bc3bb96e0d34.jpeg",
    available: false,
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialty: "Dermatologist",
    image: "https://i.imgur.com/820978a4.jpg",
    available: true,
  },
];

const Doctors = () => {
  return (
    <div className="doctors-container">
      <h2 className="doctors-title">Meet Our Specialists</h2>
      <div className="doctors-list">
        {doctorsData.map((doctor) => (
          <div key={doctor.id} className="doctor-card fade-in">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialty}</p>
            <p className={`availability ${doctor.available ? "available" : "not-available"}`}>
              {doctor.available ? "Available" : "Not Available"}
            </p>
            <FaUserMd className="doctor-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;








