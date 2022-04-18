import axios from 'axios';
// 현재 몸무게 변화 api
export const changeBodyWeightApi = async (username, weight, date) => {
  const data = await axios.post('/api/user/currentbodyweight', {
    username,
    weight,
    date,
  });
  return data;
};

// 목표 칼로리 변화 api
export const changeCaloriesApi = async (username, calories) => {
  const data = await axios.post('/api/user/currenttargetcalories', {
    username,
    calories,
  });
  return data;
};

// 목표 영양성분 비율 변화 api
export const changeRatioApi = async (username, ratio) => {
  const data = await axios.post('/api/user/targetratio', {
    username,
    ratio,
  });
  return data;
};
