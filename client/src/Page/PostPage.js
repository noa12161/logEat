import { Routes, Route } from 'react-router-dom';
import WritePost from '../components/post/WritePost';
import PostContainer from '../container/PostContainer';
import PostListContainer from '../container/PostListContainer';

// /posts
const PostPage = () => {
  return (
    <div>
      <Routes>
        <Route index element={<PostListContainer />} />
        <Route path="post/:postId" element={<PostContainer />} />
        <Route path="write" element={<WritePost />} />
      </Routes>
    </div>
  );
};

export default PostPage;
