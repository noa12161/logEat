import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchFoodApi } from '../../lib/api/food';
import { getArrayOfMonthCaloriesIntake } from '../../lib/functions/dateFunctions';
import { setPrevUser } from '../user/userSlice';

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
  monthCaloriesIntake: {
    currentMonth: null,
    data: null,
    isFetching: false,
    err: {
      message: null,
      status: false,
    },
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
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  },
);

export const fnMonthCalIntake = createAsyncThunk(
  'food/fnMonthCalIntake',
  async (form, { rejectWithValue, dispatch, getState }) => {
    const user = getState().user.user;
    // 함수가 시작한 시점의 유저 정보 저장
    dispatch(setPrevUser(user));
    try {
      const response = await getArrayOfMonthCaloriesIntake(form);
      return { response, currentMonth: form.currentMonth };
    } catch (e) {
      return rejectWithValue(e);
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
      alert('음식을 찾지 못했습니다..');
      state.searchedFood.data = null;
      state.searchedFood.isLoading = false;
      state.searchedFood.err.status = true;
      state.searchedFood.err.message = action.payload;
    },
    // 한달간 일일 열량 구하기 thunk
    [fnMonthCalIntake.pending]: (state) => {
      state.monthCaloriesIntake.isFetching = true;
      state.monthCaloriesIntake.data = null;
      state.monthCaloriesIntake.currentMonth = null;
      state.monthCaloriesIntake.err.status = false;
    },
    [fnMonthCalIntake.fulfilled]: (state, action) => {
      state.monthCaloriesIntake.isFetching = false;
      state.monthCaloriesIntake.data = action.payload.response;
      state.monthCaloriesIntake.currentMonth = action.payload.currentMonth;
    },
    [fnMonthCalIntake.rejected]: (state, action) => {
      alert(action.payload.message);
      console.log(action);
      state.monthCaloriesIntake.isFetching = false;
      state.monthCaloriesIntake.data = null;
      state.monthCaloriesIntake.currentMonth = null;
      state.monthCaloriesIntake.err.status = true;
      state.monthCaloriesIntake.err.message = action.payload.message;
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
} = foodSlice.actions;

export default foodSlice.reducer;
