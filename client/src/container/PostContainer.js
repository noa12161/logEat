import './container.css';
import PostItem from '../components/posts/PostItem';

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { getPost, initPost } from '../redux/post/postSlice';
import { CircularProgress } from '@mui/material';

const PostContainer = () => {
  const dispatch = useDispatch();
  const { post, isLoading, deleteSuccess } = useSelector((state) => state.post);
  const params = useParams();

  const { postId } = params;

  // 파라미터값으로 포스트를 조회하고 성공시 redux.state에 post에대한 정보 저장
  // 이 페이지를 나가면 redux.state.post 초기화 (cleanup)
  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      dispatch(initPost());
    };
  }, [dispatch, postId]);

  const navigate = useNavigate();
  // 삭제 성공시 전체 게시글로 이동.
  useEffect(() => {
    if (!deleteSuccess) return;
    navigate('/posts');
  }, [deleteSuccess, navigate]);

  return (
    <div className="post_container">
      {/* 내 글이면 수정/삭제 컴포넌트 */}
      {!post || isLoading ? (
        <div className="jcac" style={{ height: '300px' }}>
          <CircularProgress />
        </div>
      ) : (
        <PostItem post={post} dispatch={dispatch} />
      )}
    </div>
  );
};

export default PostContainer;
