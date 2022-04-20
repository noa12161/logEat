import React from 'react';
import { useState, useEffect } from 'react';
import './chart.css';
import LineChart from './LineChart';
// 리덕스
import { useSelector } from 'react-redux';
import { formatDateString } from '../../lib/functions/common';

const Chart = ({ user }) => {
  const { monthCaloriesIntake } = useSelector((state) => state.food);
  const [monthlyCaloriesChartData, setMonthlyCaloriesChartData] =
    useState(null);
  const [bodyWeightChartData, setBodyWeightChartData] = useState(null);
  const [sortBWByDate, setSortBWByDate] = useState([]);

  useEffect(() => {
    if (!monthCaloriesIntake.data || monthCaloriesIntake.isFetching) return;
    setMonthlyCaloriesChartData({
      labels: monthCaloriesIntake.data.map((d) => d.date),
      datasets: [
        {
          label: `${monthCaloriesIntake.currentMonth}월 섭취 열량 차트`,
          data: monthCaloriesIntake.data.map((d) => d.cal),
          backgroundColor: ['red', 'blue', 'yellow', 'purple'],
          borderColor: 'black',
          borderWidth: 1,
        },
      ],
    });
  }, [monthCaloriesIntake]);

  useEffect(() => {
    const copyData = [...user.bodyWeight];
    const sortedData = copyData.sort(
      (a, b) => formatDateString(a.date) - formatDateString(b.date),
    );
    console.log(sortedData);
    setSortBWByDate(sortedData);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setBodyWeightChartData({
      labels: sortBWByDate.map((d) => d.date),
      datasets: [
        {
          label: `몸무게 변화 차트`,
          data: sortBWByDate.map((d) => d.weight),
          backgroundColor: ['red', 'blue', 'yellow', 'purple'],
          borderColor: 'black',
          borderWidth: 1,
        },
      ],
    });
  }, [user, sortBWByDate]);

  return (
    <div className="Chart jcac">
      {/* <button onClick={addField}>테스트</button> */}
      {monthCaloriesIntake.data && !monthCaloriesIntake.isFetching ? (
        <div className="monthly_calories_chartContainer">
          <LineChart
            chartData={
              monthlyCaloriesChartData ? monthlyCaloriesChartData : null
            }
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="monthly_calories_chartContainer">
        <LineChart
          chartData={bodyWeightChartData ? bodyWeightChartData : null}
        />
      </div>
    </div>
  );
};

export default Chart;
