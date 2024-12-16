// backend/models/Report.js

/**
 * Report Model
 * This model stores the reports generated by different roles (Retailer, Sub-Distributor, Main Distributor).
 * Each report tracks the data shared with higher hierarchy levels.
 */

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['retailer', 'subDistributor', 'mainDistributor']],
        },
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false, // References the ID of the sender (e.g., retailer, sub-distributor)
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false, // References the ID of the receiver (e.g., sub-distributor, main distributor)
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    reportType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['daily', 'weekly', 'monthly', 'yearly']],
        },
    },
    sold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    unsold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // Status can be 'pending', 'sent', or 'received'
        validate: {
            isIn: [['pending', 'sent', 'received']],
        },
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional field for any additional information or comments
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

export default Report;
