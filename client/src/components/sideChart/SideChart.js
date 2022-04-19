import React, { useState } from 'react';
import './sideChart.css';
import { convertToFixedNum } from '../../lib/functions/common';
import { useEffect, useRef, forwardRef } from 'react';
import PieChart from '../chart/PieChart';
import { Close } from '@material-ui/icons';
import { IconButton } from '@mui/material';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import {
  setSideChartEditor,
  setShowSideChart,
} from '../../redux/buttons/buttonSlice';
// date-picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

const SideChart = ({
  user,
  nutrition,
  userState,
  handleUserStateValue,
  handleWeightChange,
  handleTargetCalChange,
  sideChartEdditorHandler,
}) => {
  const dispatch = useDispatch();
  const { windowWidth } = useSelector((state) => state.window);
  const { showSideChart } = useSelector((state) => state.buttons);
  console.log(windowWidth);
  const [nutritionRatio, setNutritionRatio] = useState({
    carb: 5,
    protein: 3,
    fat: 2,
  });
  const [totalNutrion, setTotalNutrion] = useState({});
  // 차트 데이터
  const [chartData, setChartData] = useState(null);

  //date picker
  const dateRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input sideChart_datepicker"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  useEffect(() => {
    if (!nutrition) {
      setTotalNutrion({});
      setChartData(null);
      return;
    }
    setTotalNutrion({
      cal: nutrition.cal,
      carb: nutrition.carb,
      protein: nutrition.protein,
      fat: nutrition.fat,
    });
    setChartData({
      labels: ['탄수화물', '단백질', '지방'],
      datasets: [
        {
          label: '탄단지 비율',
          data: [nutrition.carb, nutrition.protein, nutrition.fat],
          backgroundColor: ['red', 'blue', 'yellow'],
          borderColor: 'black',
          borderWidth: 3,
        },
      ],
    });
  }, [nutrition]);

  // Progress Bar width % 구하는 함수
  const getProgress = (current, target) => {
    return (current / target) * 100 > 100 ? 100 : (current / target) * 100;
  };

  return (
    <div
      className="SideChart"
      style={{
        position: windowWidth > 1024 ? 'sticky' : 'fixed',
        right: windowWidth > 1024 ? 0 : showSideChart ? 0 : '-100%',
        zIndex: windowWidth > 1024 ? 0 : showSideChart ? 10 : 0,
      }}
    >
      {windowWidth <= 1024 && showSideChart && (
        <div className="sideChart_close_button_container">
          <Close
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={() => dispatch(setShowSideChart(false))}
          />
        </div>
      )}
      {/* 정보 입력 + 수정란 */}
      <div className="sideChart_information_container">
        <div className="sideChart_information_container_weight">
          <div className="sideChart_information_container_weight_left">
            현재 체중: {user.currentWeight}kg
          </div>
          <div className="sideChart_information_container_weight_right">
            <button
              onClick={() => dispatch(setSideChartEditor('weightEditor'))}
            >
              수정
            </button>
          </div>
        </div>
        <div className="sideChart_information_container_cal">
          <div className="sideChart_information_container_cal_left">
            목표 칼로리: {user.currentTargetCalories}kcal
          </div>
          <div className="sideChart_information_container_cal_right">
            <button onClick={() => dispatch(setSideChartEditor('calEditor'))}>
              수정
            </button>
          </div>
        </div>
        <div className="sideChart_information_container_ratio">
          <div className="sideChart_information_container_ratio_left">
            목표 탄단지 비율: {nutritionRatio.carb} : {nutritionRatio.protein} :{' '}
            {nutritionRatio.fat}
          </div>
          <div className="sideChart_information_container_ratio_right">
            <button onClick={() => dispatch(setSideChartEditor('ratioEditor'))}>
              수정
            </button>
          </div>
        </div>
      </div>
      {sideChartEdditorHandler.weightEditor && (
        <div className="edditor">
          <div className="edditor_contents_container">
            <div className="editor_contents">
              <button
                className="editor_button"
                onClick={() => dispatch(setSideChartEditor('weightEditor'))}
              >
                <Close />
              </button>
              <span>날짜 선택</span>
              <div className="datepicker_container">
                <DatePicker
                  locale={ko} // 한글로 변경
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={<ExampleCustomInput ref={dateRef} />}
                />
              </div>
              <span>변화된 체중!!!</span>
              <form>
                <div className="editor_input_container">
                  <input
                    name="weight"
                    value={userState.weight}
                    onChange={handleUserStateValue}
                    type="number"
                  />
                  kg
                </div>
                <button
                  onClick={(e) =>
                    handleWeightChange(e, userState.weight, startDate)
                  }
                >
                  확인
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {sideChartEdditorHandler.calEditor && (
        <div className="edditor">
          <div className="edditor_contents_container">
            <div className="editor_contents">
              <button
                className="editor_button"
                onClick={() => dispatch(setSideChartEditor('calEditor'))}
              >
                <Close />
              </button>
              <span>목표 칼로리</span>
              <form>
                <input
                  name="calories"
                  value={userState.calories}
                  onChange={handleUserStateValue}
                  type="number"
                />
                <button
                  onClick={(e) => handleTargetCalChange(e, userState.calories)}
                >
                  확인
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {sideChartEdditorHandler.ratioEditor && (
        <div className="edditor">
          <div className="edditor_contents_container">
            <div className="editor_contents">
              <button
                className="editor_button"
                onClick={() => dispatch(setSideChartEditor('ratioEditor'))}
              >
                <Close />
              </button>
              <span>목표 탄단지 비율</span>
              <form>
                <input type="text" />
                <button>확인</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* <div className="edditor"></div>  */}
      {/* 칼로리 */}
      <div className="sideChart_Cal_container">
        <div className="target_bar_container">
          <div className="target_bar_left sideChart_outer_left">
            목표 칼로리
          </div>
          <div className="target_bar_right sideChart_outer_right">
            <div className="target_bar_right_bar_container sideChart_inner_left">
              <div className="progress_bar"></div>
            </div>
            <div className="target_bar_right_text sideChart_inner_right">
              {user.currentTargetCalories}
            </div>
          </div>
        </div>
        <div className="current_bar_container">
          <div className="current_bar_left sideChart_outer_left">
            섭취 칼로리
          </div>
          <div className="current_bar_right sideChart_outer_right">
            <div className="current_bar_right_bar sideChart_inner_left">
              <div
                style={{
                  width: nutrition
                    ? `${getProgress(
                        totalNutrion.cal,
                        user.currentTargetCalories,
                      )}%`
                    : 0,
                }}
                className="cal_progress_bar"
              ></div>
            </div>
            <div className="current_bar_right_text sideChart_inner_right">
              {totalNutrion.cal}
            </div>
          </div>
        </div>
      </div>
      {/* 탄수화물 */}
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
              {convertToFixedNum(
                (user.currentTargetCalories * (nutritionRatio.carb * 0.1)) / 4,
              )}
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
                        totalNutrion.carb,
                        convertToFixedNum(
                          (user.currentTargetCalories *
                            (nutritionRatio.carb * 0.1)) /
                            4,
                        ),
                      )}%`
                    : 0,
                }}
                className="cal_progress_bar"
              ></div>
            </div>
            <div className="current_bar_right_text sideChart_inner_right">
              {totalNutrion.carb}
            </div>
          </div>
        </div>
      </div>
      {/* 단백질 */}
      <div className="sideChart_Cal_container">
        <div className="target_bar_container">
          <div className="target_bar_left sideChart_outer_left">
            목표 단백질
          </div>
          <div className="target_bar_right sideChart_outer_right">
            <div className="target_bar_right_bar_container sideChart_inner_left">
              <div className="progress_bar"></div>
            </div>
            <div className="target_bar_right_text sideChart_inner_right">
              {convertToFixedNum(
                (user.currentTargetCalories * (nutritionRatio.protein * 0.1)) /
                  4,
              )}
            </div>
          </div>
        </div>
        <div className="current_bar_container">
          <div className="current_bar_left sideChart_outer_left">
            섭취 단백질
          </div>
          <div className="current_bar_right sideChart_outer_right">
            <div className="current_bar_right_bar sideChart_inner_left">
              <div
                style={{
                  width: nutrition
                    ? `${getProgress(
                        totalNutrion.protein,
                        convertToFixedNum(
                          (user.currentTargetCalories *
                            (nutritionRatio.protein * 0.1)) /
                            4,
                        ),
                      )}%`
                    : 0,
                }}
                className="cal_progress_bar"
              ></div>
            </div>
            <div className="current_bar_right_text sideChart_inner_right">
              {totalNutrion.protein}
            </div>
          </div>
        </div>
      </div>
      {/* 지방 */}
      <div className="sideChart_Cal_container">
        <div className="target_bar_container">
          <div className="target_bar_left sideChart_outer_left">목표 지방</div>
          <div className="target_bar_right sideChart_outer_right">
            <div className="target_bar_right_bar_container sideChart_inner_left">
              <div className="progress_bar"></div>
            </div>
            <div className="target_bar_right_text sideChart_inner_right">
              {convertToFixedNum(
                (user.currentTargetCalories * (nutritionRatio.fat * 0.1)) / 8,
              )}
            </div>
          </div>
        </div>
        <div className="current_bar_container">
          <div className="current_bar_left sideChart_outer_left">섭취 지방</div>
          <div className="current_bar_right sideChart_outer_right">
            <div className="current_bar_right_bar sideChart_inner_left">
              <div
                style={{
                  width: nutrition
                    ? `${getProgress(
                        totalNutrion.fat,
                        convertToFixedNum(
                          (user.currentTargetCalories *
                            (nutritionRatio.fat * 0.1)) /
                            8,
                        ),
                      )}%`
                    : 0,
                }}
                className="cal_progress_bar"
              ></div>
            </div>
            <div className="current_bar_right_text sideChart_inner_right">
              {totalNutrion.fat}
            </div>
          </div>
        </div>
      </div>
      {/* 탄단지 비율 */}
      {chartData && (
        <div className="sideChart_nutrition_ratio_container jcac">
          <div className="jcac" style={{ width: '70%' }}>
            <PieChart chartData={chartData ? chartData : null} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideChart;
