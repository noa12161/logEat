import React from 'react';
import Chart from '../components/chart/Chart';

const ChartContainer = ({ user }) => {
  return user ? <Chart user={user} /> : <div>login please...</div>;
};

export default ChartContainer;
