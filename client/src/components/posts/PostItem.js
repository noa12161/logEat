import { useNavigate } from 'react-router-dom';

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  const onClickTitle = (id) => {
    console.log(id);
    navigate(`/posts/post/${id}`);
  };
  const onClickUsername = () => {};
  const onClickTag = () => {};

  return (
    <div className="postItem_container">
      <div className="postItem_Title_container">
        <h2 onClick={() => onClickTitle(post.id)}>{post.title}</h2>
      </div>
      <div className="postItem_subTitle_container">
        <div className="postItem_subTitle_username">{post.user.username}</div>
        <div className="postItem_subTitle_timeStamp">{post.timeStamp}</div>
      </div>
      <div className="postItem_body_container">
        <div className="postItem_body_image">
          <img src={post.image} alt="fakeImage" />
        </div>
        <div className="postItem_body_message">{post.message}</div>
      </div>
      <div className="postItem_tag_container">
        {post.tags.map((tag, i) => (
          <span key={i}>#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default PostItem;
