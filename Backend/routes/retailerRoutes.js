// backend/routes/retailerRoutes.js

/**
 * This file defines routes for Retailers to:
 * - Upload daily remaining newspapers.
 * - Send daily sold/unsold reports to their respective sub-distributors.
 */

const express = require('express');
const router = express.Router();
const { uploadRemainingNewspapers, sendDailyReport } = require('../controllers/retailerController');

// Route to upload the total number of remaining newspapers in the shop
router.post('/remaining-newspapers', uploadRemainingNewspapers);

// Route to send daily sold/unsold report to the sub-distributor
router.post('/send-report', sendDailyReport);

module.exports = router;