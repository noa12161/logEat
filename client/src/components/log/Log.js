import axios from 'axios';
import { axiosInstance } from '../../config';
import { Add, Close, DeleteOutline, Search } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import './log.css';
import Pagination from './Pagination';

const Log = ({
  currentDateTotalNutrition,
  calculatedNutrition,
  handleAddToDb,
  handleDeleteFood,
  showSearch,
  handleSearchDisplay,
}) => {
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
    const foodData = await axiosInstance.post('/searchFood/search', {
      nameOfFood,
    });
    if (foodData.data === 'noData')
      return alert('데이터베이스에 없는 음식입니다...');
    setSearchedFoodArray(foodData.data);
    console.log(foodData.data);

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
        <div className="log_contents_container">
          <div className="log_contents_upper jcac">
            What shoud i feel this container with
          </div>
          {/* 실제 컨텐츠 영역 */}
          <div className="log_contents_down">
            <div className="log_contents_down_myList">
              {/* 추가버튼 + 총 영양성분 */}
              <div className="log_contents_down_myList_addandTotal">
                <div
                  onClick={() => handleSearchDisplay(true)}
                  className="log_contents_down_myList_add jcac"
                >
                  <Add />
                  <span>Add</span>
                </div>
                <div className="log_contents_down_myList_totalNutrition jcac">
                  <div>
                    <span>cal</span>
                    <span>
                      {currentDateTotalNutrition
                        ? currentDateTotalNutrition.cal
                        : 0}
                    </span>
                  </div>
                  <div>
                    <span>carb</span>
                    <span>
                      {currentDateTotalNutrition
                        ? currentDateTotalNutrition.carb
                        : 0}
                    </span>
                  </div>
                  <div>
                    <span>protein</span>
                    <span>
                      {currentDateTotalNutrition
                        ? currentDateTotalNutrition.protein
                        : 0}
                    </span>
                  </div>
                  <div>
                    <span>fat</span>
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
                    <li key={i} className="log_contents_down_myList_foodList">
                      <div className="log_contents_down_myList_foodList_left">
                        <div className="log_contents_down_myList_foodList_left_name jcac">
                          <DeleteOutline
                            onClick={() => handleDeleteFood(f)}
                            style={{
                              width: '1rem',
                              cursor: 'pointer',
                              marginRight: '5px',
                            }}
                          />
                          {f.foodName}
                        </div>
                        <div className="log_contents_down_myList_foodList_left_quantity jcac">
                          {f.unit === f.servSizeWeight ? (
                            <div>
                              <div>
                                {(f.unit / f.servSizeWeight) * f.qtt} serv
                              </div>
                              <div>{f.unit * f.qtt} g</div>
                            </div>
                          ) : (
                            f.unit * f.qtt + 'g'
                          )}
                        </div>
                      </div>
                      <div className="log_contents_down_myList_foodList_right">
                        <div>{f.cal}</div>
                        <div>{f.carb}</div>
                        <div>{f.protein}</div>
                        <div>{f.fat}</div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
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
                        <div>cal</div>
                        <div>carb</div>
                        <div>protein</div>
                        <div>fat</div>
                      </div>
                    </div>
                    {/* 검색된 음식 정보 */}
                    {currentPosts.map((food, i) => (
                      <li
                        key={i}
                        className="log_contents_down_food_searched_data_list"
                      >
                        <div className="food_searched_foodList_left">
                          {/* 음식이름 */}
                          <div className="food_searched_foodList_foodName">
                            <div className="food_searched_foodList_foodName_add jcac">
                              <Add
                                onClick={() => handleAddToDb(food)}
                                style={{
                                  width: '1rem',
                                  cursor: 'pointer',
                                  marginRight: '5px',
                                }}
                              />
                            </div>
                            <div className="food_searched_foodList_foodName_name jcac">
                              {food.foodName}
                            </div>
                            <div className="food_searched_foodList_foodName_servWeight jcac">
                              (1serv:{food.servSizeWeight}g)
                            </div>
                          </div>
                          {/* 용량 선택 */}
                          <div className="food_searched_foodList_select_container jcac">
                            {/*qtt 용량*/}
                            <input
                              value={food.qtt}
                              type="number"
                              onChange={(e) => handleFoodQtt(e, food.id)}
                            />
                            {/* unit 용량 단위*/}
                            <select
                              defaultValue="serv"
                              onChange={(e) =>
                                handleFoodUnit(e, food.id, food.servSizeWeight)
                              }
                            >
                              <option value="serv">serv</option>
                              <option value="g">g</option>
                            </select>
                          </div>
                        </div>
                        {/* 음식 영양성분 */}
                        <div className="food_searched_foodList_right">
                          <div>
                            {Math.floor(
                              (food.oneServCal / food.servSizeWeight) *
                                food.qtt *
                                food.unit,
                            )}
                          </div>
                          <div>
                            {Math.floor(
                              (food.oneServCarb / food.servSizeWeight) *
                                food.qtt *
                                food.unit,
                            )}
                          </div>
                          <div>
                            {Math.floor(
                              (food.oneServProtein / food.servSizeWeight) *
                                food.qtt *
                                food.unit,
                            )}
                          </div>
                          <div>
                            {Math.floor(
                              (food.oneServFat / food.servSizeWeight) *
                                food.qtt *
                                food.unit,
                            )}
                          </div>
                        </div>
                      </li>
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
