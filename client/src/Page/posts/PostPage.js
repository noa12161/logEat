import { Routes, Route } from 'react-router-dom';
import PostContainer from '../../container/PostContainer';
import PostListContainer from '../../container/posts/PostListContainer';
import WritePage from './WritePage';

// /posts
const PostPage = () => {
  return (
    <div>
      <Routes>
        <Route index element={<PostListContainer />} />
        <Route path="post/:postId" element={<PostContainer />} />
        <Route path="write" element={<WritePage />} />
      </Routes>
    </div>
  );
};

export default PostPage;
