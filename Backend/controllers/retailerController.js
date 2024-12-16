// backend/controllers/retailerController.js

/**
 * This file contains the logic for Retailers to:
 * - Upload the total number of remaining newspapers.
 * - Send daily sold/unsold reports to their respective sub-distributors.
 */

const db = require('../config/db');

// Controller to upload the total number of remaining newspapers
exports.uploadRemainingNewspapers = async (req, res) => {
    const { retailerId, remainingNewspapers } = req.body;

    try {
        const query = 'UPDATE retailers SET remaining_newspapers = ? WHERE id = ?';
        await db.query(query, [remainingNewspapers, retailerId]);

        res.status(200).json({ message: 'Remaining newspapers updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update remaining newspapers' });
    }
};

// Controller to send daily sold/unsold report to the sub-distributor
exports.sendDailyReport = async (req, res) => {
    const { retailerId, subDistributorId, soldNewspapers, unsoldNewspapers } = req.body;

    try {
        const query = 'INSERT INTO daily_reports (retailer_id, sub_distributor_id, sold_newspapers, unsold_newspapers, date) VALUES (?, ?, ?, ?, CURDATE())';
        await db.query(query, [retailerId, subDistributorId, soldNewspapers, unsoldNewspapers]);

        res.status(200).json({ message: 'Daily report sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send daily report' });
    }
};
