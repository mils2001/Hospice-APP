import React, { useEffect, useState } from "react";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token"); // use "token" if shared auth

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to fetch doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="doctors-container">
      <h2 className="doctors-title">Our Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <div className="doctors-list">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img
                src={doctor.image_url || "http://localhost:5000/images/default-doctor.jpg"}
                alt={doctor.name}
                className="doctor-photo"
              />
              <h3>{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <p>📞 {doctor.contact}</p>
              <p>📧 {doctor.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;














