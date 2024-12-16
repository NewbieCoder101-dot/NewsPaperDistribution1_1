// backend/routes/subDistributorRoutes.js

/**
 * This file defines routes for Sub-Distributors to:
 * - Upload the total number of remaining newspapers in their city.
 * - Retrieve daily reports from their associated retailers.
 */

const express = require('express');
const router = express.Router();
const { uploadRemainingNewspapers, getRetailerReports } = require('../controllers/subDistributorController');

// Route to upload the total number of remaining newspapers in the city
router.post('/remaining-newspapers', uploadRemainingNewspapers);

// Route to get daily reports from associated retailers
router.get('/retailer-reports', getRetailerReports);

module.exports = router;
