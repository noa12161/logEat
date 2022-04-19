import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideChartEdditorHandler: {
    weightEditor: false,
    calEditor: false,
    ratioEditor: false,
  },
  showSideChart: true,
};

const buttonSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    setSideChartEditor: (state, { payload: name }) => {
      return {
        ...state,
        sideChartEdditorHandler: {
          ...state.sideChartEdditorHandler,
          [name]: !state.sideChartEdditorHandler[name],
        },
      };
    },
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
    setShowSideChart: (state, { payload: bool }) => {
      return {
        ...state,
        showSideChart: bool,
      };
    },
  },
});

export const { setSideChartEditor, initSideChartEditor, setShowSideChart } =
  buttonSlice.actions;

export default buttonSlice.reducer;
