// backend/controllers/subDistributorController.js

/**
 * This file contains the logic for Sub-Distributors to:
 * - Upload the total number of remaining newspapers in their city.
 * - Retrieve daily reports from their associated retailers.
 */

const db = require('../config/db');

// Controller to upload the total number of remaining newspapers in the city
exports.uploadRemainingNewspapers = async (req, res) => {
    const { subDistributorId, remainingNewspapers } = req.body;

    try {
        const query = 'UPDATE sub_distributors SET remaining_newspapers = ? WHERE id = ?';
        await db.query(query, [remainingNewspapers, subDistributorId]);

        res.status(200).json({ message: 'Remaining newspapers updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update remaining newspapers' });
    }
};

// Controller to retrieve daily reports from associated retailers
exports.getRetailerReports = async (req, res) => {
    const { subDistributorId } = req.query;

    try {
        const query = `SELECT r.name AS retailer_name, dr.sold_newspapers, dr.unsold_newspapers, dr.date
                       FROM daily_reports dr
                       JOIN retailers r ON dr.retailer_id = r.id
                       WHERE dr.sub_distributor_id = ?
                       ORDER BY dr.date DESC`;
        const [reports] = await db.query(query, [subDistributorId]);

        res.status(200).json({ reports });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve retailer reports' });
    }
};
