// backend/utils/fileHandler.js

/**
 * Utility function to handle file uploads and downloads.
 * This is used for reports sent by retailers to sub-distributors (e.g., SQL or Excel files).
 */

import fs from 'fs';
import path from 'path';

const uploadFile = (file, uploadPath) => {
    const destination = path.join(uploadPath, file.name);
    return new Promise((resolve, reject) => {
        file.mv(destination, (err) => {
            if (err) reject(err);
            else resolve(destination);
        });
    });
};

const downloadFile = (filePath, res) => {
    res.download(filePath, (err) => {
        if (err) {
            console.error('File download error:', err);
            res.status(500).send('Could not download the file.');
        }
    });
};

export { uploadFile, downloadFile };

// ---------------------------------------------

