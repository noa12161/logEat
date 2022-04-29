import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostApi } from '../../lib/api/posts';

const initialState = {
  post: null,
  isLoading: false,
  err: null,
};

export const getPost = createAsyncThunk(
  'post/getPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await getPostApi(postId);
      const post = response.data;
      return post;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    initPost: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.post = action.payload;
      state.isLoading = false;
    },
    [getPost.rejected]: (state, action) => {
      console.log(action);
      state.err = true;
    },
  },
});

export const { initPost } = postSlice.actions;

export default postSlice.reducer;
