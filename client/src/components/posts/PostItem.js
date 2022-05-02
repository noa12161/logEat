import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UpdateDelete from '../post/UpdateDelete';
import { useRef } from 'react';

const PostItem = ({ post }) => {
  console.log(post);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onClickTitle = (postId) => {
    navigate(`/posts/post/${postId}`);
  };
  const onClickUsername = (username) => {
    navigate(`/posts?username=${username}`);
  };
  const onClickTag = (tag) => {
    navigate(`/posts?tag=${tag}`);
    // window.location.reload();
  };

  const messageRef = useRef(null);

  // setTimeout(() => {
  //   console.log(messageRef);
  // }, 5000);

  const controlInnerHtml = (message) => {};

  return (
    <div className="postItem_container">
      {user && post.user._id === user._id && <UpdateDelete post={post} />}
      {/* 제목 */}
      <div className="postItem_Title_container">
        <h2 onClick={() => onClickTitle(post._id)}>{post.title}</h2>
      </div>
      {/* 생성자 + 생성일 */}
      <div className="postItem_subTitle_container">
        <div
          onClick={() => onClickUsername(post.user.username)}
          className="postItem_subTitle_username"
        >
          {post.user.username}
        </div>
        <div className="postItem_subTitle_timeStamp">{post.createdAt}</div>
      </div>
      <div className="postItem_body_container">
        {/* 이미지 */}
        {post.image?.file && (
          <div className="postItem_body_image">
            <img src={post.image.file} alt="fakeImage" />
          </div>
        )}
        {/* 내용 */}
        <div className="postItem_body_message" ref={messageRef}>
          {post.message}
        </div>
      </div>
      <div className="postItem_tag_container">
        {post.tags.map((tag, i) => (
          <span key={i} onClick={() => onClickTag(tag)}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostItem;
