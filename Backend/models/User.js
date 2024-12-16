// backend/models/User.js

/**
 * User Model
 * This model defines the schema for all users in the system, including Admins, Main Distributors,
 * Sub-Distributors, Retailers, and Producers. It handles authentication and role-based access control.
 */

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Passwords should be hashed before storage
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['admin', 'mainDistributor', 'subDistributor', 'retailer', 'producer']],
        },
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field for user contact number
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional field for address
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true, // Specific to Main Distributors and Sub-Distributors
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

export default User;
