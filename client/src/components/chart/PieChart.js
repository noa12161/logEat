import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const PieChart = ({ chartData }) => {
  return chartData ? <Pie data={chartData} /> : <div></div>;
};

export default PieChart;
