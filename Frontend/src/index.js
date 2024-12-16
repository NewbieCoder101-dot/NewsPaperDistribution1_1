// frontend/src/index.js
// Entry point for the React frontend application. It renders the App component into the DOM.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component.
import './index.css'; // Import global styles (if any).

// Create the root element and render the App component.
const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root element from the HTML file.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
