import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: null,
  user: null,
  prevUser: null,
  register: {
    status: false,
    message: null,
  },
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
      };
    },
    registerSuccess: (state) => {
      return {
        ...state,
        register: {
          status: true,
          message: null,
        },
      };
    },
    registerInit: (state) => {
      return {
        ...state,
        register: {
          status: false,
          message: null,
        },
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
    setPrevUser: (state, action) => {
      return {
        ...state,
        prevUser: action.payload,
      };
    },
  },
});

// export const selectAllPosts = (state) => state.posts;

export const {
  login,
  logout,
  registerSuccess,
  registerInit,
  changeDate,
  applyUser,
  setPrevUser,
} = userSlice.actions;

export default userSlice.reducer;
