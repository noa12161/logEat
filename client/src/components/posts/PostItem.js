import { useNavigate } from 'react-router-dom';
import UpdateDelete from '../post/UpdateDelete';
import parse from 'html-react-parser';
// 리덕스
import { useSelector } from 'react-redux';
import { setPost } from '../../redux/post/writeSlice';
import { deletePost } from '../../redux/post/postSlice';

const PostItem = ({ post, dispatch }) => {
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
  };

  const onClickEdit = (post) => {
    if (!post) return;
    dispatch(setPost(post));
    navigate(`/posts/write`);
  };
  const onClickDelete = (postId) => {
    if (!post) return;
    if (window.confirm('정말 삭제 하시겠습니까?')) {
      dispatch(deletePost(postId));
    } else {
      return;
    }
  };

  return (
    <div className="postItem_container">
      {user && post.user._id === user._id && (
        <UpdateDelete
          post={post}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      )}
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
        {post.image?.imageUrl && (
          <div className="postItem_body_image">
            <img src={post.image.imageUrl} alt="fakeImage" />
          </div>
        )}
        {/* 내용 */}
        <div className="postItem_body_message">{parse(post.message)}</div>
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
