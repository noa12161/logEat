import './sideChart.css';

import React from 'react';
import { convertToFixedNum } from '../../lib/functions/common';

const CarbProgress = ({
  targetCal,
  targetRatioCarb,
  getProgress,
  nutrition,
  totalCarb,
}) => {
  return (
    <div className="sideChart_Cal_container">
      <div className="target_bar_container">
        <div className="target_bar_left sideChart_outer_left">
          목표 탄수화물
        </div>
        <div className="target_bar_right sideChart_outer_right">
          <div className="target_bar_right_bar_container sideChart_inner_left">
            <div className="progress_bar"></div>
          </div>
          <div className="target_bar_right_text sideChart_inner_right">
            {convertToFixedNum((targetCal * (targetRatioCarb * 0.1)) / 4)}
          </div>
        </div>
      </div>
      <div className="current_bar_container">
        <div className="current_bar_left sideChart_outer_left">
          섭취 탄수화물
        </div>
        <div className="current_bar_right sideChart_outer_right">
          <div className="current_bar_right_bar sideChart_inner_left">
            <div
              style={{
                width: nutrition
                  ? `${getProgress(
                      totalCarb,
                      convertToFixedNum(
                        (targetCal * (targetRatioCarb * 0.1)) / 4,
                      ),
                    )}%`
                  : 0,
              }}
              className="cal_progress_bar"
            ></div>
          </div>
          <div className="current_bar_right_text sideChart_inner_right">
            {totalCarb}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbProgress;
