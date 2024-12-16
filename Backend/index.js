// backend/index.js
// Entry point of the backend server.
// This file initializes the Express app, connects to the database, and sets up basic routes.

const express = require('express'); // Importing Express to create the server.
const cors = require('cors'); // Middleware to allow cross-origin requests (important for frontend-backend communication).
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies.
const db = require('./config/db'); // Importing the database configuration.

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000; // The server will run on port 5000 by default.

// Middleware
app.use(cors()); // Enable CORS.
app.use(bodyParser.json()); // Parse incoming JSON requests.
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data.

// Test Route
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

// Import routes (Add other routes later as needed)
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes); // All admin-related routes will start with '/api/admin'.

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Ensure database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});
