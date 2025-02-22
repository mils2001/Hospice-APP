const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'NewPassword',  // Change this if you have a MySQL password
    database: 'hospital_db', // Use your actual database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
db.getConnection()
    .then(() => console.log("✅ MySQL Database Connected"))
    .catch((err) => console.error("❌ Database Connection Error:", err));

module.exports = db;

