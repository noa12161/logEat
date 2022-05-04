import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPostApi, updatePostApi } from '../../lib/api/posts';

const initialState = {
  title: '',
  message: '',
  file: '',
  fileName: '',
  tags: [],
  postId: null,
  responsePost: null,
  isLoading: false,
};

// 새 게시글 등록
export const writePost = createAsyncThunk(
  'write/writePost',
  async (form, { rejectWithValue }) => {
    try {
      const res = await createPostApi(form);
      const newPost = res.data;
      console.log(newPost);
      return newPost;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  },
);
// 기존 게시글 수정
export const updatePost = createAsyncThunk(
  'write/updatePost',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updatePostApi(payload.form, payload.postId);
      const updatedPost = res.data;
      return updatedPost;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  },
);

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    initWrite: (state) => initialState,
    setPost: (state, { payload: post }) => {
      return {
        ...state,
        title: post.title,
        message: post.title,
        file: post.image ? post.image.file : '',
        fileName: post.image ? post.image.fileName : '',
        tags: post.tags ? post.tags : [],
        postId: post._id,
      };
    },
    setValue: (state, action) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
  },
  extraReducers: {
    [writePost.pending]: (state) => {
      state.isLoading = true;
    },
    [writePost.fulfilled]: (state, action) => {
      console.log('write success');
      console.log(action);
      state.responsePost = action.payload;
      state.isLoading = false;
    },
    [writePost.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      // 개발 계획중..
    },
    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.responsePost = action.payload;
      state.isLoading = false;
    },
    [updatePost.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      // 개발 계획중..
    },
  },
});

export const { initWrite, setPost, setToUpdate, setValue } = writeSlice.actions;

export default writeSlice.reducer;
