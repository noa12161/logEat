import './log.css';
import Pagination from './Pagination';
import SearchedFoodItem from './SearchedFoodItem';

const SearchedFoodList = ({
  currentPosts,
  handleAddToDb,
  handleFoodQtt,
  handleFoodUnit,
  localSearchedFood,
  itemsPerPage,
  paginate,
  currentPage,
}) => {
  return (
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
        countOfItems={localSearchedFood.length}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </ul>
  );
};

export default SearchedFoodList;
