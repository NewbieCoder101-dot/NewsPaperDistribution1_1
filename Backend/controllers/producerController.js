// backend/controllers/producerController.js

/**
 * This file contains the logic for Producers to:
 * - Retrieve production statistics for various time periods.
 * - Fetch hierarchical data from main distributors.
 */

const db = require('../config/db');

// Controller to fetch production statistics (daily, weekly, monthly, yearly)
exports.getProductionStats = async (req, res) => {
    const { period } = req.params; // e.g., 'daily', 'weekly', 'monthly', 'yearly'

    try {
        // Example query: Adjust according to your database schema
        let query = '';
        if (period === 'daily') {
            query = 'SELECT * FROM production_stats WHERE date = CURDATE();';
        } else if (period === 'weekly') {
            query = 'SELECT * FROM production_stats WHERE WEEK(date) = WEEK(CURDATE());';
        } else if (period === 'monthly') {
            query = 'SELECT * FROM production_stats WHERE MONTH(date) = MONTH(CURDATE());';
        } else if (period === 'yearly') {
            query = 'SELECT * FROM production_stats WHERE YEAR(date) = YEAR(CURDATE());';
        } else {
            return res.status(400).json({ error: 'Invalid period specified' });
        }

        const [results] = await db.query(query);
        res.status(200).json({ stats: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch production statistics' });
    }
};

// Controller to fetch hierarchical data from main distributors
exports.getHierarchyData = async (req, res) => {
    try {
        // Example query: Adjust according to your database schema
        const query = `
            SELECT 
                md.name AS main_distributor,
                sd.name AS sub_distributor,
                r.name AS retailer,
                r.remaining_newspapers
            FROM main_distributors md
            LEFT JOIN sub_distributors sd ON md.id = sd.main_distributor_id
            LEFT JOIN retailers r ON sd.id = r.sub_distributor_id;
        `;

        const [results] = await db.query(query);
        res.status(200).json({ hierarchy: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch hierarchical data' });
    }
};
