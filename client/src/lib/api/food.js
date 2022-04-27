import axios from 'axios';

// 음식 검색 api
export const searchFoodApi = async (nameOfFood) => {
  return await axios.post('/api/searchFood/search', { nameOfFood });
};

// 음식 db에 추가 api
export const addFoodToDbApi = async (objForRequest) => {
  return await axios.post('/api/food/add', objForRequest);
};

// 음식 db에서 삭제 api
export const deleteFoodApi = async (objForRequest) => {
  return await axios.post('/api/food/delete', objForRequest);
};
