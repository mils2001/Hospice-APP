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
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ API to Fetch Patients Data
app.get("/api/patients", (req, res) => {
  const query = "SELECT id, name, diagnosis, status, image_url FROM patients";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching patients:", err);
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

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));






  
