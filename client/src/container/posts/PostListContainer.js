import WritePost from '../../components/posts/WritePost';
import PostLists from '../../components/posts/PostLists';
import PaginationContainer from './PaginationContainer';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import qs from 'qs';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/posts/postsSlice';
import { initPost } from '../../redux/post/postSlice';
import { CircularProgress } from '@mui/material';

/*
  첫 렌더링시 모든 포스트 조회
  query 를 state로 설정해서 qury 변경시마다 qury값으로 포스트 조회
  응답받은 값을 redux posts 에 저장
  리덕스에서 불러온 posts를 PostList 컴포넌트에 전달
  user를 전달 user 있으면 글쓰기 기능 가능...            
*/

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, lastPage } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const { deleteSuccess } = useSelector((state) => state.post);
  const location = useLocation();

  const { search } = location;
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const queryString = qs.stringify(query);

  // 초기에 모든 포스트를 불러오고
  // 쿼리값이 바뀌면 해당 쿼리로 다시 서버에 데이터 요청
  useEffect(() => {
    dispatch(getAllPosts(queryString));
  }, [search, dispatch, queryString]);

  // 포스트 삭제 성공시 다시 서버에 데이터 요청해서 게시글 리스트 새로고침.
  useEffect(() => {
    if (!deleteSuccess) return;
    dispatch(initPost());
    dispatch(getAllPosts(queryString));
  }, [dispatch, deleteSuccess, queryString]);

  return (
    <div>
      {user && <WritePost user={user} />}
      {isLoading ? (
        <div style={{ height: '300px' }} className="jcac">
          <CircularProgress />
        </div>
      ) : (
        <PostLists posts={posts} dispatch={dispatch} />
      )}
      <PaginationContainer query={query} lastPage={lastPage} />
    </div>
  );
};

export default PostListContainer;
