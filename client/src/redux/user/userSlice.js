import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: null,
  user: null,
  registerSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        user: null,
        registerSuccess: false,
      };
    },
    register: (state) => {
      return {
        ...state,
        registerSuccess: !state.registerSuccess,
      };
    },
    changeDate: (state, action) => {
      return {
        ...state,
        date: action.payload,
      };
    },
    applyUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

// export const selectAllPosts = (state) => state.posts;

export const { login, logout, register, changeDate, applyUser } =
  userSlice.actions;

export default userSlice.reducer;
