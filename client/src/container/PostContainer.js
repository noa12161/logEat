import './container.css';
import PostItem from '../components/posts/PostItem';

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPost, initPost } from '../redux/post/postSlice';
import { CircularProgress } from '@mui/material';
// import { setPost } from '../redux/post/writeSlice';

const PostContainer = () => {
  const dispatch = useDispatch();
  const { post, isLoading, deleteSuccess } = useSelector((state) => state.post);
  const params = useParams();

  const { postId } = params;

  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      dispatch(initPost());
    };
  }, [dispatch, postId]);

  //  수정 삭제 함수
  const navigate = useNavigate();
  // const onClickEdit = () => {
  //   if (!post) return;
  //   if (window.confirm('정말 수정 하시겠습니까?')) {
  //     dispatch(setPost(post));
  //     navigate(`/posts/write`);
  //   } else {
  //     return;
  //   }
  // };
  // const onClickDelete = () => {
  //   if (!post) return;
  //   if (window.confirm('정말 삭제 하시겠습니까?')) {
  //     dispatch(deletePost(postId));
  //   } else {
  //     return;
  //   }
  // };
  // 삭제 성공시 전체 게시글로 이동.
  useEffect(() => {
    if (!deleteSuccess) return;
    navigate('/posts');
  }, [deleteSuccess, navigate]);

  return (
    <div className="post_container">
      {/* 내 글이면 수정/삭제 컴포넌트 */}
      {!post || isLoading ? (
        <div className="jcac" style={{ height: '100%' }}>
          <CircularProgress />
        </div>
      ) : (
        <PostItem
          post={post}
          // onClickEdit={onClickEdit}
          // onClickDelete={onClickDelete}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default PostContainer;
