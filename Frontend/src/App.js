// frontend/src/App.js
// Main component of the React app. Manages routing and renders different pages.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import the HomePage component.
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard component (placeholder).
import MainDistributorDashboard from './pages/MainDistributorDashboard'; // Placeholder for Main Distributor.
import SubDistributorDashboard from './pages/SubDistributorDashboard'; // Placeholder for Sub Distributor.
import RetailerDashboard from './pages/RetailerDashboard'; // Placeholder for Retailer.
import ProducerDashboard from './pages/ProducerDashboard'; // Placeholder for Producer.

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/main-distributor" element={<MainDistributorDashboard />} />
          <Route path="/sub-distributor" element={<SubDistributorDashboard />} />
          <Route path="/retailer" element={<RetailerDashboard />} />
          <Route path="/producer" element={<ProducerDashboard />} />
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
