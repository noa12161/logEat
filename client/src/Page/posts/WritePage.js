import '../page.css';
import React from 'react';
import EditorContainer from '../../container/write/EditorContainer';
import Tagcontainer from '../../container/write/Tagcontainer';
import WriteUpdateBtnContainer from '../../container/write/WriteUpdateBtnContainer';
import ImageUploadContainer from '../../container/write/ImageUploadContainer';
// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { initWrite } from '../../redux/post/writeSlice';
// /posts/write
const WritePage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.write);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    console.log(imageFile);
  }, [imageFile]);

  // 해당 페이지(글쓰기) 를 벗어날때 writeSlice 초기화
  useEffect(() => {
    return () => {
      dispatch(initWrite());
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ height: '300px' }} className="jcac">
          <CircularProgress />
        </div>
      ) : (
        <div className="writePage_container">
          <EditorContainer />
          <Tagcontainer />
          <ImageUploadContainer setImageFile={setImageFile} />
          <WriteUpdateBtnContainer imageFile={imageFile} />
        </div>
      )}
    </>
  );
};

export default WritePage;
