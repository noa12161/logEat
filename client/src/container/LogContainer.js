import Log from '../components/log/Log';
import { useDispatch } from 'react-redux';
import { applyUser } from '../redux/user/userSlice';
import { useEffect } from 'react';
import { setShowSearchFood } from '../redux/buttons/buttonSlice';
import { addFoodToDbApi, deleteFoodApi } from '../lib/api/food';

const LogContainer = ({
  user,
  date,
  foodList,
  calculatedNutrition2,
  totalNutrition2,
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

  // 검색한 음식 DB에 추가하는 함수
  const handleAddToDb = async (mealObj) => {
    if (!user) return alert('로그인이 필요합니다.');
    if (mealObj.qtt === '' || mealObj.qtt === 0)
      return alert('용량을 선택해주세요...');
    const objForRequest = {
      username: user.username,
      date,
      mealObj,
    };
    const res = await addFoodToDbApi(objForRequest);
    localStorage.setItem('user', JSON.stringify(res.data));
    dispatch(applyUser(res.data));
  };

  // 검색창 초기화
  useEffect(() => {
    dispatch(setShowSearchFood(false));
    // setShowSearch(false);
  }, [user, date, dispatch]);

  return (
    <Log
      user={user}
      foodList={foodList}
      currentDateTotalNutrition={totalNutrition2}
      calculatedNutrition={calculatedNutrition2}
      handleAddToDb={handleAddToDb}
      handleDeleteFood={handleDeleteFood}
    />
  );
};

export default LogContainer;
