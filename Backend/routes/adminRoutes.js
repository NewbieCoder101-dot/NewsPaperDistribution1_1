// // backend/routes/adminRoutes.js
// // Defines routes for admin-related actions (e.g., managing accounts).

// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController'); // Import the admin controller.

// // Route: GET all accounts (placeholder functionality)
// router.get('/accounts', adminController.getAllAccounts);

// // Route: POST to add a new account (placeholder functionality)
// router.post('/accounts', adminController.addAccount);

// // Route: DELETE an account by ID (placeholder functionality)
// router.delete('/accounts/:id', adminController.deleteAccount);

// // Export the router to use in the main server file.
// module.exports = router;



// backend/routes/adminRoutes.js
// Routes for Admin to manage accounts.

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection

// Get all accounts
router.get('/accounts', async (req, res) => {
  try {
    const [accounts] = await db.query('SELECT id, username, role FROM users');
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Failed to fetch accounts' });
  }
});

// Add a new account
router.post('/accounts', async (req, res) => {
  const { username, password, role } = req.body;

  // Simple validation
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
      username,
      password, // Ensure passwords are hashed in a production app.
      role,
    ]);
    res.status(201).json({ message: 'Account added successfully' });
  } catch (error) {
    console.error('Error adding account:', error);
    res.status(500).json({ message: 'Failed to add account' });
  }
});

// Delete an account
router.delete('/accounts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Failed to delete account' });
  }
});

module.exports = router;
