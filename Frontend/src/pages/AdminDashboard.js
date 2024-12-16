// frontend/src/pages/AdminDashboard.js
// Admin dashboard page. Allows the admin to manage accounts and view all user data.

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [accounts, setAccounts] = useState([]); // State to store account data.
  const [newAccount, setNewAccount] = useState({ username: '', password: '', role: '' }); // State for new account details.
  const [refresh, setRefresh] = useState(false); // Trigger for re-fetching data.

  // Fetch all accounts on component load or refresh.
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/admin/accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, [refresh]);

  // Add a new account.
  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/accounts', newAccount);
      alert('Account added successfully');
      setNewAccount({ username: '', password: '', role: '' }); // Reset form.
      setRefresh(!refresh); // Trigger data refresh.
    } catch (error) {
      console.error('Error adding account:', error);
      alert('Failed to add account');
    }
  };

  // Delete an account by ID.
  const handleDeleteAccount = async (id) => {
    try {
      await axios.delete(`/api/admin/accounts/${id}`);
      alert('Account deleted successfully');
      setRefresh(!refresh); // Trigger data refresh.
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <h2>Manage Accounts</h2>

      {/* Add Account Form */}
      <form onSubmit={handleAddAccount} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Username"
          value={newAccount.username}
          onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={newAccount.password}
          onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
          required
          style={inputStyle}
        />
        <select
          value={newAccount.role}
          onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}
          required
          style={inputStyle}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="main-distributor">Main Distributor</option>
          <option value="sub-distributor">Sub Distributor</option>
          <option value="retailer">Retailer</option>
          <option value="producer">Producer</option>
        </select>
        <button type="submit" style={buttonStyle}>
          Add Account
        </button>
      </form>

      {/* Accounts List */}
      <h2>All Accounts</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.username}</td>
              <td>{account.role}</td>
              <td>
                <button
                  onClick={() => handleDeleteAccount(account.id)}
                  style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Basic input styling
const inputStyle = {
  margin: '5px',
  padding: '10px',
  fontSize: '14px',
};

// Basic button styling
const buttonStyle = {
  margin: '5px',
  padding: '10px 20px',
  fontSize: '14px',
  cursor: 'pointer',
};

export default AdminDashboard;
