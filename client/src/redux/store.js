import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import foodReducer from './foods/foodSlice.js';
import buttonReducer from './buttons/buttonSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
    buttons: buttonReducer,
  },
});
