//validation for report updates
/**
 * Middleware for validating request data. This ensures incoming data is properly structured and contains
 * the necessary fields before reaching the route handlers.
 */

const validateData = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: 'Validation Error',
                details: error.details.map((detail) => detail.message),
            });
        }

        next(); // Proceed to the next middleware or route handler
    };
};

export default validateData;