import './page.css';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import LogContainer from '../container/LogContainer';
import SideChart from '../components/sideChart/SideChart';
import ChartContainer from '../container/ChartContainer';
import NotFound from './NotFound';

import { Routes, Route } from 'react-router-dom';
// 함수들...
import { changeToStringFormat } from '../lib/functions/common';
import { changeBodyWeightApi, changeCaloriesApi } from '../lib/api/user';
// 리덕스...
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { applyUser } from '../redux/user/userSlice';
import { initSideChartEditor } from '../redux/buttons/buttonSlice';
import PostPage from './posts/PostPage';

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    user,
    date,
    foodList,
    currentDateNutrition,
    sideChartEdditorHandler,
  } = useSelector(({ user, food, buttons }) => {
    return {
      user: user.user,
      date: user.date,
      foodList: food.foodList,
      currentDateNutrition: food.currentDateNutrition,
      sideChartEdditorHandler: buttons.sideChartEdditorHandler,
    };
  });

  const [userState, setUserState] = useState({
    weight: '',
    calories: '',
    ratio: {},
  });

  // 사용자 정보 editor value 변경 함수
  const handleUserStateValue = (e) => {
    // if (isNaN(e.target.value)) return alert('숫자를 입력해주세요...');

    setUserState({
      ...userState,
      [e.target.name]: e.target.value === '' ? '' : Number(e.target.value),
    });
  };

  // 현재 몸무게 변화 함수...
  const handleWeightChange = async (e, weight, date) => {
    e.preventDefault();
    if (weight === '') return alert('빈칸은 입력할수 없습니다...');
    if (isNaN(weight)) return alert('숫자를 입력해주세요...');

    const res = await changeBodyWeightApi(
      user.username,
      weight,
      changeToStringFormat(date),
    );
    const updatedUser = res.data;

    localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch(applyUser(updatedUser));
    dispatch(initSideChartEditor());

    setUserState({
      weight: '',
      calories: '',
      ratio: {},
    });
  };
  // 목표 칼로리 변화 함수...
  const handleTargetCalChange = async (e, calories) => {
    e.preventDefault();
    if (calories === '') return alert('빈칸은 입력할수 없습니다...');
    if (isNaN(calories)) return alert('숫자를 입력해주세요...');

    const res = await changeCaloriesApi(user.username, calories);
    const updatedUser = res.data;

    localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch(applyUser(updatedUser));

    dispatch(initSideChartEditor());

    setUserState({
      weight: '',
      calories: '',
      ratio: {},
    });
  };

  return (
    <div className="HomePage">
      <SideBar />
      <div className="ContentsContainer">
        <Header user={user} />
        <Routes>
          {/* 주요 기능 실행 컴포넌트...(음식 검색, 음식 기록 등등...) */}
          <Route
            index
            element={
              <LogContainer
                user={user}
                date={date}
                foodList={foodList}
                calculatedNutrition2={currentDateNutrition.calculatedNutrition}
                totalNutrition2={currentDateNutrition.totalNutrition}
              />
            }
          />
          <Route path="chart" element={<ChartContainer user={user} />} />
          <Route path="posts/*" element={<PostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {user && (
        <SideChart
          user={user}
          nutrition={currentDateNutrition.totalNutrition}
          userState={userState}
          handleUserStateValue={handleUserStateValue}
          handleWeightChange={handleWeightChange}
          handleTargetCalChange={handleTargetCalChange}
          sideChartEdditorHandler={sideChartEdditorHandler}
        />
      )}
    </div>
  );
};

export default HomePage;
