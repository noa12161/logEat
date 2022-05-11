import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchFoodApi } from '../../lib/api/food';

const initialState = {
  searchedFood: {
    data: null,
    isLoading: false,
    err: {
      message: null,
      status: false,
    },
  },
  foodList: null,
  currentDateNutrition: {
    calculatedNutrition: [],
    totalNutrition: null,
  },
  monthData: {
    currentMonth: null,
    data: [],
  },
};

export const searchFood = createAsyncThunk(
  'food/searchFood',
  async (nameOfFood, { rejectWithValue }) => {
    try {
      const response = await searchFoodApi(nameOfFood);
      const data = response.data;
      return data;
    } catch (e) {
      console.log({ e });
      return rejectWithValue(e.response);
    }
  },
);

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    // !user -> 상태 초기화
    initializeFoodSlice: (state) => initialState,
    // 로그아웃 -> !user -> !foodList -> initializeCurrentDateNutrition
    initializeCurrentDateNutrition: (state) => {
      return {
        ...state,
        currentDateNutrition: {
          calculatedNutrition: [],
          totalNutrition: null,
        },
      };
    },
    // user의 음식 데이터만 추출
    setFoodList: (state, action) => {
      return {
        ...state,
        foodList: action.payload,
      };
    },
    // foodList에 있는 각 음식의 영양성분 계산
    setCalculatedNutrition: (state, action) => {
      return {
        ...state,
        currentDateNutrition: {
          calculatedNutrition: action.payload,
          totalNutrition: state.currentDateNutrition.totalNutrition,
        },
      };
    },
    // calculatedNutrition 의 음식들의 영양성분 총합 계산
    setTotalNutrition: (state, action) => {
      return {
        ...state,
        currentDateNutrition: {
          calculatedNutrition: state.currentDateNutrition.calculatedNutrition,
          totalNutrition: action.payload,
        },
      };
    },
    clearSearchedFood: (state) => {
      return {
        ...state,
        searchedFood: initialState.searchedFood,
      };
    },
    setMonthData: (state, action) => {
      return {
        ...state,
        monthData: {
          currentMonth: action.payload.month,
          data: action.payload.data,
        },
      };
    },
  },
  extraReducers: {
    // 음식 검색 thunk
    [searchFood.pending]: (state) => {
      state.searchedFood.err.status = false;
      state.searchedFood.isLoading = true;
      state.searchedFood.data = null;
    },
    [searchFood.fulfilled]: (state, action) => {
      state.searchedFood.isLoading = false;
      state.searchedFood.data = action.payload;
    },
    [searchFood.rejected]: (state, action) => {
      if (action.payload.status === 500) alert('게이트웨이 내부 서비스 오류');
      else if (action.payload.status === 404) alert('음식을 찾지 못했습니다..');
      state.searchedFood.data = null;
      state.searchedFood.isLoading = false;
      state.searchedFood.err.status = true;
      state.searchedFood.err.message = action.payload;
    },
  },
});

export const {
  initializeFoodSlice,
  initializeCurrentDateNutrition,
  setFoodList,
  setCalculatedNutrition,
  setTotalNutrition,
  clearSearchedFood,
  setMonthData,
} = foodSlice.actions;

export default foodSlice.reducer;
