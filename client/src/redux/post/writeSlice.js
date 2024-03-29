import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPostApi, updatePostApi } from '../../lib/api/posts';

const initialState = {
  title: '',
  message: '',
  fileUrl: '',
  fileBase64: '',
  tags: [],
  postId: null,
  responsePost: null,
  isLoading: false,
};

// 새 게시글 등록
export const writePost = createAsyncThunk(
  'write/writePost',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createPostApi(formData);
      const newPost = res.data;
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
      const res = await updatePostApi(payload.formData, payload.postId);
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
    initWrite: (state) => ({ ...initialState, isLoading: state.isLoading }),
    setPost: (state, { payload: post }) => {
      return {
        ...state,
        title: post.title,
        message: post.title,
        fileUrl: post.image ? post.image.imageUrl : '',
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
