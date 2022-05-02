import React from 'react';

const Preview = (file) => {
  console.log(file);
  return (
    <div
      className="preview_container"
      style={{ width: '100px', height: '100px' }}
    >
      <img
        style={{ width: '100%', objectFit: 'contain' }}
        src={file.file}
        alt="imagePreview"
      />
    </div>
  );
};

const ImageBtn = ({ uploadImage, file }) => {
  return (
    <div className="imageBtn_container">
      <label className="imageBtn_label">이미지 업로드</label>
      <input
        type="file"
        id="file"
        className="imageBtn_file"
        accept="image/*"
        onChange={(e) => uploadImage(e)}
      />
      {file && <Preview file={file} />}
    </div>
  );
};

export default ImageBtn;
