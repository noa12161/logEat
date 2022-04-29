import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import foodReducer from './foods/foodSlice.js';
import buttonReducer from './buttons/buttonSlice.js';
import windowReducer from './window/windowSlice.js';
import postsReducer from './posts/postsSlice.js';
import postReducer from './post/postSlice.js';
import writeReducer from './post/writeSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
    buttons: buttonReducer,
    window: windowReducer,
    posts: postsReducer,
    post: postReducer,
    write: writeReducer,
  },
});
