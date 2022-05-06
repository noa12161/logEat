import React from 'react';
import Chart from '../components/chart/Chart';

const ChartContainer = ({ user }) => {
  return user ? (
    <Chart user={user} />
  ) : (
    <div style={{ margin: 'auto', fontSize: '2rem' }} className="jcac">
      로그인이 필요합니다...
    </div>
  );
};

export default ChartContainer;
