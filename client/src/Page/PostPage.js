import { Routes, Route } from 'react-router-dom';
import PostContainer from '../container/PostContainer';
import PostListContainer from '../container/PostListContainer';

// /posts
const PostPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PostListContainer />} />
        <Route path="/post/:postId" element={<PostContainer />} />
      </Routes>
    </div>
  );
};

export default PostPage;
