import '../../components/log/log.css';
import AddAndTotal from '../../components/log/AddAndTotal';
import MyFoodList from '../../components/log/MyFoodList';
import { deleteFoodApi } from '../../lib/api/food';
import { useDispatch } from 'react-redux';
import { applyUser } from '../../redux/user/userSlice';
import { setShowSearchFood } from '../../redux/buttons/buttonSlice';

const MyFoodListContainer = ({
  user,
  date,
  currentDateTotalNutrition,
  calculatedNutrition,
}) => {
  const dispatch = useDispatch();

  // 선택한 음식 삭제
  const handleDeleteFood = async (mealObj) => {
    const objForRequest = {
      username: user.username,
      date,
      mealObj,
    };
    const res = await deleteFoodApi(objForRequest);
    localStorage.setItem('user', JSON.stringify(res.data));
    dispatch(applyUser(res.data));
  };
  // 검색창 토글버튼
  const onClickSearchBtn = () => {
    dispatch(setShowSearchFood(true));
  };
  return (
    <div className="log_contents_down_myList">
      <AddAndTotal
        currentDateTotalNutrition={currentDateTotalNutrition}
        onClickSearchBtn={onClickSearchBtn}
      />
      <MyFoodList
        calculatedNutrition={calculatedNutrition}
        handleDeleteFood={handleDeleteFood}
      />
    </div>
  );
};

export default MyFoodListContainer;
