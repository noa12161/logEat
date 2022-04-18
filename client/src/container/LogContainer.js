import Log from '../components/log/Log';
import { useSelector, useDispatch } from 'react-redux';
import { applyUser } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../config';

const LogContainer = ({ calculatedNutrition2, totalNutrition2 }) => {
  const dispatch = useDispatch();
  const { user, date, foodList } = useSelector((state) => {
    return {
      user: state.user.user,
      date: state.user.date,
      foodList: state.food.foodList,
    };
  });

  const [showSearch, setShowSearch] = useState(false);

  // 검색한 음식 DB에 추가하는 함수
  const handleAddToDb = async (mealObj) => {
    if (mealObj.qtt === '') return alert('용량을 선택해주세요...');
    const objForRequest = {
      username: user.username,
      date,
      mealObj,
    };
    const res = await axiosInstance.post('/food/add', objForRequest);
    localStorage.setItem('user', JSON.stringify(res.data));
    dispatch(applyUser(res.data));
  };

  // 선택한 음식 삭제
  const handleDeleteFood = async (mealObj) => {
    const objForRequest = {
      username: user.username,
      date,
      mealObj,
    };
    const res = await axiosInstance.post('/food/delete', objForRequest);
    localStorage.setItem('user', JSON.stringify(res.data));
    dispatch(applyUser(res.data));
  };

  // 검색창 트리거 함수
  const handleSearchDisplay = (triger) => {
    if (triger) return setShowSearch(true);
    setShowSearch(false);
  };

  // 로그인 유저의 음식데이터만 추출후 리덕스에 저장. (객체배열 형태 or null)
  useEffect(() => {
    setShowSearch(false);
  }, [user, date, dispatch]);

  return (
    <Log
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
