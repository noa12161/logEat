import './log.css';
import {
  Add,
  Close,
  InsertChartOutlinedRounded,
  Search,
} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
// 컴포넌트
import Pagination from './Pagination';
import MyFoodItem from './MyFoodItem';
import SearchedFoodItem from './SearchedFoodItem';
// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import {
  setShowSearchFood,
  setShowSideChart,
} from '../../redux/buttons/buttonSlice';
import { searchFood } from '../../redux/foods/foodSlice';
import MyTotalNtr from './MyTotalNtr';

const Log = ({
  user,
  currentDateTotalNutrition,
  calculatedNutrition,
  handleAddToDb,
  handleDeleteFood,
}) => {
  const dispatch = useDispatch();
  const { windowWidth } = useSelector((state) => state.window);
  const { showSearchFood } = useSelector((state) => state.buttons);
  const { searchedFood } = useSelector((state) => state.food);

  const [nameOfFood, setNameOfFood] = useState('');
  const [searchedFoodArray, setSearchedFoodArray] = useState([]);

  //FOR PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  //posts.slice(0, 10) = 0번 인덱스부터 9번 인덱스까지 잘라서 새로운 배열 반환
  const currentPosts = searchedFoodArray.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  useEffect(() => {
    if (searchedFood.data === null) {
      return setSearchedFoodArray([]);
    }
    setSearchedFoodArray(searchedFood.data);
  }, [searchedFood.data]);

  // 음식 검색 버튼 핸들러
  const handleSearchButton = async (e) => {
    e.preventDefault();
    if (nameOfFood === '') return;
    setCurrentPage(1);
    dispatch(searchFood(nameOfFood));
    setNameOfFood('');
  };

  // 음식 용량 핸들러
  const handleFoodQtt = (e, foodId) => {
    if (isNaN(e.target.value)) return alert('숫자를 입력해주세요...');
    const updated = searchedFoodArray.map((food) =>
      food.id === foodId
        ? { ...food, qtt: e.target.value === '' ? '' : Number(e.target.value) }
        : food,
    );
    console.log(searchedFoodArray);
    setSearchedFoodArray(updated);
  };
  // 음식 용량 단위( 1serv or g) 핸들러
  const handleFoodUnit = (e, foodId, oneServingWeight) => {
    let selectUnit = e.target.value;
    if (selectUnit === 'g') {
      selectUnit = 1;
    } else {
      selectUnit = oneServingWeight;
    }
    const updated = searchedFoodArray.map((food) =>
      food.id === foodId ? { ...food, unit: selectUnit } : food,
    );
    setSearchedFoodArray(updated);
  };

  // 검색창 닫을시 검색했던 데이터 초기화
  useEffect(() => {
    if (!showSearchFood) return setSearchedFoodArray([]);
  }, [showSearchFood]);

  // 사이드 차트 토글 버튼
  const handleSideChartToggle = (bool) => {
    if (!user) return alert('로그인이 필요합니다.');
    dispatch(setShowSideChart(bool));
  };

  // 검색결과 페이지 핸들러
  const paginate = (number) => {
    setCurrentPage(number);
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
          <div className="log_contents_upper jcac">개발중....</div>
          {/* 실제 컨텐츠 영역 */}
          <div className="log_contents_down">
            <div className="log_contents_down_myList">
              {/* 추가버튼 + 총 영양성분 */}
              <div className="log_contents_down_myList_addandTotal">
                <div
                  onClick={() => dispatch(setShowSearchFood(true))}
                  className="log_contents_down_myList_add jcac"
                >
                  <Add style={{ fill: '#068b2e' }} />
                  <span style={{ color: '#068b2e' }}>추가하기</span>
                </div>
                {/* 먹은 음식 영양성분 총합 */}
                <MyTotalNtr
                  currentDateTotalNutrition={currentDateTotalNutrition}
                />
              </div>
              {/* 먹은 음식 리스트 */}
              <ul className="log_contents_down_myList_foodLists">
                {calculatedNutrition &&
                  calculatedNutrition.map((f, i) => (
                    <MyFoodItem
                      key={i}
                      i={i}
                      f={f}
                      handleDeleteFood={handleDeleteFood}
                    />
                  ))}
              </ul>
            </div>
            {/* 검색창 영역 */}
            {showSearchFood && (
              <div className="log_contents_down_food_search_container">
                {/* 검색 input + 버튼 */}
                <form className="log_contents_down_food_search">
                  <input
                    value={nameOfFood}
                    type="text"
                    placeholder="음식검색..."
                    className="jcac"
                    onChange={(e) => setNameOfFood(e.target.value)}
                  />
                  <button className="jcac" onClick={handleSearchButton}>
                    <Search />
                  </button>
                  <Close
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: currentPosts.length > 0 ? '10px' : '-29px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setNameOfFood('');
                      dispatch(setShowSearchFood(false));
                    }}
                  />
                </form>
                {/* 검색한 음식 리스트 */}
                {currentPosts.length > 0 && !searchedFood.isLoading ? (
                  <ul className="log_contents_down_food_searched_data_lists">
                    {/* 영양성분 안내칸 */}
                    <div className="food_searched_foodList_information">
                      <div className="food_searched_foodList_information_left"></div>
                      <div className="food_searched_foodList_information_right">
                        <div>열량</div>
                        <div>탄수화물</div>
                        <div>단백질</div>
                        <div>지방</div>
                      </div>
                    </div>
                    {/* 검색된 음식 정보 */}
                    {currentPosts.map((food, i) => (
                      <SearchedFoodItem
                        key={i}
                        food={food}
                        handleAddToDb={handleAddToDb}
                        handleFoodQtt={handleFoodQtt}
                        handleFoodUnit={handleFoodUnit}
                      />
                    ))}
                    <Pagination
                      countOfItems={searchedFoodArray.length}
                      itemsPerPage={itemsPerPage}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </ul>
                ) : !searchedFood.isLoading ? (
                  <div></div>
                ) : (
                  <div>loading...</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
