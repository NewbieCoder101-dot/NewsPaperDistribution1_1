// backend/config/db.js
// Configures the connection to the MySQL database.

const mysql = require('mysql'); // Importing MySQL library to interact with the database.

// Create a connection pool to the database.
const db = mysql.createPool({
  host: 'localhost', // Replace with your database host (usually 'localhost' for local development).
  user: 'root', // Replace with your MySQL username.
  password: '', // Replace with your MySQL password.
  database: 'newspaper_db', // Replace with your database name.
  connectionLimit: 10, // Maximum number of connections in the pool.
});

// Export the database connection to be used across the project.
module.exports = db;
