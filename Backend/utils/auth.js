// backend/utils/auth.js

/**
 * Utility functions for authentication.
 * Includes token generation and verification for secure user access.
 */

import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1d' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export { generateToken, verifyToken };