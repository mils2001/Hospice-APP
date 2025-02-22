const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [users] = await db.execute("SELECT id, role FROM users WHERE id = ?", [decoded.id]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        req.user = users[0];  // Attach user data to request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

// ✅ Middleware for role-based authorization
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
        next();
    };
};

// ✅ Ensure both functions are properly exported
module.exports = { authenticateUser, authorizeRole };











