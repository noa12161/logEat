import './header.css';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import axios from 'axios';
import { configDaysinMonth } from '../../lib/functions/dateFunctions';

// date-picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { Link } from 'react-router-dom';
// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { logout, changeDate, setPrevUser } from '../../redux/user/userSlice';
import {
  initializeFoodSlice,
  fnMonthCalIntake,
  initializeCurrentDateNutrition,
  setCalculatedNutrition,
  setFoodList,
  setTotalNutrition,
} from '../../redux/foods/foodSlice';
import {
  getTotalNutrition,
  getSumOfNutrition,
} from '../../lib/functions/calculate';

const Header = ({ user }) => {
  const dispatch = useDispatch();
  const { monthCaloriesIntake } = useSelector((state) => state.food);
  const { prevUser } = useSelector((state) => state.user);
  const { date, foodList, currentDateNutrition } = useSelector(
    ({ user, food }) => {
      return {
        date: user.date,
        foodList: food.foodList,
        currentDateNutrition: food.currentDateNutrition,
      };
    },
  );

  //date picker
  const dateRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  // 로그아웃 함수
  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    dispatch(logout());
    dispatch(initializeFoodSlice());
    localStorage.removeItem('user');
  };

  // 로그인 했을시 오늘 날짜 설정
  useEffect(() => {
    if (!user) return;
    dispatch(changeDate(startDate.toLocaleDateString()));
  }, [dispatch, startDate, user]);

  // user 정보가 변할때마다 foodList 갱신...
  useEffect(() => {
    if (!date) return;
    if (!user) return dispatch(setFoodList(null));

    // date picker로 선택한 날짜와 같은 객체 찾기...
    const foodLists = user.foodData.find((d) => d.date === date)?.meals;
    //없으면..
    if (!foodLists) return dispatch(setFoodList(null));
    //있으면..
    dispatch(setFoodList(foodLists));
  }, [user, date, dispatch]);

  // currentDateNutrion.calculatedNutriotion 구하기
  // 기존 음식데이터의 객체배열을 용량단위, 용량을 기준으로
  // 총 열량,탄수,단백,지방 계산...(객체배열 반환)
  useEffect(() => {
    if (!foodList) {
      dispatch(initializeCurrentDateNutrition());
      return;
    }
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

  // 첫 렌더링시 prevUser 설정
  useEffect(() => {
    if (!user) return;
    dispatch(setPrevUser(user));
  }, []);

  useEffect(() => {
    // !user || logout 하면..
    if (!user) return dispatch(initializeFoodSlice());
    if (monthCaloriesIntake.isFetching && user === prevUser) return;
    // 선택한 날짜의 해당 month 날짜별 열량 구하기..
    const fn = async () => {
      // 같은달을 이미 계산 했고..
      // user의 정보가 변경되지 않았다면..return
      // eg) 유저가 음식을 추가하면 다시 계산함... month 단위가 변하면 다시 계산...
      if (
        startDate.getMonth() + 1 === monthCaloriesIntake.currentMonth &&
        user === prevUser
      )
        return;
      const formForMonthCalories = {
        daysInMonth: configDaysinMonth(startDate),
        fullDate: startDate,
        user,
        currentMonth: startDate.getMonth() + 1,
      };
      dispatch(fnMonthCalIntake(formForMonthCalories));
    };
    fn();
  }, [
    startDate,
    dispatch,
    monthCaloriesIntake.currentMonth,
    user,
    prevUser,
    monthCaloriesIntake.isFetching,
  ]);

  return (
    <div className="Header">
      <div></div>
      <div className="header_datepicker_container jcac">
        <div className="calander jcac">
          날짜 선택
          {/* <BsCalendar3Event /> */}
        </div>
        <div className="calander_text jcac">
          <DatePicker
            locale={ko} // 한글로 변경
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput ref={dateRef} />}
          />
        </div>
      </div>
      {user ? (
        <div className="header_user_info_container">
          <div className="username">
            <span className="username_greeting">Hello</span>{' '}
            <span style={{ marginLeft: '7px', fontWeight: 'bold' }}>
              {user.username}
            </span>
          </div>
          <div className="login">
            <div
              className="login_button_style"
              style={{ cursor: 'pointer' }}
              onClick={handleLogout}
            >
              로그아웃
            </div>
          </div>
        </div>
      ) : (
        <div className="header_user_info_container">
          <div className="username">
            <div className="login_login login_button_style">
              <Link to="/login">로그인</Link>
            </div>
          </div>
          <div className="login">
            <div className="login_register login_button_style">
              <Link to="/register">회원가입</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
