// backend/controllers/adminController.js
// Contains logic for admin-related actions, such as managing accounts.

const db = require('../config/db'); // Import the database connection.

// Controller: Get all accounts (placeholder logic)
const getAllAccounts = (req, res) => {
  const query = 'SELECT * FROM accounts'; // Example SQL query (modify according to your database schema).
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching accounts:', err);
      return res.status(500).json({ message: 'Failed to fetch accounts' });
    }
    res.status(200).json(results);
  });
};

// Controller: Add a new account (placeholder logic)
const addAccount = (req, res) => {
  const { username, password, role } = req.body; // Extracting account details from the request body.
  const query = 'INSERT INTO accounts (username, password, role) VALUES (?, ?, ?)';
  db.query(query, [username, password, role], (err, result) => {
    if (err) {
      console.error('Error adding account:', err);
      return res.status(500).json({ message: 'Failed to add account' });
    }
    res.status(201).json({ message: 'Account added successfully', accountId: result.insertId });
  });
};

// Controller: Delete an account by ID (placeholder logic)
const deleteAccount = (req, res) => {
  const { id } = req.params; // Extracting account ID from the request parameters.
  const query = 'DELETE FROM accounts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting account:', err);
      return res.status(500).json({ message: 'Failed to delete account' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ message: 'Account deleted successfully' });
  });
};

// Exporting the controller functions
module.exports = {
  getAllAccounts,
  addAccount,
  deleteAccount,
};
