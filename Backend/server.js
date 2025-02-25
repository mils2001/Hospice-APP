const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images from the "public/images" folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "NewPassword",  // 🔹 Replace with your actual password
  database: "hospital_db"
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit if database connection fails
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ API to Fetch Patients Data
app.get("/api/patients", (req, res) => {
  const query = "SELECT id, name, diagnosis, status, image_url FROM patients";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching patients:", err.message);
      return res.status(500).json({ error: err.message });
    }

    // 🔹 Log results to verify correct data
    console.log("📋 Fetched Patients Data:", results);

    // 🔹 Map image URLs correctly
    const patients = results.map(patient => ({
      ...patient,
      image_url: patient.image_url
        ? `http://localhost:5000/images/${patient.image_url}`
        : "http://localhost:5000/images/default.jpg"  // Provide a fallback image
    }));

    res.json(patients);
  });
});

// ✅ API to Fetch Doctors Data
app.get("/api/doctors", (req, res) => {
  const query = "SELECT id, name, specialization, contact, email, image_url FROM doctors";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching doctors:", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("📋 Fetched Doctors Data:", results);

    // 🔹 Map image URLs correctly
    const doctors = results.map(doctor => ({
      ...doctor,
      image_url: doctor.image_url 
        ? `http://localhost:5000/images/${doctor.image_url}` 
        : "http://localhost:5000/images/default.jpg"
    }));

    res.json(doctors);
  });
});

// ✅ API to Fetch Total Number of Patients
app.get("/api/patients/count", (req, res) => {
  const query = "SELECT COUNT(*) AS total FROM patients";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching patient count:", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(results[0]);
  });
});

// ✅ API to Fetch Total Number of Doctors
app.get("/api/doctors/count", (req, res) => {
  const query = "SELECT COUNT(*) AS total FROM doctors";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching doctor count:", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(results[0]);
  });
});

// ✅ API to Fetch Upcoming Appointments
app.get("/api/appointments/upcoming", (req, res) => {
  const query = "SELECT * FROM appointments WHERE appointment_date >= CURDATE() ORDER BY appointment_date ASC";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching upcoming appointments:", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));







  
