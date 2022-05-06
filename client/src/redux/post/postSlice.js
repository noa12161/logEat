import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deletePostApi, getPostApi } from '../../lib/api/posts';

const initialState = {
  post: null,
  isLoading: false,
  err: null,
  deleteSuccess: false,
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

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await deletePostApi(postId);
      console.log(response.status);
      const data = response.data;
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response);
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
    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.deleteSuccess = true;
    },
    [deletePost.rejected]: (state, action) => {
      console.log('deletePost/rejected');
      console.log(action);
      state.err = true;
      state.deleteSuccess = false;
    },
  },
});

export const { initPost } = postSlice.actions;

export default postSlice.reducer;
