import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPostApi } from '../../lib/api/posts';
import { useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  message: '',
  image: '',
  tags: [],
  isUpdate: false,
  isLoading: false,
};

const writePost = createAsyncThunk(
  'write/writePost',
  async (form, { rejectWithValue }) => {
    try {
      const res = await createPostApi(form);
      const newPost = res.data;
      return newPost;
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
        image: post.image ? post.image : '',
        tags: post.tags ? post.tags : [],
      };
    },
    setToUpdate: (state) => {
      return {
        ...state,
        isUpdate: !state.isUpdate,
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
      const navigate = useNavigate();
      navigate(`/posts/post/${action.payload._id}`);
      state.isLoading = false;
      state.isUpdate = false;
    },
    [writePost.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      // 개발 계획중..
    },
  },
});

export const { initWrite, setPost, setToUpdate, setValue } = writeSlice.actions;

export default writeSlice.reducer;
