const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // ✅ Using async MySQL
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images from "public/images" folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

// ✅ MySQL Connection
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "NewPassword", // 🔹 Replace with your actual password
  database: "hospital_db"
};

// ✅ Connect to MySQL using async function
let db;
(async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

// ✅ API to Fetch Patients Data
app.get("/api/patients", async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, name, diagnosis, status, image_url FROM patients");
    
    const patients = results.map(patient => ({
      ...patient,
      image_url: patient.image_url
        ? `http://localhost:5000/images/${patient.image_url}`
        : "http://localhost:5000/images/default.jpg" // Provide a fallback image
    }));

    res.json(patients);
  } catch (err) {
    console.error("❌ Error fetching patients:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Doctors Data
app.get("/api/doctors", async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, name, specialization, contact, email, image_url FROM doctors");

    const doctors = results.map(doctor => ({
      ...doctor,
      image_url: doctor.image_url
        ? `http://localhost:5000/images/${doctor.image_url}`
        : "http://localhost:5000/images/default-doctor.jpg" // 🔹 Fallback image for doctors
    }));

    res.json(doctors);
  } catch (err) {
    console.error("❌ Error fetching doctors:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Appointments Data
app.get("/api/appointments", async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT a.id, a.patient_name, d.name AS doctor_name, a.appointment_date, a.status
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.appointment_date DESC
    `);
    
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching appointments:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Get Total Patients
app.get("/api/patients/count", async (req, res) => {
  try {
    const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM patients");
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Get Total Doctors
app.get("/api/doctors/count", async (req, res) => {
  try {
    const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM doctors");
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Get Total Appointments
app.get("/api/appointments/count", async (req, res) => {
  try {
    const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM appointments");
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Appointment Stats (Grouped by Date)
app.get("/api/appointments/stats", async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT DATE(appointment_date) AS date, COUNT(*) AS count 
      FROM appointments 
      GROUP BY date
      ORDER BY date ASC
    `);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Patient Status Distribution
app.get("/api/patients/status", async (req, res) => {
  try {
    const [results] = await db.query("SELECT status, COUNT(*) AS count FROM patients GROUP BY status");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));









  
