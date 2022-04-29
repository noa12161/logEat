import { Routes, Route } from 'react-router-dom';
import Test from '../components/Test';
import PostContainer from '../container/PostContainer';
import PostListContainer from '../container/PostListContainer';
import NotFound from './NotFound';

// /posts
const PostPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PostListContainer />} />
        <Route path="/:postId" element={<PostContainer />} />
      </Routes>
    </div>
  );
};

export default PostPage;
