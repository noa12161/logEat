import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideChartEdditorHandler: {
    weightEditor: false,
    calEditor: false,
    ratioEditor: false,
  },
  showSideChart: false,
  showSearchFood: false,
};

const buttonSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    initSideChartEditor: (state) => {
      return {
        ...state,
        sideChartEdditorHandler: {
          weightEditor: false,
          calEditor: false,
          ratioEditor: false,
        },
      };
    },
    setSideChartEditor: (state, { payload: name }) => {
      return {
        ...state,
        sideChartEdditorHandler: {
          ...state.sideChartEdditorHandler,
          [name]: !state.sideChartEdditorHandler[name],
        },
      };
    },
    setShowSideChart: (state, { payload: bool }) => {
      return {
        ...state,
        showSideChart: bool,
      };
    },
    setShowSearchFood: (state, { payload: bool }) => {
      return {
        ...state,
        showSearchFood: bool,
      };
    },
  },
});

export const {
  setSideChartEditor,
  initSideChartEditor,
  setShowSideChart,
  setShowSearchFood,
} = buttonSlice.actions;

export default buttonSlice.reducer;
