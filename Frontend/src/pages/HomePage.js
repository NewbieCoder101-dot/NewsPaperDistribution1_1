// frontend/src/pages/HomePage.js
// Landing page for the app. Allows users to select their role and proceed to login or dashboard.

import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  // Navigate to the selected role's dashboard.
  const handleRoleSelection = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'main-distributor':
        navigate('/main-distributor');
        break;
      case 'sub-distributor':
        navigate('/sub-distributor');
        break;
      case 'retailer':
        navigate('/retailer');
        break;
      case 'producer':
        navigate('/producer');
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Newspaper Distribution System</h1>
      <p>Please select your role to proceed:</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handleRoleSelection('admin')} style={buttonStyle}>
          Admin
        </button>
        <button onClick={() => handleRoleSelection('main-distributor')} style={buttonStyle}>
          Main Distributor
        </button>
        <button onClick={() => handleRoleSelection('sub-distributor')} style={buttonStyle}>
          Sub Distributor
        </button>
        <button onClick={() => handleRoleSelection('retailer')} style={buttonStyle}>
          Retailer
        </button>
        <button onClick={() => handleRoleSelection('producer')} style={buttonStyle}>
          Producer
        </button>
      </div>
    </div>
  );
}

// Basic styling for the buttons
const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default HomePage;
