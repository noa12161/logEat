import './post.css';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setPost, setToUpdate } from '../../redux/post/writeSlice';

const UpdateDelete = ({ post, onClickEdit, onClickDelete }) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  return (
    <div className="updateDelete_container">
      <div onClick={() => onClickEdit(post)} className="updateDelete_update">
        수정
      </div>
      <div
        onClick={() => onClickDelete(post._id)}
        className="updateDelete_delete"
      >
        삭제
      </div>
    </div>
  );
};

export default UpdateDelete;
