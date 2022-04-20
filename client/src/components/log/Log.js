import axios from 'axios';
import {
  Add,
  Close,
  InsertChartOutlinedRounded,
  Search,
} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import './log.css';
import Pagination from './Pagination';
import MyFoodItem from './MyFoodItem';
import SearchedFoodItem from './SearchedFoodItem';
// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { setShowSideChart } from '../../redux/buttons/buttonSlice';

const Log = ({
  currentDateTotalNutrition,
  calculatedNutrition,
  handleAddToDb,
  handleDeleteFood,
  showSearch,
  handleSearchDisplay,
}) => {
  const dispatch = useDispatch();
  const { windowWidth } = useSelector((state) => state.window);
  const [nameOfFood, setNameOfFood] = useState('');
  const [searchedFoodArray, setSearchedFoodArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  //posts.slice(0, 10) = 0번 인덱스부터 9번 인덱스까지 잘라서 새로운 배열 반환
  const currentPosts = searchedFoodArray.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const paginate = (number) => {
    setCurrentPage(number);
  };
  // 음식 검색 버튼 핸들러
  const handleSearchButton = async (e) => {
    e.preventDefault();
    if (nameOfFood === '') return;
    setCurrentPage(1);
    const foodData = await axios.post('/api/searchFood/search', {
      nameOfFood,
    });
    if (foodData.data === 'noData')
      return alert('데이터베이스에 없는 음식입니다...');
    setSearchedFoodArray(foodData.data);

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
    if (!showSearch) return setSearchedFoodArray([]);
  }, [showSearch]);

  return (
    <div className="Log">
      <div className="log_wrapper">
        {windowWidth <= 1024 && (
          <div className="sideChart_toggle_button">
            <InsertChartOutlinedRounded
              style={{ fontSize: '3rem', cursor: 'pointer' }}
              onClick={() => dispatch(setShowSideChart(true))}
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
                  onClick={() => handleSearchDisplay(true)}
                  className="log_contents_down_myList_add jcac"
                >
                  <Add style={{ fill: '#068b2e' }} />
                  <span style={{ color: '#068b2e' }}>추가하기</span>
                </div>
                <div className="log_contents_down_myList_totalNutrition jcac">
                  <div>
                    <span>열량</span>
                    <span>
                      <strong>
                        {currentDateTotalNutrition
                          ? currentDateTotalNutrition.cal
                          : 0}
                      </strong>
                    </span>
                  </div>
                  <div>
                    <span>탄수화물</span>
                    <span>
                      {currentDateTotalNutrition
                        ? currentDateTotalNutrition.carb
                        : 0}
                    </span>
                  </div>
                  <div>
                    <span>단백질</span>
                    <span>
                      {currentDateTotalNutrition
                        ? currentDateTotalNutrition.protein
                        : 0}
                    </span>
                  </div>
                  <div>
                    <span>지방</span>
                    <span>
                      {currentDateTotalNutrition
                        ? currentDateTotalNutrition.fat
                        : 0}
                    </span>
                  </div>
                </div>
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
            {showSearch && (
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
                    onClick={() => handleSearchDisplay(false)}
                  />
                </form>
                {/* 검색한 음식 리스트 */}
                {currentPosts.length > 0 && (
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
