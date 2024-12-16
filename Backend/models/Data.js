// backend/models/Data.js

/**
 * Data Model
 * This model is used to store daily, weekly, monthly, and yearly data related to newspaper distribution.
 * It tracks sold, unsold, profit, and loss data for different roles.
 */

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Data = sequelize.define('Data', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['retailer', 'subDistributor', 'mainDistributor', 'producer']],
        },
    },
    referenceId: {
        type: DataTypes.INTEGER, // References the unique ID of the associated user or distributor
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
    profit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, // Profit is calculated and optional
    },
    loss: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, // Loss is calculated and optional
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

export default Data;
