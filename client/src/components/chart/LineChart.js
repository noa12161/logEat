import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ chartData }) => {
  return chartData ? <Line data={chartData} /> : <div>Loading...</div>;
};

export default LineChart;
