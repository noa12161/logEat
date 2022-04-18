import LogContainer from '../container/LogContainer';
import ChartContainer from '../container/ChartContainer';
import SocialContainer from '../container/SocialContainer';
import { Routes, Route } from 'react-router-dom';
import './page.css';
import Header from '../components/header/Header';
import SideBar from '../components/sidebar/SideBar';
// 리덕스...
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { applyUser } from '../redux/user/userSlice';
import {
  initializeCurrentDateNutrition,
  setCalculatedNutrition,
  setFoodList,
  setTotalNutrition,
} from '../redux/foods/foodSlice';
import {
  getTotalNutrition,
  getSumOfNutrition,
} from '../lib/functions/calculate';
import { initSideChartEditor } from '../redux/buttons/buttonSlice';
import NotFound from './NotFound';
import SideChart from '../components/sideChart/SideChart';
import { changeBodyWeightApi, changeCaloriesApi } from '../lib/api/user';
import { changeToStringFormat } from '../lib/functions/common';

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

  // user 정보가 변할때마다 foodList 갱신...
  useEffect(() => {
    if (user) {
      // date picker로 선택한 날짜와 같은 객체 찾기...
      const foodLists = user.foodData.find((d) => d.date === date)?.meals;
      //없으면..
      if (!foodLists) return dispatch(setFoodList(null));
      //있으면..
      dispatch(setFoodList(foodLists));
      return;
    }
    dispatch(setFoodList(null));
  }, [user, date, dispatch]);

  // currentDateNutrion.calculatedNutriotion
  // 기존 음식데이터의 객체배열을 용량단위, 용량을 기준으로 총 열량,탄수,단백,지방 계산...(객체배열 반환)
  useEffect(() => {
    if (!foodList) {
      dispatch(initializeCurrentDateNutrition());
      return;
    }
    console.log('has foodList');
    const sumOfNutrition = getSumOfNutrition(foodList);
    dispatch(setCalculatedNutrition(sumOfNutrition));
  }, [foodList, dispatch]);

  // currentDateNutrion.totalNutrition
  // 해당 날짜의 총 영양성분을 리덕스에 저장
  useEffect(() => {
    if (currentDateNutrition.calculatedNutrition.length === 0) {
      dispatch(setTotalNutrition(null));
      return;
    }
    const totalNutrition = getTotalNutrition(
      currentDateNutrition.calculatedNutrition,
    );
    dispatch(setTotalNutrition(totalNutrition));
  }, [currentDateNutrition.calculatedNutrition, dispatch]);

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
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <LogContainer
                calculatedNutrition2={currentDateNutrition.calculatedNutrition}
                totalNutrition2={currentDateNutrition.totalNutrition}
              />
            }
          />
          <Route path="/chart" element={<ChartContainer user={user} />} />
          <Route path="/social/*" element={<SocialContainer />} />
          <Route path="/*" element={<NotFound />} />
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
