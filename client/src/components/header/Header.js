import './header.css';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { BsCalendar3Event } from 'react-icons/bs';
import axios from 'axios';
import {
  getArrayOfMonthCaloriesIntake,
  configDaysinMonth,
} from '../../lib/functions/dateFunctions';

// date-picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { Link } from 'react-router-dom';
// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { logout, changeDate } from '../../redux/user/userSlice';
import {
  setMonthCaloriesIntakeStart,
  setMonthCaloriesIntake,
  initializeFoodSlice,
} from '../../redux/foods/foodSlice';

const Header = ({ user }) => {
  const dispatch = useDispatch();
  const { monthCaloriesIntake } = useSelector((state) => state.food);
  const [prevUserState, setPrevUserState] = useState(user);

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

  useEffect(() => {
    if (!user) return dispatch(initializeFoodSlice());

    dispatch(changeDate(startDate.toLocaleDateString()));
    //한달간 일일 열량섭취 값 구하기...
    const fn = async () => {
      // 같은달을 이미 계산 했고..
      // user의 정보가 변경되지 않았다면..return
      // eg) 유저가 음식을 추가하면 다시 계산함... month 단위가 변하면 다시 계산...
      if (
        startDate.getMonth() + 1 === monthCaloriesIntake.currentMonth &&
        user === prevUserState
      )
        return;

      dispatch(setMonthCaloriesIntakeStart()); //thunk 로 대체..
      /* data =
      {
        fullDate: dateString, //"2022. 4. 1."
        date: i,  // 1,2,3,4,5......
        cal: convertToFixedNum(cal), // 2000
      } 이와 같은 객체들로 이루어진 배열 length = 선택 month의 days...
      */
      const data = await getArrayOfMonthCaloriesIntake(
        configDaysinMonth(startDate),
        startDate,
        user,
      );
      dispatch(
        setMonthCaloriesIntake({
          data,
          currentMonth: startDate.getMonth() + 1,
        }),
      );
      setPrevUserState(user);
    };
    fn();
  }, [
    startDate,
    dispatch,
    monthCaloriesIntake.currentMonth,
    user,
    prevUserState,
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

// const [today, setToday] = useState(startDate.toLocaleDateString());
// const [todaymeals, settodaymeals] = useState([]);

// <div>
//      {todaymeals && todaymeals.map((meal) => <div>{meal.foodname}</div>)}
// </div>
// useEffect(() => {
//   console.log(today === '2022. 4. 1.');
//   setToday(startDate.toLocaleDateString());
// }, [startDate]);

// const userData = {
//   name: 'david',
//   foodData: [
//     {
//       date: '2022. 4. 2.',
//       meals: [
//         {
//           foodname: 'apple',
//           cal: 60,
//         },
//         {
//           foodname: 'banana',
//           cal: 60,
//         },
//       ],
//     },
//     {
//       date: '2022. 4. 3.',
//       meals: [
//         {
//           foodname: 'chicken',
//           cal: 60,
//         },
//         {
//           foodname: 'rice',
//           cal: 60,
//         },
//       ],
//     },
//   ],
// };
// useEffect(() => {
//   const currentMeals = userData.foodData.find((d) => d.date === today)?.meals;
//   console.log(currentMeals);
//   if (currentMeals === undefined) settodaymeals([]);
//   settodaymeals(currentMeals);
// }, [today]);
