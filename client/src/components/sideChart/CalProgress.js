import './sideChart.css';

import React from 'react';

const CalProgress = ({ targetCal, nutrition, getProgress, totalCal }) => {
  return (
    <div className="sideChart_Cal_container">
      <div className="target_bar_container">
        <div className="target_bar_left sideChart_outer_left">목표 칼로리</div>
        <div className="target_bar_right sideChart_outer_right">
          <div className="target_bar_right_bar_container sideChart_inner_left">
            <div className="progress_bar"></div>
          </div>
          <div className="target_bar_right_text sideChart_inner_right">
            {targetCal}
          </div>
        </div>
      </div>
      <div className="current_bar_container">
        <div className="current_bar_left sideChart_outer_left">섭취 칼로리</div>
        <div className="current_bar_right sideChart_outer_right">
          <div className="current_bar_right_bar sideChart_inner_left">
            <div
              style={{
                width: nutrition ? `${getProgress(totalCal, targetCal)}%` : 0,
              }}
              className="cal_progress_bar"
            ></div>
          </div>
          <div className="current_bar_right_text sideChart_inner_right">
            {totalCal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalProgress;
