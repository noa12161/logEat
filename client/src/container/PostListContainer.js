import Pagination from '../components/posts/Pagination';
import WritePost from '../components/posts/WritePost';
import PostLists from '../components/posts/PostLists';
import { fakePosts } from './FakePosts';

/*
  첫 렌더링시 모든 포스트 조회
  query 를 state로 설정해서 qury 변경시마다 qury값으로 포스트 조회
  응답받은 값을 redux posts 에 저장
  리덕스에서 불러온 posts를 PostList 컴포넌트에 전달
                  user를 전달 user 있으면 글쓰기 기능 가능...            
*/

const PostListContainer = () => {
  console.log(fakePosts);

  /*
    useEffect로 전체 포스트 redux-Thunk로 요청
    --thunk 로직--
      export const fn({query}) {
        rerturn const posts = axios.get(url, query)
      }
      성공시 state.posts = posts
  */

  return (
    <div>
      <WritePost />
      <PostLists posts={fakePosts} />
      <Pagination />
    </div>
  );
};

export default PostListContainer;
