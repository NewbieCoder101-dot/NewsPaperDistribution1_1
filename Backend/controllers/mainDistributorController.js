// backend/controllers/mainDistributorController.js

/**
 * This file contains the logic for Main Distributors to:
 * - Upload the total number of remaining newspapers in their district.
 * - Retrieve reports from associated sub-distributors.
 * - Send aggregated data to producers.
 */

const db = require('../config/db');

// Controller to upload the total number of remaining newspapers in the district
exports.uploadRemainingNewspapers = async (req, res) => {
    const { mainDistributorId, remainingNewspapers } = req.body;

    try {
        const query = 'UPDATE main_distributors SET remaining_newspapers = ? WHERE id = ?';
        await db.query(query, [remainingNewspapers, mainDistributorId]);

        res.status(200).json({ message: 'Remaining newspapers updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update remaining newspapers' });
    }
};

// Controller to retrieve reports from associated sub-distributors
exports.getSubDistributorReports = async (req, res) => {
    const { mainDistributorId } = req.query;

    try {
        const query = `SELECT sd.name AS sub_distributor_name, sr.sold_newspapers, sr.unsold_newspapers, sr.date
                       FROM sub_distributor_reports sr
                       JOIN sub_distributors sd ON sr.sub_distributor_id = sd.id
                       WHERE sd.main_distributor_id = ?
                       ORDER BY sr.date DESC`;
        const [reports] = await db.query(query, [mainDistributorId]);

        res.status(200).json({ reports });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve sub-distributor reports' });
    }
};

// Controller to send aggregated data to producers
exports.sendAggregatedData = async (req, res) => {
    const { mainDistributorId, producerId, aggregatedData } = req.body;

    try {
        const query = 'INSERT INTO producer_reports (main_distributor_id, producer_id, data, date) VALUES (?, ?, ?, CURDATE())';
        await db.query(query, [mainDistributorId, producerId, JSON.stringify(aggregatedData)]);

        res.status(200).json({ message: 'Aggregated data sent to producer successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send aggregated data to producer' });
    }
};
