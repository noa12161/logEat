import './log.css';
import { InsertChartOutlinedRounded } from '@material-ui/icons';
// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { setShowSideChart } from '../../redux/buttons/buttonSlice';
// 컴포넌트
import MyFoodListContainer from '../../container/log/MyFoodListContainer';
import FoodSearchContainer from '../../container/log/FoodSearchContainer';

const Log = ({
  user,
  date,
  currentDateTotalNutrition,
  calculatedNutrition,
}) => {
  const dispatch = useDispatch();
  const { windowWidth } = useSelector((state) => state.window);
  const { showSearchFood } = useSelector((state) => state.buttons);
  const { searchedFood } = useSelector((state) => state.food);

  // 사이드 차트 토글 버튼
  const handleSideChartToggle = (bool) => {
    if (!user) return alert('로그인이 필요합니다.');
    dispatch(setShowSideChart(bool));
  };

  return (
    <div className="Log">
      <div className="log_wrapper">
        {windowWidth <= 1024 && (
          <div className="sideChart_toggle_button">
            <InsertChartOutlinedRounded
              style={{ fontSize: '3rem', cursor: 'pointer' }}
              onClick={() => handleSideChartToggle(true)}
            />
          </div>
        )}
        <div className="log_contents_container">
          {/* <div className="log_contents_upper jcac">개발중....</div> */}
          {/* 실제 컨텐츠 영역 */}
          <div className="log_contents_down">
            <MyFoodListContainer
              user={user}
              date={date}
              currentDateTotalNutrition={currentDateTotalNutrition}
              calculatedNutrition={calculatedNutrition}
            />
            {/* 검색창 영역 */}
            {showSearchFood && (
              <FoodSearchContainer
                searchedFood={searchedFood}
                user={user}
                date={date}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
