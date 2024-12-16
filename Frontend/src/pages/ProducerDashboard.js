// src/pages/ProducerDashboard.js

/**
 * This is the dashboard page for Producers.
 * It allows Producers to:
 * - View the total number of newspapers produced, wasted, sold, and unsold.
 * - Check weekly, monthly, and yearly reports.
 * - View hierarchical data of distributors and retailers in aggregated formats.
 * - Visualize data in a pie chart.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const ProducerDashboard = () => {
    const [reportType, setReportType] = useState('daily'); // Options: daily, weekly, monthly, yearly
    const [data, setData] = useState({ produced: 0, wasted: 0, sold: 0, unsold: 0 });

    useEffect(() => {
        fetchReportData(reportType);
    }, [reportType]);

    const fetchReportData = async (type) => {
        try {
            const response = await axios.get('/api/producers/report', { params: { type } });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    };

    const pieChartData = [
        ['Status', 'Newspapers'],
        ['Sold', data.sold],
        ['Unsold', data.unsold],
        ['Wasted', data.wasted],
    ];

    return (
        <div>
            <h1>Producer Dashboard</h1>

            <div>
                <h2>Report Type</h2>
                <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div>
                <h2>Aggregated Data</h2>
                <p>Total Produced: {data.produced}</p>
                <p>Total Wasted: {data.wasted}</p>
                <p>Total Sold: {data.sold}</p>
                <p>Total Unsold: {data.unsold}</p>
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

export default ProducerDashboard;
