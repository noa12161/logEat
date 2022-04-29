import './container.css';
import PostItem from '../components/posts/PostItem';
import { fakePosts } from './FakePosts';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { getPost, initPost } from '../redux/post/postSlice';

const PostContainer = () => {
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.post);
  const params = useParams();

  const { postId } = params;

  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      dispatch(initPost());
    };
  }, [dispatch, postId]);

  return (
    <div className="post_container">
      {/* 내 글이면 수정/삭제 컴포넌트 */}
      {!post || isLoading ? <div>LOADING....</div> : <PostItem post={post} />}
    </div>
  );
};

export default PostContainer;
