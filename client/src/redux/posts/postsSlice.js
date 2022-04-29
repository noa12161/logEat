import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPostsApi } from '../../lib/api/posts.js';

const initialState = {
  posts: [],
  isLoading: false,
  lastPage: 1,
  err: null,
};

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (queryString, { rejectWithValue }) => {
    try {
      const posts = await getAllPostsApi(queryString);
      const data = posts.data;

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.lastPage = action.payload.lastPage;
    },
    [getAllPosts.rejected]: (state, action) => {
      console.log(action);
      // 개발 계획중..
    },
  },
});

export default postsSlice.reducer;
