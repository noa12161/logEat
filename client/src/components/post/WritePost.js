import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initWrite, setValue } from '../../redux/post/writeSlice';

const WritePost = () => {
  const dispatch = useDispatch();
  const { title, message, image, tags } = useSelector((state) => state.write);

  const onchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setValue({ name, value }));
  };

  useEffect(() => {
    return () => {
      dispatch(initWrite());
    };
  }, []);

  return <div className="writePost_container">WritePost</div>;
};

export default WritePost;
