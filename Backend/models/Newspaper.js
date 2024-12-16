// backend/models/Newspaper.js

/**
 * Newspaper Model
 * This model stores information about the different types of newspapers being managed in the system.
 */

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Newspaper = sequelize.define('Newspaper', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    producerId: {
        type: DataTypes.INTEGER, // Links the newspaper to its producer (e.g., Tarun Bharat, Times of India)
        allowNull: false,
    },
    pricePerCopy: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

export default Newspaper;
