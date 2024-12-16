// backend/middleware/authMiddleware.js

/**
 * Middleware to authenticate and authorize users based on their role.
 * It verifies the JWT token sent in the request headers and ensures the user has the necessary permissions.
 */

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access Denied: No Token Provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Check if the user's role matches the required role (or allow admin access)
            if (requiredRole && req.user.role !== requiredRole && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    };
};

export default authMiddleware;
