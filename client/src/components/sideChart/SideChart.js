import './sideChart.css';
import React, { useState, useEffect } from 'react';
import WeightEditor from './WeightEditor';
import CalEditor from './CalEditor';
import ProgressBars from './ProgressBars';
import PieChart from '../chart/PieChart';
import { Close } from '@material-ui/icons';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import {
  setSideChartEditor,
  setShowSideChart,
} from '../../redux/buttons/buttonSlice';

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
  const [totalNutrion, setTotalNutrion] = useState({});
  const nutritionRatio = {
    carb: 5,
    protein: 3,
    fat: 2,
  };
  // 차트 데이터
  const [chartData, setChartData] = useState(null);

  // 해당 날짜의 하루 총합 영양성분에 희해 localStates 변경
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
          backgroundColor: ['#DC488A', '#473188', '#F8A523'],
          borderColor: 'black',
          borderWidth: 1,
        },
      ],
    });
  }, [nutrition]);

  return (
    <div
      className="SideChart"
      style={{
        position: windowWidth > 1024 ? 'sticky' : 'fixed',
        right: windowWidth > 1024 ? 0 : showSideChart ? 0 : '-100%',
        zIndex: windowWidth > 1024 ? 0 : showSideChart ? 10 : 0,
      }}
    >
      {/* 반응형으로 화면 넓이 1024px 이하일떄 사이드차트 토글버튼 보여줌 */}
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
            현재 체중: <strong>{user.currentWeight}</strong>kg
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
            목표 칼로리: <strong>{user.currentTargetCalories}</strong>kcal
          </div>
          <div className="sideChart_information_container_cal_right">
            <button onClick={() => dispatch(setSideChartEditor('calEditor'))}>
              수정
            </button>
          </div>
        </div>
        <div className="sideChart_information_container_ratio">
          <div className="sideChart_information_container_ratio_left">
            목표 탄단지 비율:{' '}
            <strong>
              {nutritionRatio.carb} : {nutritionRatio.protein} :{' '}
              {nutritionRatio.fat}
            </strong>
          </div>
          <div className="sideChart_information_container_ratio_right">
            {/* <button onClick={() => dispatch(setSideChartEditor('ratioEditor'))}>
              수정
            </button> */}
          </div>
        </div>
      </div>
      {/* 몸무게, 목표 칼로리 수정 버튼 클릭시 나오는 화면들 */}
      {sideChartEdditorHandler.weightEditor && (
        <WeightEditor
          userWeight={userState.weight}
          handleUserStateValue={handleUserStateValue}
          handleWeightChange={handleWeightChange}
        />
      )}
      {sideChartEdditorHandler.calEditor && (
        <CalEditor
          targetCalorie={userState.calories}
          handleUserStateValue={handleUserStateValue}
          handleTargetCalChange={handleTargetCalChange}
        />
      )}
      {/* Bar 그래프 */}
      <ProgressBars
        user={user}
        totalNutrion={totalNutrion}
        nutrition={nutrition}
      />
      {/* 탄단지 비율 그래프 */}
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
