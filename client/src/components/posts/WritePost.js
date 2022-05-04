import './posts.css';
import { Link } from 'react-router-dom';
import PostsNav from '../../components/posts/PostsNav';

const WritePost = ({ user }) => {
  return (
    <div className="writePost_container">
      <PostsNav username={user.username} />
      <Link to="/posts/write">
        <div className="writeButton">글쓰기</div>
      </Link>
    </div>
  );
};

export default WritePost;
