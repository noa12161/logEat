import React from 'react';
import TagBox from '../../components/write/TagBox';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../redux/post/writeSlice';

const Tagcontainer = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.write);

  const onChangeTags = (updatedTags) => {
    dispatch(
      setValue({
        name: 'tags',
        value: updatedTags,
      }),
    );
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default Tagcontainer;
