import './write.css';
const Preview = (file) => {
  console.log(file);
  return (
    <div className="preview_container">
      <img className="preview_img" src={file.file} alt="imagePreview" />
    </div>
  );
};

const ImageBtn = ({ uploadImage, file }) => {
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
      {file && <Preview file={file} />}
    </div>
  );
};

export default ImageBtn;
