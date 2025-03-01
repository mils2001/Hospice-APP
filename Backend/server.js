const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images from "public/images"
app.use("/images", express.static(path.join(__dirname, "public/images")));

const SECRET_KEY = "your_secret_key"; // 🔹 Change this to a secure secret key!

// ✅ MySQL Connection
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "NewPassword",
  database: "hospital_db",
};

let db;
(async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

// ✅ Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Access denied. No token provided." });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token." });
    req.user = decoded;
    next();
  });
};

// ✅ Signup Route
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields are required." });

  try {
    // Check if user already exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) return res.status(400).json({ error: "Email already registered." });

    // Hash password and insert user
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Signup failed." });
  }
});

// ✅ Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "All fields are required." });

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return res.status(401).json({ error: "Invalid email or password." });

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password." });

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "2h" });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed." });
  }
});

// ✅ Protected Route Example (Dashboard)
app.get("/api/dashboard", verifyToken, (req, res) => {
  res.json({ success: true, message: "Welcome to the Dashboard!", user: req.user });
});

// ✅ API to Fetch Patients Data (Protected)
app.get("/api/patients", verifyToken, async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, name, diagnosis, status, image_url FROM patients");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Doctors Data (Protected)
app.get("/api/doctors", verifyToken, async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, name, specialization, contact, email, image_url FROM doctors");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ API to Fetch Appointments Data (Protected)
app.get("/api/appointments", verifyToken, async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT a.id, a.patient_name, d.name AS doctor_name, a.appointment_date, a.status
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.appointment_date DESC
    `);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));











  
