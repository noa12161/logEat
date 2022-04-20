import { Add } from '@material-ui/icons';

const SearchedFoodItem = ({
  food,
  handleAddToDb,
  handleFoodQtt,
  handleFoodUnit,
}) => {
  return (
    <li className="log_contents_down_food_searched_data_list">
      <div className="food_searched_foodList_left">
        {/* 음식이름 */}
        <div className="food_searched_foodList_foodName">
          <div className="food_searched_foodList_foodName_add jcac">
            <Add
              onClick={() => handleAddToDb(food)}
              style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                marginRight: '5px',
                fill: '#068b2e',
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
            onChange={(e) => handleFoodUnit(e, food.id, food.servSizeWeight)}
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
            (food.oneServCal / food.servSizeWeight) * food.qtt * food.unit,
          )}
        </div>
        <div>
          {Math.floor(
            (food.oneServCarb / food.servSizeWeight) * food.qtt * food.unit,
          )}
        </div>
        <div>
          {Math.floor(
            (food.oneServProtein / food.servSizeWeight) * food.qtt * food.unit,
          )}
        </div>
        <div>
          {Math.floor(
            (food.oneServFat / food.servSizeWeight) * food.qtt * food.unit,
          )}
        </div>
      </div>
    </li>
  );
};

export default SearchedFoodItem;
