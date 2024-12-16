// backend/routes/producerRoutes.js

/**
 * This file contains routes for Producers to:
 * - View production statistics (daily, weekly, monthly, yearly).
 * - View hierarchical data from main distributors.
 * - Retrieve data in graphical format (e.g., pie charts).
 */

const express = require('express');
const router = express.Router();
const { getProductionStats, getHierarchyData } = require('../controllers/producerController');

// Route to get production statistics (daily, weekly, monthly, yearly)
router.get('/stats/:period', getProductionStats);

// Route to get hierarchical data (from main distributors down)
router.get('/hierarchy', getHierarchyData);

module.exports = router;