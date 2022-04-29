import './posts.css';
import { Link } from 'react-router-dom';

const WritePost = () => {
  return (
    <div className="writePost_container">
      <Link to="/posts/write">
        <div className="writeButton">글쓰기</div>
      </Link>
    </div>
  );
};

export default WritePost;
