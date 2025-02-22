require("dotenv").config(); // Load environment variables
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const patientRoutes = require("./routes/patientsRoutes"); // Ensure correct path
const authRoutes = require("./routes/authRoutes"); // Ensure correct path
const db = require("./config/db"); // Ensure DB connection is set up

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure JSON parsing

// Debugging: Check if JWT_SECRET is loaded
if (!process.env.JWT_SECRET) {
    console.error("❌ ERROR: JWT_SECRET is not set in .env file!");
    process.exit(1); // Exit the app if JWT_SECRET is missing
}

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Hospital Management API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});



  
