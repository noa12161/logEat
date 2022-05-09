import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WriteBtn from '../../components/write/WriteBtn';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, writePost } from '../../redux/post/writeSlice';

const WriteUpdateBtnContainer = ({ imageFile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, message, tags, postId, responsePost } = useSelector(
    ({ write }) => ({
      title: write.title,
      message: write.message,
      fileBase64: write.fileBase64,
      tags: write.tags,
      postId: write.postId,
      responsePost: write.responsePost,
    }),
  );

  /*postId가 있으면 update(수정) 를 디스패치하고
  postId가 없으면 write(등록) 를 디스패치함.. */
  const onSubmitPost = async (e) => {
    e.preventDefault();
    const form = { title, message, imageFile, tags };
    const formData = await changeToFormData(form);
    if (postId) {
      if (window.confirm('정말 수정하시겠습니까?')) {
        dispatch(updatePost({ formData, postId }));
        return;
      } else {
        return;
      }
    }
    dispatch(writePost(formData));
  };

  const changeToFormData = async (form) => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('message', form.message);
    formData.append('tags', form.tags);
    formData.append('image', form.imageFile);
    return formData;
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
