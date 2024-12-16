// src/pages/MainDistributorDashboard.js

/**
 * This is the dashboard page for Main Distributors.
 * It allows Main Distributors to:
 * - View sub-distributor data.
 * - Upload remaining newspapers in their district.
 * - Send aggregated data to producers.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const MainDistributorDashboard = () => {
    const [subDistributorReports, setSubDistributorReports] = useState([]);
    const [remainingNewspapers, setRemainingNewspapers] = useState(0);
    const [aggregatedData, setAggregatedData] = useState({});
    const [producerId, setProducerId] = useState('');

    useEffect(() => {
        fetchSubDistributorReports();
    }, []);

    const fetchSubDistributorReports = async () => {
        try {
            const response = await axios.get('/api/main-distributors/sub-distributor-reports', {
                params: { mainDistributorId: 1 }, // Replace with dynamic ID
            });
            setSubDistributorReports(response.data.reports);
        } catch (error) {
            console.error('Error fetching sub-distributor reports:', error);
        }
    };

    const handleUploadRemainingNewspapers = async () => {
        try {
            await axios.post('/api/main-distributors/remaining-newspapers', {
                mainDistributorId: 1, // Replace with dynamic ID
                remainingNewspapers,
            });
            alert('Remaining newspapers updated successfully!');
        } catch (error) {
            console.error('Error updating remaining newspapers:', error);
        }
    };

    const handleSendAggregatedData = async () => {
        try {
            await axios.post('/api/main-distributors/send-aggregated-data', {
                mainDistributorId: 1, // Replace with dynamic ID
                producerId,
                aggregatedData,
            });
            alert('Aggregated data sent to producer successfully!');
        } catch (error) {
            console.error('Error sending aggregated data:', error);
        }
    };

    const pieChartData = [
        ['Status', 'Newspapers'],
        ['Sold', 400],
        ['Unsold', 200],
    ];

    return (
        <div>
            <h1>Main Distributor Dashboard</h1>

            <div>
                <h2>Sub-Distributor Reports</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Sub-Distributor</th>
                            <th>Sold Newspapers</th>
                            <th>Unsold Newspapers</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subDistributorReports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.sub_distributor_name}</td>
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
                <h2>Send Aggregated Data to Producers</h2>
                <textarea
                    value={JSON.stringify(aggregatedData, null, 2)}
                    onChange={(e) => setAggregatedData(JSON.parse(e.target.value))}
                    placeholder="Enter aggregated data as JSON"
                    rows="5"
                    cols="30"
                ></textarea>
                <input
                    type="text"
                    value={producerId}
                    onChange={(e) => setProducerId(e.target.value)}
                    placeholder="Enter producer ID"
                />
                <button onClick={handleSendAggregatedData}>Send</button>
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

export default MainDistributorDashboard;
