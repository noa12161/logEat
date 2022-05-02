import './post.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPost, setToUpdate } from '../../redux/post/writeSlice';

const UpdateDelete = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickEdit = () => {
    dispatch(setPost(post));
    navigate(`/posts/write`);
  };

  return (
    <div className="updateDelete_container">
      <div onClick={onClickEdit} className="updateDelete_update">
        수정
      </div>
      <div className="updateDelete_delete">삭제</div>
    </div>
  );
};

export default UpdateDelete;
