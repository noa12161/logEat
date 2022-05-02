import '../page.css';
import React from 'react';
import EditorContainer from '../../container/write/EditorContainer';
import Tagcontainer from '../../container/write/Tagcontainer';
import WriteUpdateBtnContainer from '../../container/write/WriteUpdateBtnContainer';
import ImageUploadContainer from '../../container/write/ImageUploadContainer';

// /posts/write
const WritePage = () => {
  return (
    <div className="writePage_container">
      <EditorContainer />
      <Tagcontainer />
      <ImageUploadContainer />
      <WriteUpdateBtnContainer />
    </div>
  );
};

export default WritePage;
