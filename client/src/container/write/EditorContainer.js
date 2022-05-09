import React from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setValue } from '../../redux/post/writeSlice';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, message } = useSelector(({ write }) => ({
    title: write.title,
    message: write.message,
  }));

  // useCallback을 하기전에는 새로고침을 할대마다 quill이 여러개 렌더링됬다
  const onChangeValue = useCallback(
    (payload) => dispatch(setValue(payload)),
    [dispatch],
  );

  return (
    <Editor onChangeValue={onChangeValue} title={title} message={message} />
  );
};

export default EditorContainer;
