// backend/routes/mainDistributorRoutes.js

/**
 * This file defines routes for Main Distributors to:
 * - Upload the total number of remaining newspapers in their district.
 * - Retrieve reports from their associated sub-distributors.
 * - Send aggregated data to producers.
 */

const express = require('express');
const router = express.Router();
const { uploadRemainingNewspapers, getSubDistributorReports, sendAggregatedData } = require('../controllers/mainDistributorController');

// Route to upload the total number of remaining newspapers in the district
router.post('/remaining-newspapers', uploadRemainingNewspapers);

// Route to get reports from sub-distributors
router.get('/sub-distributor-reports', getSubDistributorReports);

// Route to send aggregated data to producers
router.post('/send-aggregated-data', sendAggregatedData);

module.exports = router;
