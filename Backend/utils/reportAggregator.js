// backend/utils/reportAggregator.js

/**
 * Utility function to aggregate historical data.
 * This is used for generating weekly, monthly, and yearly reports.
 */

import { Data } from '../models/Data.js';

const aggregateReports = async (timeframe) => {
    // Example logic to aggregate data based on a given timeframe
    let startDate, endDate;

    const currentDate = new Date();
    if (timeframe === 'weekly') {
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
    } else if (timeframe === 'monthly') {
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    } else if (timeframe === 'yearly') {
        startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
    }

    endDate = new Date(); // Current date

    const aggregatedData = await Data.findAll({
        where: {
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        },
        attributes: [
            'region',
            'newspaperType',
            [sequelize.fn('SUM', sequelize.col('sold')), 'totalSold'],
            [sequelize.fn('SUM', sequelize.col('unsold')), 'totalUnsold'],
        ],
        group: ['region', 'newspaperType'],
    });

    return aggregatedData;
};

export { aggregateReports };
