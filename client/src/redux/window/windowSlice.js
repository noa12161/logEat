import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  windowWidth: null,
};

const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setWindowWidth: (state, { payload: width }) => {
      return {
        ...state,
        windowWidth: width,
      };
    },
  },
});

export const { setWindowWidth } = windowSlice.actions;

export default windowSlice.reducer;
