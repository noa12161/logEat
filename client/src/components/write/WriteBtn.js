import React from 'react';

const WriteBtn = ({ onSubmitPost, onCancel, update }) => {
  return (
    <div className="writeBtn_container">
      <button onClick={onSubmitPost} className="writeBtn_create_update">
        {update ? '수정' : '등록'}
      </button>
      <button onClick={onCancel} className="writeBtn_cancel">
        취소
      </button>
    </div>
  );
};

export default WriteBtn;
