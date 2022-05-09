import './write.css';
const Preview = ({ imageFile }) => {
  return (
    <div className="preview_container">
      <img className="preview_img" src={imageFile} alt="imagePreview" />
    </div>
  );
};

const ImageBtn = ({ uploadImage, fileBase64, fileUrl }) => {
  return (
    <div className="imageBtn_container">
      <label className="imageBtn_label" htmlFor="file">
        이미지 업로드
      </label>
      <input
        type="file"
        id="file"
        className="imageBtn_file"
        accept="image/*"
        onChange={(e) => uploadImage(e)}
      />

      {(fileBase64 || fileUrl) && (
        <Preview imageFile={fileBase64 ? fileBase64 : fileUrl} />
      )}
    </div>
  );
};

export default ImageBtn;
