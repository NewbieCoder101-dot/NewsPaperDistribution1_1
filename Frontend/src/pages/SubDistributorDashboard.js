// src/pages/SubDistributorDashboard.js

/**
 * This is the dashboard page for Sub-Distributors.
 * It allows Sub-Distributors to:
 * - View retailer data.
 * - Upload the total number of remaining newspapers for their city.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const SubDistributorDashboard = () => {
    const [retailerReports, setRetailerReports] = useState([]);
    const [remainingNewspapers, setRemainingNewspapers] = useState(0);

    useEffect(() => {
        fetchRetailerReports();
    }, []);

    const fetchRetailerReports = async () => {
        try {
            const response = await axios.get('/api/sub-distributors/retailer-reports', {
                params: { subDistributorId: 1 }, // Replace with dynamic ID
            });
            setRetailerReports(response.data.reports);
        } catch (error) {
            console.error('Error fetching retailer reports:', error);
        }
    };

    const handleUploadRemainingNewspapers = async () => {
        try {
            await axios.post('/api/sub-distributors/remaining-newspapers', {
                subDistributorId: 1, // Replace with dynamic ID
                remainingNewspapers,
            });
            alert('Remaining newspapers updated successfully!');
        } catch (error) {
            console.error('Error updating remaining newspapers:', error);
        }
    };

    const pieChartData = [
        ['Status', 'Newspapers'],
        ['Sold', 300],
        ['Unsold', 100],
    ];

    return (
        <div>
            <h1>Sub-Distributor Dashboard</h1>

            <div>
                <h2>Retailer Reports</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Retailer</th>
                            <th>Sold Newspapers</th>
                            <th>Unsold Newspapers</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {retailerReports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.retailer_name}</td>
                                <td>{report.sold_newspapers}</td>
                                <td>{report.unsold_newspapers}</td>
                                <td>{report.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                    options={{ title: 'Retailer Distribution Overview' }}
                    width={'100%'}
                    height={'400px'}
                />
            </div>
        </div>
    );
};

export default SubDistributorDashboard;
