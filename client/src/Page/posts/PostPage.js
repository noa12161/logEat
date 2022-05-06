import { Routes, Route } from 'react-router-dom';
import PostListContainer from '../../container/posts/PostListContainer';
import PostContainer from '../../container/PostContainer';
import WritePage from './WritePage';

// /posts
const PostPage = () => {
  return (
    <div style={{ height: `calc(100% - 150px)` }}>
      <Routes>
        <Route index element={<PostListContainer />} />
        <Route path="post/:postId" element={<PostContainer />} />
        <Route path="write" element={<WritePage />} />
      </Routes>
    </div>
  );
};

export default PostPage;
