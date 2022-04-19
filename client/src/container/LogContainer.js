import Log from '../components/log/Log';
import { useDispatch } from 'react-redux';
import { applyUser } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

const LogContainer = ({
  user,
  date,
  foodList,
  calculatedNutrition2,
  totalNutrition2,
}) => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);

  // 선택한 음식 삭제
  const handleDeleteFood = async (mealObj) => {
    const objForRequest = {
      username: user.username,
      date,
      mealObj,
    };
    const res = await axios.post('/api/food/delete', objForRequest);
    localStorage.setItem('user', JSON.stringify(res.data));
    dispatch(applyUser(res.data));
  };

  // 검색한 음식 DB에 추가하는 함수
  const handleAddToDb = async (mealObj) => {
    if (mealObj.qtt === '' || mealObj.qtt === 0)
      return alert('용량을 선택해주세요...');
    const objForRequest = {
      username: user.username,
      date,
      mealObj,
    };
    const res = await axios.post('/api/food/add', objForRequest);
    localStorage.setItem('user', JSON.stringify(res.data));
    dispatch(applyUser(res.data));
  };

  // 검색창 트리거 함수
  const handleSearchDisplay = (triger) => {
    if (triger) return setShowSearch(true);
    setShowSearch(false);
  };

  // 검색창 초기화
  useEffect(() => {
    setShowSearch(false);
  }, [user, date, dispatch]);

  return (
    <Log
      user={user}
      foodList={foodList}
      currentDateTotalNutrition={totalNutrition2}
      calculatedNutrition={calculatedNutrition2}
      handleAddToDb={handleAddToDb}
      handleDeleteFood={handleDeleteFood}
      showSearch={showSearch}
      handleSearchDisplay={handleSearchDisplay}
    />
  );
};

export default LogContainer;
