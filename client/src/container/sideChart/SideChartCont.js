import { useState } from 'react';
// 리덕스
import { useDispatch } from 'react-redux';
import SideChart from '../../components/sideChart/SideChart';
import { changeBodyWeightApi, changeCaloriesApi } from '../../lib/api/user';
import { changeToStringFormat } from '../../lib/functions/common';
import { initSideChartEditor } from '../../redux/buttons/buttonSlice';
import { applyUser } from '../../redux/user/userSlice';

const SideChartCont = ({ user, nutrition, sideChartEdditorHandler }) => {
  const dispatch = useDispatch();
  const [userState, setUserState] = useState({
    weight: '',
    calories: '',
  });

  // 사용자 정보 editor value 변경 함수
  const handleUserStateValue = (e) => {
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
    <SideChart
      user={user}
      nutrition={nutrition}
      userState={userState}
      handleUserStateValue={handleUserStateValue}
      handleWeightChange={handleWeightChange}
      handleTargetCalChange={handleTargetCalChange}
      sideChartEdditorHandler={sideChartEdditorHandler}
    />
  );
};

export default SideChartCont;
