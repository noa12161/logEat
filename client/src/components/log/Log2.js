import axios from 'axios';
import { Add, Search } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import './log.css';

const Log = ({ foodList }) => {
  const [nameOfFood, setNameOfFood] = useState('');
  const [searchedFoodArray, setSearchedFoodArray] = useState([]);
  const [totalNutririon, setTotalNutririon] = useState({});

  const handleSearchButton = async () => {
    const foodData = await axios.post('/api/searchFood/search', { nameOfFood });
    setSearchedFoodArray(foodData.data);
    console.log(foodData.data);

    setNameOfFood('');
  };

  const handleFoodQtt = (e, foodId) => {
    if (e.target.value.length === 0) {
      const updated = searchedFoodArray.map((food) =>
        food.id === foodId ? { ...food, qtt: 1 } : food,
      );
      setSearchedFoodArray(updated);
      return;
    }
    const updated = searchedFoodArray.map((food) =>
      food.id === foodId ? { ...food, qtt: Number(e.target.value) } : food,
    );
    setSearchedFoodArray(updated);
  };
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

  useEffect(() => {
    if (!foodList)
      return setTotalNutririon({
        cal: 0,
        carb: 0,
        protein: 0,
        fat: 0,
      });
    let cal = 0,
      carb = 0,
      protein = 0,
      fat = 0;
    foodList.forEach((f) => {
      cal += f.cal;
      carb += f.carb;
      protein += f.protein;
      fat += f.fat;
    });
    console.log(cal, carb, protein, fat);
    setTotalNutririon({
      cal,
      carb,
      protein,
      fat,
    });
  }, [foodList]);

  const changeToServSize = (totalWeight, servSizeWeight) => {
    return totalWeight / servSizeWeight;
  };

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
                <div className="log_contents_down_myList_add jcac">
                  <Add />
                  <span>Add</span>
                </div>
                <div className="log_contents_down_myList_totalNutrition jcac">
                  <div>
                    <span>cal</span>
                    <span>{totalNutririon.cal}</span>
                  </div>
                  <div>
                    <span>carb</span>
                    <span>{totalNutririon.carb}</span>
                  </div>
                  <div>
                    <span>protein</span>
                    <span>{totalNutririon.protein}</span>
                  </div>
                  <div>
                    <span>fat</span>
                    <span>{totalNutririon.fat}</span>
                  </div>
                </div>
              </div>
              {/* 먹은 음식 리스트 */}
              <ul className="log_contents_down_myList_foodLists">
                {foodList &&
                  foodList.map((f) => (
                    <li className="log_contents_down_myList_foodList">
                      <div className="log_contents_down_myList_foodList_left">
                        <div className="log_contents_down_myList_foodList_left_name jcac">
                          {f.foodName}
                        </div>
                        <div className="log_contents_down_myList_foodList_left_quantity jcac">
                          {f.unit > 1
                            ? changeToServSize(f.unit * f.qtt)
                            : f.unit * f.qtt}
                        </div>
                      </div>
                      <div className="log_contents_down_myList_foodList_right">
                        <div>
                          {(f.oneServCal / f.servSizeWeight) * f.qtt * f.unit}
                        </div>
                        <div>
                          {(f.oneServCarb / f.servSizeWeight) * f.qtt * f.unit}
                        </div>
                        <div>
                          {(f.oneServProtein / f.servSizeWeight) *
                            f.qtt *
                            f.unit}
                        </div>
                        <div>
                          {(f.oneServFat / f.servSizeWeight) * f.qtt * f.unit}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="log_contents_down_food_search_container">
              {/* 검색 input + 버튼 */}
              <div className="log_contents_down_food_search">
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
              </div>
              {/* 검색한 음식 리스트 */}
              {searchedFoodArray.length > 0 && (
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
                  {searchedFoodArray.map((food) => (
                    <li className="log_contents_down_food_searched_data_list">
                      <div className="food_searched_foodList_left">
                        {/* 음식이름 */}
                        <div className="food_searched_foodList_foodName">
                          {food.foodName}
                        </div>
                        {/* 용량 선택 */}
                        <div className="food_searched_foodList_select_container">
                          {/*qtt 용량*/}
                          <input
                            value={food.qtt}
                            type="text"
                            onChange={(e) => handleFoodQtt(e, food.id)}
                          />
                          {/* unit 용량 단위*/}
                          <select
                            defaultValue="serv"
                            onChange={(e) =>
                              handleFoodUnit(e, food.id, food.oneServingWeight)
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
                            (food.cal / food.oneServingWeight) *
                              food.qtt *
                              food.unit,
                          )}
                        </div>
                        <div>
                          {Math.floor(
                            (food.carb / food.oneServingWeight) *
                              food.qtt *
                              food.unit,
                          )}
                        </div>
                        <div>
                          {Math.floor(
                            (food.protein / food.oneServingWeight) *
                              food.qtt *
                              food.unit,
                          )}
                        </div>
                        <div>
                          {Math.floor(
                            (food.fat / food.oneServingWeight) *
                              food.qtt *
                              food.unit,
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
