// backend/utils/errorHandler.js

/**
 * Utility function to handle application-wide errors.
 * Centralized error handling for consistent responses.
 */

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Internal Server Error',
    });
};

export { errorHandler };