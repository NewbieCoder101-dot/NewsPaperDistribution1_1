// backend/utils/logger.js

/**
 * Utility for logging application activities.
 * Helps in debugging and tracking errors or system events.
 */

import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, '../logs/app.log');

const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}\n`;
    fs.appendFile(logFilePath, formattedMessage, (err) => {
        if (err) console.error('Logging error:', err);
    });
};

export { logMessage };