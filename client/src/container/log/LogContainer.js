import Log from '../../components/log/Log';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setShowSearchFood } from '../../redux/buttons/buttonSlice';
import { clearSearchedFood } from '../../redux/foods/foodSlice';

const LogContainer = ({
  user,
  date,
  foodList,
  calculatedNutrition2,
  totalNutrition2,
}) => {
  const dispatch = useDispatch();

  // 검색창 초기화
  useEffect(() => {
    dispatch(setShowSearchFood(false));
    if (!user) dispatch(clearSearchedFood());
  }, [user, date, dispatch]);

  return (
    <Log
      user={user}
      date={date}
      foodList={foodList}
      currentDateTotalNutrition={totalNutrition2}
      calculatedNutrition={calculatedNutrition2}
    />
  );
};

export default LogContainer;
