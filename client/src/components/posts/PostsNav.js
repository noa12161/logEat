import './posts.css';
import { Link } from 'react-router-dom';

const PostsNav = ({ username }) => {
  return (
    <div className="postsNav_container">
      <Link to="/posts">
        <div>All</div>
      </Link>
      {username && (
        <Link to={`/posts?username=${username}`}>
          <div>MY</div>
        </Link>
      )}
    </div>
  );
};

export default PostsNav;
