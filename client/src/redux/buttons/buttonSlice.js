import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideChartEdditorHandler: {
    weightEditor: false,
    calEditor: false,
    ratioEditor: false,
  },
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
  },
});

export const { setSideChartEditor, initSideChartEditor } = buttonSlice.actions;

export default buttonSlice.reducer;
