const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticateUser, authorizeRole } = require("../middleWare/authMiddleWare");

// ✅ Only doctors & admins can view patients
router.get("/", authenticateUser, authorizeRole(["doctor", "admin"]), async (req, res) => {
    try {
        res.json({ message: "Patients data accessible to doctors and admins only." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Only admins can delete patients
router.delete("/:id", authenticateUser, authorizeRole(["admin"]), async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute("DELETE FROM patients WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error.sqlMessage || error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;





