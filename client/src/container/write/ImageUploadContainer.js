import ImageBtn from '../../components/write/ImageBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setValue, writePost } from '../../redux/post/writeSlice';

/*
  uploadImage -> convertBase64 -> setValue
  -> onSubmitForm -> 
*/
const ImageUploadContainer = ({ setImageFile }) => {
  const dispatch = useDispatch();
  const { fileBase64 } = useSelector((state) => state.write);
  const { fileUrl } = useSelector((state) => state.write);

  // WritePage의 localState set하고
  // 미리보기용으로 redux.state에 base64형식으로 임시로 이미지 저장
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const base64 = await convertBase64(file);
    dispatch(setValue({ name: 'fileBase64', value: base64 }));
  };

  // 이미지 base64형식으로 전환하는 함수.
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  return (
    <ImageBtn
      uploadImage={uploadImage}
      fileBase64={fileBase64}
      fileUrl={fileUrl}
    />
  );
};

export default ImageUploadContainer;
