import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foodList: null,
  currentDateNutrition: {
    calculatedNutrition: [],
    totalNutrition: null,
  },
  monthCaloriesIntake: {
    currentMonth: null,
    data: null,
    isFetching: false,
  },
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    initializeFoodSlice: (state) => initialState,
    setFoodList: (state, action) => {
      return {
        ...state,
        foodList: action.payload,
      };
    },
    setCalculatedNutrition: (state, action) => {
      return {
        ...state,
        currentDateNutrition: {
          calculatedNutrition: action.payload,
          totalNutrition: state.currentDateNutrition.totalNutrition,
        },
      };
    },
    setTotalNutrition: (state, action) => {
      return {
        ...state,
        currentDateNutrition: {
          calculatedNutrition: state.currentDateNutrition.calculatedNutrition,
          totalNutrition: action.payload,
        },
      };
    },
    setMonthCaloriesIntakeStart: (state, action) => {
      return {
        ...state,
        monthCaloriesIntake: {
          ...state.monthCaloriesIntake,
          isFetching: true,
        },
      };
    },
    setMonthCaloriesIntake: (state, action) => {
      return {
        ...state,
        monthCaloriesIntake: {
          data: action.payload.data,
          currentMonth: action.payload.currentMonth,
          isFetching: false,
        },
      };
    },
    initializeCurrentDateNutrition: (state) => {
      return {
        ...state,
        currentDateNutrition: {
          calculatedNutrition: [],
          totalNutrition: null,
        },
      };
    },
  },
});

export const {
  initializeFoodSlice,
  setFoodList,
  setCurrentDateTotalNutrition,
  setMonthCaloriesIntakeStart,
  setMonthCaloriesIntake,
  initializeCurrentDateNutrition,
  setCalculatedNutrition,
  setTotalNutrition,
} = foodSlice.actions;

export default foodSlice.reducer;
