import './container.css';
import PostItem from '../components/posts/PostItem';
import { fakePosts } from './FakePosts';

const PostContainer = () => {
  return (
    <div className="post_container">
      {/* 내 글이면 수정/삭제 컴포넌트 */}
      <PostItem post={fakePosts[0]} />
    </div>
  );
};

export default PostContainer;
