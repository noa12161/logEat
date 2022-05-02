import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, writePost } from '../../redux/post/writeSlice';
import { useNavigate } from 'react-router-dom';
import WriteBtn from '../../components/write/WriteBtn';
import { useEffect } from 'react';

const WriteUpdateBtnContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    title,
    message,
    file,
    fileName,
    tags,
    postId,
    responsePost,
    isLoading,
  } = useSelector(({ write }) => ({
    title: write.title,
    message: write.message,
    file: write.file,
    fileName: write.fileName,
    tags: write.tags,
    postId: write.postId,
    responsePost: write.responsePost,
    isLoading: write.isLoading,
  }));

  /*postId가 있으면 update를 디스패치하고
  postId가 없으면 write를 디스패치함.. */
  const onSubmitPost = () => {
    const form = { title, message, file, fileName, tags };
    if (postId) {
      dispatch(updatePost({ form, postId }));
      return;
    }
    dispatch(writePost(form));
  };

  // 취소
  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!responsePost) return;
    return navigate(`/posts/post/${responsePost._id}`);
  }, [responsePost, navigate]);

  return (
    <WriteBtn onSubmitPost={onSubmitPost} onCancel={onCancel} update={postId} />
  );
};

export default WriteUpdateBtnContainer;
