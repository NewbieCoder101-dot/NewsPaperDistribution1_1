// src/pages/RetailerDashboard.js

/**
 * This is the dashboard page for Retailers.
 * It allows Retailers to:
 * - Upload the number of remaining newspapers in their shop.
 * - View data visualization of their sold and unsold newspapers.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const RetailerDashboard = () => {
    const [remainingNewspapers, setRemainingNewspapers] = useState(0);
    const [soldNewspapers, setSoldNewspapers] = useState(0);
    const [unsoldNewspapers, setUnsoldNewspapers] = useState(0);

    useEffect(() => {
        fetchNewspaperData();
    }, []);

    const fetchNewspaperData = async () => {
        try {
            const response = await axios.get('/api/retailers/newspaper-data', {
                params: { retailerId: 1 }, // Replace with dynamic ID
            });
            const { sold, unsold } = response.data;
            setSoldNewspapers(sold);
            setUnsoldNewspapers(unsold);
        } catch (error) {
            console.error('Error fetching newspaper data:', error);
        }
    };

    const handleUploadRemainingNewspapers = async () => {
        try {
            await axios.post('/api/retailers/remaining-newspapers', {
                retailerId: 1, // Replace with dynamic ID
                remainingNewspapers,
            });
            alert('Remaining newspapers updated successfully!');
            fetchNewspaperData();
        } catch (error) {
            console.error('Error uploading remaining newspapers:', error);
        }
    };

    const pieChartData = [
        ['Status', 'Newspapers'],
        ['Sold', soldNewspapers],
        ['Unsold', unsoldNewspapers],
    ];

    return (
        <div>
            <h1>Retailer Dashboard</h1>

            <div>
                <h2>Upload Remaining Newspapers</h2>
                <input
                    type="number"
                    value={remainingNewspapers}
                    onChange={(e) => setRemainingNewspapers(e.target.value)}
                    placeholder="Enter remaining newspapers"
                />
                <button onClick={handleUploadRemainingNewspapers}>Upload</button>
            </div>

            <div>
                <h2>Data Visualization</h2>
                <Chart
                    chartType="PieChart"
                    data={pieChartData}
                    options={{ title: 'Newspaper Distribution Overview' }}
                    width={'100%'}
                    height={'400px'}
                />
            </div>
        </div>
    );
};

export default RetailerDashboard;
